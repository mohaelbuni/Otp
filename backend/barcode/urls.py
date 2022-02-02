from django.urls import path
from . import views

urlpatterns = [
    # GET get all companies
    path('companies',views.get_companies),
    path('company/<code>',views.get_company),
    # POST add otp and GET to get all otps
    path('getOTPs',views.get_OTPs), 
    # GET search for otp by barcode
    path('getOTPs/<int:barcode>',views.get_OTPByBarcode),
]