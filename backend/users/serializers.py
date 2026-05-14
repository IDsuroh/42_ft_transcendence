# Imports Django helper function, Django's built-in password validation function, REST serializer tools
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

# Gets the active user model (our custom user model)
User = get_user_model()

# Create serializer class for signup (inheritance from ModelSerializer class)
class SignupSerializer(serializers.ModelSerializer):
    # CharField -> the field expects text/string data and block response to hide password
    password = serializers.CharField(write_only=True)

    class Meta: # Extra settings for the class (Nested class)
        model = User    # use User model
        fields = ["id", "username", "email", "password"]
        # This serializer is connected to the User model and handles these fields

    # define a function called validate_email (method)
    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already used.")
        
        return value
    
    def validate_password(self, value):
        validate_password(value)
        return value
    
    # validated_data is a Python Dictionary (key:value pairs)
    def create(self, validated_data):
        # Take the password out of validated_data, then store it in a variable called password
        password = validated_data.pop("password")

        # Create user
        user = User.objects.create_user(    # This function handles password hashing
            username=validated_data["username"],
            email=validated_data["email"],
            password=password,
        )

        return user
    
# Serializer is the layer that converts and validates data between
# - JSON from Frontend
# - Python/Django objects
# - Database models
# To serialize means to convert complex object into a format that can be transferred or stored.
# This file is responsible for:
# - Checking the signup data
# - Creating users safely