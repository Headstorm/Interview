from django import forms
from .models import ContactRequests
from django.forms import ModelForm

class ContactForm(forms.ModelForm):
    name = forms.CharField(label='Your name', max_length=100)
    message = forms.CharField(max_length=100)

    class Meta:
        model = ContactRequests
        fields = ['name', 'message']
