# Generated by Django 2.0.2 on 2018-02-04 00:02

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('task_manager', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='details',
            field=models.TextField(max_length=2000, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(max_length=254, null=True),
        ),
    ]
