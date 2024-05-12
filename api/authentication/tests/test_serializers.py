from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from authentication.serializers import UserSerializer

class UserSerializerTestCase(APITestCase):
    def test_user_serializer_valid(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'strongpassword',
            'confirm_password': 'strongpassword'
        }
        serializer = UserSerializer(data=data)
        self.assertTrue(serializer.is_valid())

    def test_user_serializer_invalid_username(self):
        data = {
            'username': 'test',
            'email': 'test@example.com',
            'password': 'strongpassword',
            'confirm_password': 'strongpassword'
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)

    def test_user_serializer_invalid_password(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'pass',
            'confirm_password': 'pass'
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('password', serializer.errors)

    def test_user_serializer_password_mismatch(self):
        data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'strongpassword',
            'confirm_password': 'differentpassword'
        }
        serializer = UserSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('non_field_errors', serializer.errors)
