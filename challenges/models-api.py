from django.db import models

# Create your models here.
class data(models.Model):
    numbers = models.CharField(max_length=2000)

def __str__(self):
    return '%s %s' % (self.id, self.numbers)
