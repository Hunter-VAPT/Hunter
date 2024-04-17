from rest_framework.response import Response
from rest_framework.decorators import api_view
from hunter.utils import get_up_hosts
from .tasks import add

@api_view(['POST'])
def up_hosts(request):
    ips = []
    if request.data.get('ips', None) is not None:
        ips = request.data.get('ips').split('\n')
        add.delay(1,2)        
    # get_up_hosts(ips)
    return Response({'status':"start checking uphosts",'xx':ips})