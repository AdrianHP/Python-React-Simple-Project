from django.db import models
from django.contrib.auth.models import AbstractUser

from django.contrib.auth.models import User


# class Address(models.Model):
#     street = models.CharField(max_length=50)
#     city = models.CharField(max_length=30)
#     state = models.CharField(max_length=2)
#     postal_code = models.CharField(max_length=10)

# class User(AbstractUser):
#     address = models.OneToOneField(Address, models.CASCADE,null=True)



class Task(models.Model):
    PRIORITIES = {
        0: "High",
        1: "Medium",
        2: "Low",
    }
    PRIORITY_CHOICES = tuple(
        (level, name) for level, name in PRIORITIES.items()
    )

    assignee_user = models.ForeignKey(User, models.SET_NULL, null=True)  # Tasks are not required to have an assignee.
    title = models.CharField(max_length=100)
    details = models.TextField(max_length=2000, null=True)
    priority = models.PositiveSmallIntegerField(choices=PRIORITY_CHOICES)
    is_completed = models.BooleanField(default=False)
    is_accepted = models.BooleanField(default=False)  # If the assignee has accepted the task.
    created_at = models.DateTimeField()

    def get_priority_label(self):
        return self.PRIORITIES[self.priority]


class TaskNote(models.Model):
    task = models.ForeignKey(Task, models.CASCADE)
    user = models.ForeignKey(User, models.PROTECT)
    note = models.TextField(max_length=2000)
