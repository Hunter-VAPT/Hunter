from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from kombu import Exchange, Queue

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hunter.settings')

app = Celery('hunter', broker='amqp://root:root@rabbitmq:5672//',backend='rpc://')

app.conf.task_queues = (
    Queue('scraper', routing_key='scraper'),
    Queue('scanhandler', routing_key='scanhandler'),
    Queue('port_scanner', routing_key='port_scanner'),
    Queue('uphosts_scanner', routing_key='uphosts_scanner'),
)

# # Define task routes
app.conf.task_routes = {
    # Route specific tasks to their respective queues
    'scan.tasks.fetch_vulnerabilities': {'queue': 'scraper'},
    'scan.tasks.handleScan': {'queue': 'scanhandler'},
    'scan.tasks.portScan': {'queue': 'port_scanner'},
    'scan.tasks.scan_up_hosts': {'queue': 'uphosts_scanner'},
    # Add more task routes as needed
}

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()