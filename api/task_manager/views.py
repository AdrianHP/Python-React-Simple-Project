from django.http import JsonResponse, HttpRequest
from django.shortcuts import get_object_or_404

from .models import Task, User


def list_users(request: HttpRequest):
    # TODO: include number of tasks assigned to each user.
    users = User.objects.order_by('first_name').all()
    data = list(
        dict(
            id=user.id,
            username=user.username,
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            address=dict(
                street=user.address.street,
                city=user.address.city,
                state=user.address.state,
                postal_code=user.address.postal_code,
            ),
        ) for user in users
    )

    return JsonResponse(dict(users=data))


def list_users_tasks(request: HttpRequest, user_id: int):
    tasks = Task.objects.filter(assignee_user_id=user_id).order_by('is_completed', 'priority', 'created_at')
    data = list(
        dict(
            id=task.id,
            assignee_user_id=task.assignee_user_id,
            title=task.title,
            details=task.details,
            priority_level=task.priority,
            priority_label=task.get_priority_label(),
            is_completed=task.is_completed,
            is_accepted=task.is_accepted,
            created_at=task.created_at,
        ) for task in tasks
    )

    return JsonResponse(dict(tasks=data))


def get_task_details(request: HttpRequest, task_id: int):
    task = get_object_or_404(Task, id=task_id)
    notes = task.tasknote_set.all()

    notes_data = list(
        dict(
            # TODO: remove and update UI to retrieve values from state store.
            user=dict(
                id=note.user.id,
                first_name=note.user.first_name,
                last_name=note.user.last_name,
            ),
            note=note.note
        ) for note in notes
    )
    task_data = dict(
        id=task.id,
        assignee_user_id=task.assignee_user_id,
        title=task.title,
        details=task.details,
        priority_level=task.priority,
        priority_label=task.get_priority_label(),
        is_completed=task.is_completed,
        is_accepted=task.is_accepted,
        created_at=task.created_at,
        notes=notes_data
    )

    return JsonResponse(task_data)
