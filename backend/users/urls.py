# Import Django path function
from django.urls import path

from .views import SignupView

# Create URL route
urlpatterns = [ # special variable name that Django expects for URL route definitions
    path("signup/", SignupView.as_view(), name="signup"),
]

# When a request comes to the URL path signup/,
# Django should send that request to SignupView
# SignupView.as_view() -> converts the class-based view to something django can call
# The route's internal nickname is signup
#
# .as_view calls a function that will later inspect the HTTP method.
# So Conceptually .as_view() turns the SignupView(APIView) class in views.py into a callable request handler
