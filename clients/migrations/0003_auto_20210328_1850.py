# Generated by Django 3.1.7 on 2021-03-28 15:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0002_communicationhistory'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='communicationhistory',
            options={'ordering': ['-date']},
        ),
    ]
