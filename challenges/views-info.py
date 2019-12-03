from django.shortcuts import render
from django.contrib import messages
from django.views.generic import TemplateView
from .forms import ContactForm

def home(request):
    form = ContactForm(request.POST)
    if request.method == 'POST':
        if form.is_valid():
            form.save()
            name = form.cleaned_data.get('name')
            message = form.cleaned_data.get('message')
            messages.success(request, f'Your Account has now been created for {username}! You can now log in!')
            return redirect('home')

    return render(request, 'info/home.html', {'form': form})
