from rest_framework import serializers
from .models import Scan, Input, Host, Service, Service_version, Port, Vulnerability

class InputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Input
        fields = ['input','status']

# class HostSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Host
#         fields = ['ip_address', 'last_scanned', 'status']


class VulnerabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vulnerability
        fields = ['cve', 'description', 'score']


class ServiceVersionsSerializer(serializers.ModelSerializer):
    vulnerabilities = VulnerabilitySerializer(many=True, read_only=True)

    class Meta:
        model = Service_version
        fields = ['version', 'vulnerabilities']

class PortSerializer(serializers.ModelSerializer):
    service_name = serializers.SerializerMethodField()
    service_version = serializers.CharField(source='service_version.version', read_only=True)
    vulnerabilities = VulnerabilitySerializer(many=True, read_only=True, source='service_version.vulnerabilities')

    class Meta:
        model = Port
        fields = ['port_number', 'service_name', 'service_version','vulnerabilities']

    def get_service_name(self, obj):
        return obj.service_version.service.name if obj.service_version.service else None


class ServiceSerializer(serializers.ModelSerializer):
    versions = ServiceVersionsSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['name', 'versions']



class HostSerializer(serializers.ModelSerializer):
    ports = PortSerializer(many=True, read_only=True)
    # services = ServiceSerializer(source='service_set', many=True, read_only=True)

    class Meta:
        model = Host
        # fields = ['ip_address', 'last_scanned', 'status', 'ports', 'services']
        fields = ['id','ip_address', 'last_scanned', 'status', 'ports']



class ScanSerializer(serializers.ModelSerializer):
    hosts =  HostSerializer(many=True,read_only=True)
    class Meta:
        model = Scan
        fields = ['id','user','name','start_time','end_time','hosts','status']
