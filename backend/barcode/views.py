from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import OTP, Company
from .serializers import CompanySerializer, OTPSerializer,OTPsSerializer
from django.http import Http404
from rest_framework import status


# get all company data (name, code)
# post create new company
@api_view(['GET', 'POST'])
def get_companies(request):

    if request.method == 'GET':
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        data = Company(name=request.data['name'], code=request.data['code'])
        data.save()
        return Response({"save": "success"})
    
@api_view(['GET'])
def get_company(request,code):
    if request.method == 'GET':
        company = Company.objects.get(code=str(code)) 
        otps = OTP.objects.filter(company_code=company.id)
        serializer = OTPSerializer(otps, many=True)
        return Response(serializer.data)



# Get all otp from database
# POST create new otp in database
@api_view(['GET', 'POST'])
def get_OTPs(request):
    if request.method == 'GET':
        otps = OTP.objects.all()
        serializer = OTPSerializer(otps, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        try:
            go = OTP.objects.get(barcode=request.data['barcode'])
            return Response({"message": "barcode already exists"},
                            status=status.HTTP_403_FORBIDDEN)
        except OTP.DoesNotExist:
            code = Company.objects.get(code=request.data['company_code'])
            data = OTP(barcode=request.data['barcode'],
                       recipent_name=request.data['recipent_name'],
                       company_code=code)
            data.save()
            return Response({"save": "success"}, status=status.HTTP_200_OK)


# GET -> search otp by barcode


@api_view(['GET'])
def get_OTPByBarcode(request, barcode):
    if request.method == 'GET':
        try:
            obj = OTP.objects.get(barcode=int(barcode))
            serializer = OTPSerializer(obj, many=False)
            return Response(serializer.data)
        except OTP.DoesNotExist:
            return Response({'message': 'Barcode does not exist'},
                            status.HTTP_404_NOT_FOUND)
