from django.db import models
from django.template.defaultfilters import truncatechars


# TODO status
class ProjectTask(models.Model):
	name = models.CharField(max_length=150)
	description = models.TextField(max_length=2500)
	deadline = models.DateTimeField()
	budget = models.DecimalField(max_digits=10, decimal_places=2)
	project = models.ForeignKey('projects.Project', on_delete=models.CASCADE, related_name='tasks')
	author = models.ForeignKey('users.CRMUser', on_delete=models.SET_NULL, null=True, related_name='created_tasks')
	notes = models.JSONField(null=True, blank=True)
	attached_persons = models.ManyToManyField('users.CRMUser', through='PersonApproval', related_name='tasks')

	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.name

	def is_completed(self):
		return not PersonApproval.objects.filter(
			task=self,
			is_completed=False
		).exists()
		# return not self.attached_persons.filter(is_completed=False).exists()

	def get_client(self):
		return self.project.client

	def get_team(self):
		return self.project.team

	def get_teamlead(self):
		return self.project.team.teamlead

	class Meta:
		ordering = ['-created_at', 'name']


class PersonApproval(models.Model):
	task = models.ForeignKey(ProjectTask, on_delete=models.CASCADE)
	person = models.ForeignKey('users.CRMUser', on_delete=models.CASCADE)
	is_completed = models.BooleanField(default=False)

	class Meta:
		ordering = ['is_completed', 'person']


class ProjectTaskComment(models.Model):
	task = models.ForeignKey('tasks.ProjectTask', on_delete=models.CASCADE, related_name='comments')
	author = models.ForeignKey('users.CRMUser', on_delete=models.RESTRICT, related_name='tasks_comments')
	text = models.TextField(max_length=2500)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return truncatechars(self.text, 30)

	class Meta:
		ordering = ['-created_at']
