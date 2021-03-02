from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager


class CRMUser(AbstractUser):
	username = None
	email = models.EmailField(_('Email Address'), unique=True)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []
	objects = CustomUserManager()

	GENDER_MALE = 'ML'
	GENDER_FEMALE = 'FM'
	GENDER_NON_BINARY = 'NB'
	GENDER_NONE = 'NN'
	GENDER_CHOICES = [
		(GENDER_MALE, 'Male'),
		(GENDER_FEMALE, 'Female'),
		(GENDER_NON_BINARY, 'Non-binary person'),
		(GENDER_NONE, 'Not selected'),
	]

	POSITION_MANAGER = 'MA'
	POSITION_DEVELOPER = 'DE'
	POSITION_CHOICES = [
		(POSITION_MANAGER, 'Manager'),
		(POSITION_DEVELOPER, 'Developer'),
	]

	name = models.CharField(null=True, max_length=150, validators=[RegexValidator(r"[a-zA-Z ]+", 'Invalid name')])
	gender = models.CharField(null=True, max_length=2, choices=GENDER_CHOICES, default=GENDER_NONE)
	date_of_birth = models.DateField(null=True)
	image = models.ImageField(null=True, upload_to='images/profiles', blank=True)
	phone = models.CharField(null=True, max_length=13, validators=[RegexValidator(r"\+\d{12}", 'Invalid phone')])
	position = models.CharField(null=True, max_length=2, choices=POSITION_CHOICES, default=POSITION_MANAGER)

	def __str__(self):
		return self.email
