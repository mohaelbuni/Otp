from django.db import models
from django.contrib.auth.models import User
import uuid



# Create your models here.
class Company(models.Model):
    name = models.CharField(max_length=250)
    code = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    



class OTP(models.Model):

    barcode = models.IntegerField(null=False)
    recipent_name = models.CharField(max_length=250, null=False)
    company_code = models.ForeignKey(Company,
                                     on_delete=models.CASCADE,
                                     null=False)
    date = models.DateField(auto_now_add=True)

    # def __str__(self):
    #     return self.barcode
    
    
class OTPProxy(OTP):
    
    class Meta:
        proxy = True
