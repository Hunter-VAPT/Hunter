import re
import ipaddress

def validate_ip(ip_str):
    try:
        ipaddress.ip_address(ip_str)
        return True
    except ValueError:
        return False

def validate_cidr(cidr_str):
    try:
        ipaddress.ip_network(cidr_str, strict=False)
        return True
    except ValueError:
        return False

def validate_ip_range(ip_range_str):
    try:
        start, end = ip_range_str.split('-')
        ipaddress.ip_address(start)
        ipaddress.ip_address(end)
        return True
    except ValueError:
        return False
    
def isValid(ip):
    return validate_ip(ip) or validate_cidr(ip) or validate_ip_range(ip)