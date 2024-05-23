from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from unittest.mock import patch
from scan.models import Scan

class ScanViewsTestCase(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.login(username='testuser', password='testpassword')

    @patch('scan.views.handleScan.delay')
    def test_new_scan_valid_ips(self, mock_handleScan):
        url = reverse('new_scan')
        data = {
            'name': 'Test Scan',
            'ips': '192.168.1.1, 10.0.0.1'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], "Scanning ...")
        self.assertTrue(Scan.objects.filter(name='Test Scan').exists())
        mock_handleScan.assert_called_once()

    def test_new_scan_invalid_ip(self):
        url = reverse('new_scan')
        data = {
            'name': 'Test Scan',
            'ips': '999.999.999.999'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'Invalid IP: 999.999.999.999')

    def test_new_scan_no_ips(self):
        url = reverse('new_scan')
        data = {
            'name': 'Test Scan',
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], 'IP addresses are required')

    @patch('scan.views.handleScan.delay')
    def test_new_scan_valid_cidr(self, mock_handleScan):
        url = reverse('new_scan')
        data = {
            'name': 'Test Scan CIDR',
            'ips': '192.168.1.0/24'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], "Scanning ...")
        self.assertTrue(Scan.objects.filter(name='Test Scan CIDR').exists())
        mock_handleScan.assert_called_once()

    @patch('scan.views.handleScan.delay')
    def test_new_scan_valid_ip_range(self, mock_handleScan):
        url = reverse('new_scan')
        data = {
            'name': 'Test Scan Range',
            'ips': '192.168.1.1-192.168.1.255'
        }
        response = self.client.post(url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], "Scanning ...")
        self.assertTrue(Scan.objects.filter(name='Test Scan Range').exists())
        mock_handleScan.assert_called_once()