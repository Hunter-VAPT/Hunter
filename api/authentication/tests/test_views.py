from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase

class AuthenticationViewsTestCase(APITestCase):
    def test_user_signup(self):
        url = reverse('signup')
        data = {
            'username': 'testuser',
            'password': 'strongpassword',
            'confirm_password': 'strongpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user', response.data)

    def test_user_signin(self):
        user = User.objects.create_user(username='testuser', password='strongpassword')

        url = reverse('signin')
        data = {
            'username': 'testuser',
            'password': 'strongpassword'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user', response.data)

    def test_test_token(self):
        user = User.objects.create_user(username='testuser', password='strongpassword')
        url = reverse('signin')
        data = {
            'username': 'testuser',
            'password': 'strongpassword'
        }
        response = self.client.post(url, data, format='json')
        token = response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
        url = reverse('test_token')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_signup_username_exists(self):
        existing_username = 'testuser'
        existing_password = 'strongpassword'
        User.objects.create_user(username=existing_username, password=existing_password)

        url = reverse('signup')
        data = {
            'username': existing_username,
            'password': 'newstrongpassword',
            'confirm_password': 'newstrongpassword'
        }
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('errors', response.data)
        self.assertIn('username', response.data['errors'])