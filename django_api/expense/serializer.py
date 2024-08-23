from rest_framework import serializers
from .models import Expense

class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        # fields = '__all__'
        fields = ['id','title','price','author','state','create_at']
