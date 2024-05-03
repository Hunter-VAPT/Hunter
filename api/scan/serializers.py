from rest_framework import serializers
from .models import Scan, Input, Host, Service, Service_versions, Port, Vulnerability

class InputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Input
        fields = ['input','status']

# class HostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Host
#         fields = ['ip_address', 'last_scanned', 'status']

class PortSerializer(serializers.ModelSerializer):
    service_version = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Port
        fields = ['port_number', 'service_version']


class VulnerabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vulnerability
        fields = ['cve', 'description', 'score']



class ServiceVersionsSerializer(serializers.ModelSerializer):
    vulnerabilities = VulnerabilitySerializer(many=True, read_only=True)

    class Meta:
        model = Service_versions
        fields = ['version', 'vulnerabilities']



class ServiceSerializer(serializers.ModelSerializer):
    versions = ServiceVersionsSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['name', 'versions']



class HostSerializer(serializers.ModelSerializer):
    ports = PortSerializer(many=True, read_only=True)
    services = ServiceSerializer(source='service_set', many=True, read_only=True)

    class Meta:
        model = Host
        fields = ['ip_address', 'last_scanned', 'status', 'ports', 'services']



class ScanSerializer(serializers.ModelSerializer):
    inputs =  InputSerializer(many=True,read_only=True)
    hosts =  HostSerializer(many=True,read_only=True)
    class Meta:
        model = Scan
        fields = ['id','user','start_time','end_time','inputs','hosts','status']
