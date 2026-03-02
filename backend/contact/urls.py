from django.urls import path
from . import views

urlpatterns = [
    path('api/contact/', views.submit_contact, name='submit_contact'),
]
