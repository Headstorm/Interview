from django.shortcuts import render, redirect
from django.views.generic import TemplateView
from .forms import ContactForm
from django.contrib import messages
from django.utils.safestring import mark_safe
import json
import urllib
from django.conf import settings

class home(TemplateView):
	template_name = 'home.html'

	def get(self, request):
		form = ContactForm()
		return render(request, self.template_name, {'form': form})

	def post(self, request):
		form = ContactForm(request.POST)
		if form.is_valid():
			recaptcha_response = request.POST.get('g-recaptcha-response')
			url = 'https://www.google.com/recaptcha/api/siteverify'
			values = {
				'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
				'response': recaptcha_response
			}
			data = urllib.parse.urlencode(values).encode()
			req =  urllib.request.Request(url, data=data)
			response = urllib.request.urlopen(req)
			result = json.loads(response.read().decode())
			print(result)
			if result['success']:
				messages.success(request, 'Form has been submitted.')
			else:
				messages.error(request, 'Invalid reCAPTCHA. Please try again.')

			return redirect('home')
		return render(request, self.template_name, {'form': form})
		