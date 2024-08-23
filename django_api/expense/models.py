from django.db import models

# Create your models here.

class StateOptions(models.TextChoices):
    Incomes='incomes','Incomes'
    Expenses='expenses','Expenses'

class Expense(models.Model):
    author = models.CharField(max_length=200, null=False, blank=False)
    title = models.CharField(max_length=50, null=False, blank=False)
    price = models.IntegerField(null=False, blank=False)
    state= models.CharField(choices=StateOptions,null=False, blank=False,max_length=20)
    create_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title
