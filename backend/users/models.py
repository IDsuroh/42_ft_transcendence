# Imports Django build-in base user class
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    # Django email model
    # Email is optional at the model/database level for now.
    # Later, normal user signup logic should require email.
    email = models.EmailField(unique=True, blank=True, null=True)
    # unique=True -> users cannot have the same email
    # blank=True -> Django forms/admin are allowed to leave this field empty
    # null=True -> To allow the database to add null value as well