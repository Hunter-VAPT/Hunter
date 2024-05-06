from rest_framework.response import Response
from rest_framework.decorators import api_view
from hunter.utils import get_up_hosts
from .tasks import  scan_up_hosts,portScan,handleScan
from .models import Scan, Input, Host
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import ScanSerializer,HostSerializer
from django.utils import timezone
from rest_framework import status

@api_view(['POST'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def new_scan(request):
    scan =  Scan.objects.create(user=request.user,name=request.data.get('name',None))
    serializer = ScanSerializer(scan)
    if request.data.get('ips', None) is not None:
        ips = request.data.get('ips').split('\n')
        handleScan.delay(scan.id,ips)            
        return Response({'status':"Scanning ...","scan":serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_scan(request):
    scans = Scan.objects.filter(user=request.user)
    serializer = ScanSerializer(scans, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def up_hosts(request):
    scan =  Scan.objects.create(user=request.user)
    serializer = ScanSerializer(scan)
    ips = []
    if request.data.get('ips', None) is not None:
        ips = request.data.get('ips').split('\n')
        for ip in ips:
            input = Input.objects.create(scan=scan, input=ip)
            scan_up_hosts.delay(scan.id,ip,input.id)        
    return Response({'status':"start checking up hosts","scan":serializer.data})

# @api_view(['POST'])
# @authentication_classes([SessionAuthentication,TokenAuthentication])
# @permission_classes([IsAuthenticated])
# def status(request):
#     scan_id = request.data.get('scan_id')
#     scan = Scan.objects.get(pk=scan_id)
#     serializer = ScanSerializer(scan)
#     inputs = serializer.data['inputs']
#     return Response({'status':"checking status","scan":serializer.data})
    
@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def scan_detail(request, id):
    try:
        scan = Scan.objects.get(pk=id)
    except Scan.DoesNotExist:
        return Response({'error': 'Scan not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ScanSerializer(scan)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def host_detail(request, scan_id,host_id):
    try:
        scan = Scan.objects.get(pk=scan_id)
        host = scan.hosts.get(id=host_id)
    except (Scan.DoesNotExist,Host.DoesNotExist):
        return Response({'error': 'Host not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = HostSerializer(host)
    return Response(serializer.data)
