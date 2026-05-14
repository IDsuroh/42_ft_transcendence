# Imports HTTP status, permission class, response class, API view
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import SignupSerializer

# create class that inherits from APIView (API request handler) - handles signup request
class SignupView(APIView):
    permission_classes = [AllowAny] # allow anyone to access for signup - a Django framework class

    # Signup should be a POST request
    def post(self, request):
        # Create an object that uses JSON data
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():   # Runs functions from serializer.py
            user = serializer.save()

            return Response(    # Returns response back to the client
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                status=status.HTTP_201_CREATED,
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# This file is responsible for:
# - receiving the HTTP request
# - using the serializer
# - returning an HTTP response
#
# .is_valid() does: DRF does built-in validation to the fields declared in serializer.py,
# then looks for custom validation -> validate_<field_name>
#   1. Check field "username"
#      - Is it present?
#      - Is it valid text?
#   
#   2. Check field "email"
#      - Is it a valid email format?
#      - Is there a method validate_email()?
#      - Yes, call validate_email("player1@example.com")
#   
#   3. Check field "password"
#      - Is it valid text?
#      - Is there a method validate_password()?
#      - Yes, call validate_password("StrongPassword123")
#   
#   4. If all pass:
#      - Store cleaned values in serializer.validated_data
#      - Return True
#   
#   5. If any fail:
#      - Store errors in serializer.errors
#      - Return False
#
# .save() knows how to run create() because
# serializer = SignupSerializer(data=request.data) -> means the serializer has input data but no User obj
# so save is designed to call either create() or update()
#
# .errors come from build-in field validation
# It can contain:
#   built-in DRF field errors
#   custom validate_email errors
#   custom validate_password errors
#   model/unique validation errors
#   other serializer validation errors