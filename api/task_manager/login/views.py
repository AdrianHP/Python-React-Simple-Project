import json
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from login import serializers
from rest_framework.exceptions import AuthenticationFailed
from .forms import SignupForm, UserCreationForm, LoginForm
from django.contrib.auth.models import User

@api_view(['GET'])
def get_routes(request):
   routes = [
       '/login/token',
       '/login/token/refresh'
   ]
   return Response(routes)

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



@api_view(['POST'])
def registerView(request):
    if request.method == 'POST':
        post_data = json.loads(request.body.decode("utf-8"))
        username1 =post_data['username1']
        email = post_data['email']
        password1 = post_data['password1']
        password2 = post_data['password2']
        first_name = post_data['firstName']
        last_name = post_data['lastName']

        if password2== password1:
            if User.objects.filter(email = email).exists():
                return HttpResponse('Email already exists')
            elif User.objects.filter(username = username1).exists():
                 return HttpResponse('Username already exists')
            else:
                user= User.objects.create_user(username=username1,email=email,password=password1,first_name=first_name,last_name=last_name)
                user.save()
                return HttpResponse('User Created')
        else:
            return HttpResponse('password is not the same')
   
