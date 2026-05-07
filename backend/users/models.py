# Imports Django build-in base user class
from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    email = models.EmailField(unique=True)  # 

    REQUIRED_FIELDS = ["email"]