import json
import re

class NmapParser:
    def __init__(self, regex_file="regex.json"):
        self.patterns = self.load_regex(regex_file)

    def load_regex(self, regex_file):
        with open(regex_file) as f:
            return json.load(f).get("patterns")

    def filter_nmap_output(self, result):
        ips = list(result.keys())[:-3]
        for ip in ips:
            ports = result[ip]["ports"]
            for port in ports:
                try:
                    service = port['service']
                    if "version" in service and "product" in service:
                        self.extract_service_version(service)
                except:
                    continue

    def extract_service_version(self, service):
        line = service["product"] + " " + service["version"]
        general_patterns = self.patterns.get("general")
        service_patterns = self.patterns.get("services")

        for general_pattern in general_patterns:
            match = re.search(general_pattern.get("regex"), line)
            if match:
                service["product"] = match.group(1)
                service["version"] = match.group(2)
                return service

        for service_pattern in service_patterns:
            pattern = service_patterns.get(service_pattern)
            match = re.search(pattern.get("regex"), line)
            if match:
                service["product"] = pattern.get("service")
                service["version"] = match.group(1)
                return service
