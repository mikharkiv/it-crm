from django.core.validators import RegexValidator
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager


class CRMUser(AbstractUser):
	username = None
	email = models.EmailField(_('Email Address'), unique=True)
	first_name = models.CharField(_('first name'), max_length=150, blank=False)
	last_name = models.CharField(_('last name'), max_length=150, blank=False)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['gender', 'date_of_birth', 'position', 'first_name', 'last_name']
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

	gender = models.CharField(max_length=2, choices=GENDER_CHOICES, default=GENDER_NONE)
	date_of_birth = models.DateField()
	image = models.ImageField(null=True, upload_to='images/profiles', blank=True)
	phone = models.CharField(null=True, max_length=13, validators=[RegexValidator(r"\+\d{12}", 'Invalid phone')])
	position = models.CharField(max_length=2, choices=POSITION_CHOICES, default=POSITION_MANAGER)

	def __str__(self):
		return self.email
