import re
import ipaddress

def get_up_hosts(ips):
    for ip in ips:
        if not valid_ip(ip):
            continue;
    
    pass

def valid_ip(ip: str):
    try:
        ip_addr = ipaddress.ip_network(ip)
        return ip_addr
    except:
        return False
    