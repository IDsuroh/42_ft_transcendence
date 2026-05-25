# Import Django path function
from django.urls import path

from .views import SignupView, LoginView, MeView, LogoutView

# Create URL route
urlpatterns = [ # special variable name that Django expects for URL route definitions
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("me/", MeView.as_view(), name="me"),
    path("logout/", LogoutView.as_view(), name="logout"),
]

# When a request comes to the URL path signup/,
# Django should send that request to SignupView
# SignupView.as_view() -> converts the class-based view to something django can call
# The route's internal nickname is signup
#
# .as_view calls a function that will later inspect the HTTP method.
# So Conceptually .as_view() turns the SignupView(APIView) class in views.py into a callable request handler
#
# That users.urls, that we are using to link urls with the config/urls.py is a Python import path
# The __init__.py file helps Python treat users/ as a Python package