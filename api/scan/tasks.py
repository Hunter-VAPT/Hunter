from __future__ import absolute_import, unicode_literals
from celery import shared_task, group
from nmap3 import NmapHostDiscovery,nmap3
from .models import Input, Host, Scan, Port,Service,Service_version,Vulnerability,OSMatch
from django.utils import timezone
from celery.result import allow_join_result
from .nmap_parser import NmapParser
from django.conf import settings
from playwright.sync_api import Locator, sync_playwright, Page
from .cve_details import CVEdetails
from django.core.serializers import serialize
from django.utils import timezone

@shared_task(soft_time_limit=None, time_limit=None)
def portScan(scan_id, ip):
    print(f"Scanning {ip}...")
    nmap = nmap3.Nmap()
    try:
        result = nmap.nmap_version_detection(ip,arg='-O -sV -Pn -T4 --version-intensity 5 -n')
    except Exception as e:
        print(f"error happened in nmap :{e}")
    scan = Scan.objects.get(pk=scan_id)
    host = Host.objects.get(scan=scan,ip_address=ip)
    NmapParser(regex_file=settings.REGEX_FILE_PATH).filter_nmap_output(result)
    resultList = list(result.items())[:-3]
    for ip, details in resultList:
            osMatch = details['osmatch']
            for os in osMatch:
                 OSMatch.objects.create(host=host, os_name=os.get('name'), accuracy=os.get('accuracy'))
            ports = details['ports']
            for port_info in ports:
                    try:
                        product = port_info.get('service', {}).get('product',None)
                        version = port_info.get('service', {}).get('version',None)
                    except Exception as e:
                         print(e)
                         continue
                    service, created = Service.objects.get_or_create(name=product)
                    service_version, created = Service_version.objects.get_or_create(service=service,version=version)
                    port = Port.objects.create(host=host,port_number=port_info['portid'],service_version=service_version)
                    fetch_vulnerabilities.delay(product,version)
    host.status = 'completed'
    host.save()
    return result

@shared_task(soft_time_limit=None, time_limit=None)
def fetch_vulnerabilities(product, version):
        service = Service.objects.get(name=product)
        service_version = Service_version.objects.get(service=service, version=version)
        vulnerabilities_queryset = service_version.vulnerabilities.all()
        vulnerabilities = [] 
        if not vulnerabilities_queryset.exists():
            with sync_playwright() as p:
                browser = p.chromium.launch(headless=True)
                page = browser.new_page()

                scraper = CVEdetails(page)
                vulnerabilities = scraper.getVulnerabilities(product, version)

        if vulnerabilities is not None:
            for vulnerability in vulnerabilities:
                vuln, created = Vulnerability.objects.get_or_create(
                    cve=vulnerability['cve'],
                    defaults={
                        'description': vulnerability['description'],
                        'score': vulnerability['score'],
                    }
                )
                service_version.vulnerabilities.add(vuln)


@shared_task
def handleScan(scan_id,cidrs):
    with allow_join_result():
        try:
            upHosts = scan_up_hosts.apply_async(args=[scan_id,cidrs]).get()
            print(upHosts)
        except Exception as e:
             print(f"error in scan_up_hosts {e}")
        task_group = group(portScan.s(scan_id, ip) for ip in upHosts)
        async_result = task_group.apply_async(countdown=3)
        async_result.join()
        scan = Scan.objects.get(pk=scan_id)
        scan.status = 'completed'
        scan.end_time = timezone.now()
        scan.save()


@shared_task
def scan_up_hosts(scan_id, cidrs):
    scan = Scan.objects.get(pk=scan_id)
    upHosts = []
    for cidr in cidrs:
        nmap = NmapHostDiscovery()
        result = nmap.nmap_no_portscan(cidr)
        for ip,details in result.items():
            if 'state' not in details:
                continue
            if details['state']['state'] == 'down':
                continue
            print(scan_id, ip)
            host = Host.objects.create(scan=scan,ip_address=ip)
            upHosts.append(ip)
        
    return upHosts
