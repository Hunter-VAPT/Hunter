from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

# TODO: input validation
# TODO: hash password on create

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({'token':token.key,'user':serializer.data})
    return Response({'errors':serializer.errors})

@api_view(['POST'])
def signin(request):
    try:
        user = User.objects.get(username=request.data['username'])
    except:
        return Response({'errors':'Username or Password is not valid'})
    if not user.check_password(request.data['password']):
        return Response({'errors':'Username or Password is not valid'})
    
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({'token':token.key,'user':serializer.data})

@api_view(['GET'])
@authentication_classes([SessionAuthentication,TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    serializer = UserSerializer(instance=request.user)
    return Response({'user':serializer.data})