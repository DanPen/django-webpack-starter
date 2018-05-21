from django.http import HttpResponse
from django.shortcuts import render

def index(request):
    return render(request, 'index.html', {
        'cards': ['profile', 'resend-email', 'contact', 'contact-list', 'place', 'place-list']
    })

def profile(request):
    return render(request, 'profile.html')

def resend_email(request):
    return render(request, 'resend-email.html')

def contact(request):
    return render(request, 'contact.html')

def contact_list(request):
    return render(request, 'contact-list.html')

def place(request):
    return render(request, 'place.html')

def place_list(request):
    return render(request, 'place-list.html')
