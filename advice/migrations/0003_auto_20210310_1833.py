# Generated by Django 3.1.7 on 2021-03-10 16:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('advice', '0002_auto_20210303_2011'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='advice',
            options={'ordering': ['-created_at', 'name']},
        ),
        migrations.AlterModelOptions(
            name='advicecomment',
            options={'ordering': ['created_at']},
        ),
    ]