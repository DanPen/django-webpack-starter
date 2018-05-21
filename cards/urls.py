from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('profile', views.profile, name='profile'),
    path('resend-email', views.resend_email, name='resend-email'),
    path('contact', views.contact, name='contact'),
    path('contact-list', views.contact_list, name='contact-list'),
    path('place', views.place, name='place'),
    path('place-list', views.place_list, name='place-list')
]
