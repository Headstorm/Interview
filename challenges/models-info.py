from django.db import models
from django.utils import timezone

class ContactRequests(models.Model):
    name = models.CharField(max_length=100)
    message = models.CharField(max_length=100)
    date_posted = models.DateTimeField(default=timezone.now)

def __str__(self):
    return '%s %s' % (self.name, self.message)


def __str__(self):
    return self.name

class Customers(models.Model):
    recordid = models.IntegerField()
    name = models.CharField(max_length=100)
    cellphone = models.CharField(max_length=12)
    workphone = models.CharField(max_length=12)
    email = models.EmailField()
    address = models.CharField(max_length=255)
    protectionplan = models.BooleanField(default=False)

def __str__(self):
    return self.name

class Orders(models.Model):
    basicwidgetorder = models.IntegerField()
    advancedwidgetorder = models.IntegerField()
    name = models.ForeignKey(Customers, on_delete=models.CASCADE)

    def __str__(self):
        return '%s %s %s' % (self.basicwidgetorder, self.advancedwidgetorder, self.name)
