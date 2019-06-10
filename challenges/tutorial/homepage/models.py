from django.db import models
import datetime
from django.contrib.postgres.fields import ArrayField



class fiveHundredNumbersList(models.Model):
    intArray=ArrayField(models.IntegerField(default=None,null=True),size=500);


class record(models.Model):
    recordId=models.IntegerField(default=None,null=True);
    name=models.CharField(max_length=100,default=None, null=True);
    cellphone=models.CharField(max_length=10,default=None, null=True);
    workphone=models.CharField(max_length=10,default=None, null=True);
    email=models.EmailField(default=None,null=True);
    address=models.CharField(max_length=100,default=None,null=True);
    protectionPlan=models.BooleanField(default=None,null=True);
    basicWidgetOrder=models.IntegerField(default=None,null=True);
    advancedWidgetOrder=models.IntegerField(default=None,null=True);

# class basicOrder(models.Model):
#     name=models.CharField(max_length=200,default=None, null=True);
#
# class advancedOrder(models.Model):
#     name=models.CharField(max_length=200,default=None, null=True);
