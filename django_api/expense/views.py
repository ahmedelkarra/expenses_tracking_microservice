from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import ExpenseSerializer
from .models import Expense
import requests
import json

@api_view(['GET','POST'])
def expense_info(request):
    try:
        token = request.headers.get('Authorization')

        if not token:
            return Response({'message': 'Token is missing'}, status=401)
        
        response = requests.get('http://127.0.0.1:4000/api/me', headers={'Authorization': token})
        api_data = response.json()
        author_id = api_data.get('message').get('_id')

        if request.method == 'GET':
                expense = Expense.objects.filter(author=author_id)
                data = ExpenseSerializer(expense, many=True).data
                return Response({'message': data}, status=200)
        
        elif request.method == 'POST':
            data_json = json.loads(request.body)
            title = data_json.get('title')
            price = data_json.get('price')
            state = data_json.get('state')
            if title and price and state:
                expense_data = Expense()
                expense_data.title = title
                expense_data.price = price
                expense_data.author = author_id
                expense_data.state = state
                expense_data.save()
                return Response({'message': 'Expense has been created'}, status=201)
            else:
                 return Response({'message': 'Please check your inputs'}, status=400)
        
    except:
        return Response({'message': 'Token is invalid or expired'}, status=401)
    

@api_view(['PUT','DELETE'])
def expense_options(request,id):
    try:
        token = request.headers.get('Authorization')

        if not token:
            return Response({'message': 'Token is missing'}, status=401)
        
        response = requests.get('http://127.0.0.1:4000/api/me',headers={'Authorization':token})
        api_data = response.json()
        author_id = api_data.get('message').get('_id')


        if request.method == 'PUT':
            data_json = json.loads(request.body)
            title = data_json.get('title')
            price = data_json.get('price')
            state = data_json.get('state')
            if title and price and state:
                expense_data = Expense.objects.filter(author=author_id,id=id).first()
                if expense_data:
                    expense_data.title = title
                    expense_data.price = price
                    expense_data.author = author_id
                    expense_data.state = state
                    expense_data.save()
                    return Response({'message': 'Expense has been updated'}, status=200)
                else:
                    return Response({'message': 'Expense not found'}, status=404)
            else:
                 return Response({'message': 'Please check your inputs'}, status=400)
    
        elif request.method == 'DELETE':
                expense_data = Expense.objects.filter(author=author_id,id=id).first()
                if expense_data:
                    expense_data.delete()
                    return Response({'message': 'Expense has been deleted'}, status=200)
                else:
                    return Response({'message': 'Expense not found'}, status=404)
     
    except:
        return Response({'message': 'Token is invalid or expired'}, status=401)