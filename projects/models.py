from django.db import models
from clients.models import Client
from tasks.models import ProjectTask


class Project(models.Model):
	name = models.CharField(max_length=200)
	description = models.TextField(max_length=2000)
	budget = models.DecimalField(max_digits=18, decimal_places=2)
	team = models.ForeignKey('teams.Team', on_delete=models.RESTRICT, related_name='projects')
	client = models.ForeignKey('clients.Client', on_delete=models.CASCADE, related_name='projects')

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name

	def has_tasks(self):
		return ProjectTask.objects.filter(project=self).exists()

	def is_finished(self):
		return self.has_tasks() and not len(list(filter(lambda t: not t.is_completed(),
												   ProjectTask.objects.filter(project=self).all()))) > 0

	def tasks_budget(self):
		return ProjectTask.objects.filter(project=self).all().aggregate(models.Sum('budget'))['budget__sum'] or 0

	class Meta:
		ordering = ['-created_at', 'name']
