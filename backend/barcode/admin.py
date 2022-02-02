from django.contrib import admin
from .models import OTP,Company,OTPProxy
from import_export.admin import ImportExportModelAdmin

# Register your models here.

# class OTPAdmin(admin.ModelAdmin):
#     list_filter=('recipent_name','company_code','barcode',)
#     list_display=('barcode','recipent_name','company_code')


@admin.register(OTPProxy,Company)
class ViewAdmin(ImportExportModelAdmin):
    pass

@admin.register(OTP)
class OTPProxyAdmin(admin.ModelAdmin):
    list_filter=('company_code','date')
    list_display=('barcode','recipent_name','company_code','date')








