from django.db import models


class Client(models.Model):
	TYPE_CHOICES = [
		('pers', 'Person'),
		('comp', 'Company')
	]

	name = models.CharField(max_length=200)
	photo = models.ImageField(upload_to='images/client_profiles', null=True, blank=True)
	type = models.CharField(max_length=4, choices=TYPE_CHOICES)
	status = models.ForeignKey('clients.ClientStatus', null=True, on_delete=models.SET_NULL)

	# Additional info
	is_vip = models.BooleanField(default=False)
	want_ads = models.BooleanField(default=True)
	source = models.CharField(max_length=100)
	manager = models.ForeignKey('users.CRMUser', on_delete=models.RESTRICT, related_name='clients')
	comments = models.JSONField(null=True, blank=True)

	# Contacts
	address = models.CharField(max_length=500, null=True, blank=True)
	postal_address = models.CharField(max_length=500, null=True, blank=True)
	phone = models.CharField(max_length=50, null=True, blank=True)
	fax = models.CharField(max_length=50, null=True, blank=True)
	email = models.EmailField(null=True, blank=True)
	socials = models.JSONField(null=True, blank=True)
	website = models.URLField(null=True, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['name']

	def __str__(self):
		return self.name


class ClientStatus(models.Model):
	name = models.CharField(max_length=70)

	class Meta:
		ordering = ['name']


class ContactPerson(models.Model):
	name = models.CharField(max_length=200)
	photo = models.ImageField(upload_to='images/client_profiles', null=True, blank=True)
	position = models.CharField(max_length=150)
	comments = models.JSONField(null=True, blank=True)
	client = models.ForeignKey('clients.Client', on_delete=models.CASCADE, related_name='contact_persons')

	# Contacts
	address = models.CharField(max_length=500, null=True, blank=True)
	postal_address = models.CharField(max_length=500, null=True, blank=True)
	phone = models.CharField(max_length=50, null=True, blank=True)
	fax = models.CharField(max_length=50, null=True, blank=True)
	email = models.EmailField(null=True, blank=True)
	socials = models.JSONField(null=True, blank=True)
	website = models.URLField(null=True, blank=True)

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		ordering = ['name']

	def __str__(self):
		return self.name
