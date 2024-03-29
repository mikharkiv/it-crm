from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import ugettext_lazy as _


class CustomUserManager(BaseUserManager):
	def create_user(self, email, password, first_name, last_name,
					gender, date_of_birth, position, **extra_fields):
		if not email:
			raise ValueError(_('The Email must be set'))
		if not gender:
			raise ValueError(_('The Gender must be set'))
		if not date_of_birth:
			raise ValueError(_('The Date of Birth must be set'))
		if not position:
			raise ValueError(_('The Position must be set'))
		if not first_name:
			raise ValueError(_('The Position must be set'))
		if not last_name:
			raise ValueError(_('The Position must be set'))
		email = self.normalize_email(email)
		user = self.model(email=email, gender=gender, date_of_birth=date_of_birth, position=position, **extra_fields)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self, email, password, first_name, last_name,
						gender, date_of_birth, position, **extra_fields):
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)
		extra_fields.setdefault('is_active', True)

		if extra_fields.get('is_staff') is not True:
			raise ValueError(_('Superuser must have is_staff=True.'))
		if extra_fields.get('is_superuser') is not True:
			raise ValueError(_('Superuser must have is_superuser=True.'))
		return self.create_user(email, password, first_name, last_name, gender, date_of_birth, position, **extra_fields)
