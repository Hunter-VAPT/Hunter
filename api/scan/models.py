from django.db import models

# Create your models here.
class Scan(models.Model):
    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(blank=True, null=True)
    STATUS_CHOICES = [
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES,default='ongoing')


    class Meta:
        db_table = 'scan'

    def save(self,*args, **kwargs):
        super().save(*args, **kwargs)

class Input(models.Model):
    scan = models.ForeignKey(Scan, on_delete=models.CASCADE,related_name='inputs')
    input = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default='pending')

    class Meta:
        verbose_name_plural = "Inputs"
    
    def save(self,*args, **kwargs):
        super().save(*args, **kwargs)

class Host(models.Model):
    ip_address = models.CharField(max_length=50)
    # hostname = models.CharField(max_length=100, blank=True, null=True)
    last_scanned = models.DateTimeField(auto_now=True)
    scan = models.ForeignKey(Scan, on_delete=models.CASCADE,related_name='hosts')
    STATUS_CHOICES = [
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES,default='ongoing')
    class Meta:
        unique_together = ('ip_address', 'scan') 

    def __str__(self):
        return self.ip_address


class Service(models.Model):
    name = models.CharField(max_length=100,null=True,blank=True)
    class Meta:
        db_table = 'services'

class Vulnerability(models.Model):
    cve = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    score = models.FloatField()

class Service_version(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE,related_name='services')
    version = models.CharField(max_length=100,null=True,blank=True)
    vulnerabilities = models.ManyToManyField(Vulnerability)
    class Meta:
        db_table = 'service_version'

class Port(models.Model):
    host = models.ForeignKey(Host, on_delete=models.CASCADE,related_name='ports')
    port_number = models.CharField(max_length=100)
    service_version = models.ForeignKey(Service_version, on_delete=models.CASCADE,related_name='service_versions')

class OSMatch(models.Model):
    host = models.ForeignKey(Host, on_delete=models.CASCADE, related_name='os_matches')
    os_name = models.CharField(max_length=100)
    accuracy = models.FloatField()

    class Meta:
        verbose_name_plural = "OS Matches"