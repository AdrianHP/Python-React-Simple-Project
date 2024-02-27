from django.db import models


class Address(models.Model):
    street = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=2)
    postal_code = models.CharField(max_length=10)


class User(models.Model):
    username = models.CharField(max_length=30)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(null=True)
    address = models.OneToOneField(Address, models.CASCADE)


class Task(models.Model):
    PRIORITIES = {
        1: "High",
        2: "Medium",
        3: "Low",
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
