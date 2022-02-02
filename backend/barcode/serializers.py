from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Company, OTP


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class OTPSerializer(serializers.ModelSerializer):
    branch = serializers.SerializerMethodField()

    class Meta:
        model = OTP
        fields = '__all__'

    def get_branch(self, object):
        print(object.company_code)

        return str(object.company_code)
    
    
class OTPsSerializer(serializers.ModelSerializer):

    class Meta:
        model = OTP
        fields = '__all__'
