# Generated by Django 3.1.7 on 2021-03-28 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_project_budget'),
    ]

    operations = [
        migrations.AlterField(
            model_name='project',
            name='budget',
            field=models.DecimalField(decimal_places=2, max_digits=18),
        ),
    ]