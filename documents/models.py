from django.db import models
import os


class Document(models.Model):
	name = models.CharField(max_length=150)
	description = models.TextField(max_length=500)
	file = models.FileField(upload_to='files/%Y/%m/%d/')
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)
	author = models.ForeignKey('users.CRMUser', null=True, on_delete=models.CASCADE, related_name='documents')
	client = models.ForeignKey('clients.Client', null=True, on_delete=models.CASCADE, related_name='documents')
	task = models.ForeignKey('tasks.ProjectTask', null=True, on_delete=models.CASCADE, related_name='documents')
	project = models.ForeignKey('projects.Project', null=True, on_delete=models.CASCADE, related_name='documents')

	class Meta:
		ordering = ['-created_at', 'name']

	def get_size(self):
		return self.file.size

	def get_filepath(self):
		return self.file.name

	def get_filename(self):
		return os.path.basename(self.file.name)

	def __str__(self):
		return self.name
