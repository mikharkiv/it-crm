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


class CommunicationHistory(models.Model):
	TYPE_INBOUND = 'in'
	TYPE_OUTBOUND = 'out'

	TYPE_CHOICES = [
		(TYPE_INBOUND, 'Inbound'),
		(TYPE_OUTBOUND, 'Outbound'),
	]

	CHANNEL_EMAIL = 'email'
	CHANNEL_PHONE = 'phone'
	CHANNEL_SOCIAL = 'social'
	CHANNEL_MESSENGER = 'messenger'
	CHANNEL_MAIL = 'mail'
	CHANNEL_FAX = 'fax'
	CHANNEL_MEETING = 'meet'

	CHANNEL_CHOICES = [
		(CHANNEL_EMAIL, 'Email'),
		(CHANNEL_PHONE, 'Phone'),
		(CHANNEL_SOCIAL, 'Social network'),
		(CHANNEL_MESSENGER, 'Messenger'),
		(CHANNEL_MAIL, 'Mail'),
		(CHANNEL_FAX, 'Fax'),
		(CHANNEL_MEETING, 'Meeting')
	]

	date = models.DateTimeField(auto_now_add=True)
	author = models.ForeignKey('users.CRMUser', on_delete=models.CASCADE, related_name='communications')
	contact = models.ForeignKey(ContactPerson, on_delete=models.CASCADE, related_name='communications')
	channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES, default=CHANNEL_EMAIL)
	channel_info = models.CharField(max_length=50, null=True, blank=True)
	type = models.CharField(max_length=3, choices=TYPE_CHOICES, default=TYPE_OUTBOUND)
	description = models.TextField(max_length=1000)
	# additional info
	task = models.ForeignKey('tasks.ProjectTask', null=True, on_delete=models.CASCADE, related_name='communications')
	project = models.ForeignKey('projects.Project', null=True, on_delete=models.CASCADE, related_name='communications')
	document = models.ForeignKey('documents.Document', null=True, on_delete=models.CASCADE, related_name='communications')

	class Meta:
		ordering = ['-date']
