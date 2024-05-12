from rest_framework.response import Response
from rest_framework.decorators import api_view
from hunter.utils import isValid,validate_cidr
from .tasks import handleScan
from .models import Scan, Host
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import ScanSerializer,HostSerializer
from rest_framework import status

@api_view(['POST'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def new_scan(request):
    scan =  Scan.objects.create(user=request.user,name=request.data.get('name',None))
    serializer = ScanSerializer(scan)
    ips = request.data.get('ips', None)
    if not ips:
        return Response({'error': 'IP addresses are required'}, status=status.HTTP_400_BAD_REQUEST)

    ips_list = ips.split(',')
    for ip in ips_list:
        if not isValid(ip.strip()):
            return Response({'error': f'Invalid IP: {ip}'}, status=status.HTTP_400_BAD_REQUEST)

    if ips_list:
        print(ips_list)
        handleScan.delay(scan.id,ips_list)            
        return Response({'status':"Scanning ...","scan":serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_scan(request):
    scans = Scan.objects.filter(user=request.user)
    serializer = ScanSerializer(scans, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def scan_detail(request, id):
    try:
        scan = Scan.objects.get(pk=id,user=request.user)
    except Scan.DoesNotExist:
        return Response({'error': 'Scan not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ScanSerializer(scan)
    return Response(serializer.data)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def host_detail(request, scan_id,host_id):
    try:
        scan = Scan.objects.get(pk=scan_id,user=request.user)
        host = scan.hosts.get(id=host_id)
    except (Scan.DoesNotExist,Host.DoesNotExist):
        return Response({'error': 'Host not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = HostSerializer(host)
    return Response(serializer.data)
