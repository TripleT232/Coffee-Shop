from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    phone = models.CharField(max_length=15, blank=True)
    role = models.CharField(max_length=10, default='user')
    AUTH_USER_MODEL = 'users.User'