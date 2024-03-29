# Generated by Django 3.1.7 on 2021-03-24 12:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0003_auto_20210324_1415'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0003_auto_20210310_1923'),
        ('documents', '0002_auto_20210320_1752'),
        ('clients', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CommunicationHistory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('channel', models.CharField(choices=[('email', 'Email'), ('phone', 'Phone'), ('social', 'Social network'), ('messenger', 'Messenger'), ('mail', 'Mail'), ('fax', 'Fax'), ('meet', 'Meeting')], default='email', max_length=20)),
                ('channel_info', models.CharField(blank=True, max_length=50, null=True)),
                ('type', models.CharField(choices=[('in', 'Inbound'), ('out', 'Outbound')], default='out', max_length=3)),
                ('description', models.TextField(max_length=1000)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='communications', to=settings.AUTH_USER_MODEL)),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='communications', to='clients.contactperson')),
                ('document', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='communications', to='documents.document')),
                ('project', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='communications', to='projects.project')),
                ('task', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='communications', to='tasks.projecttask')),
            ],
        ),
    ]
