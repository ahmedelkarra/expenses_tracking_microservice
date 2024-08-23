from django.urls import path
from .views import expense_info,expense_options


urlpatterns = [
    path('expense',expense_info,name='expense_info'),
    path('expense/<int:id>',expense_options,name='expense_options'),
]
