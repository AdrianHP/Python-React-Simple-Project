import json
from django.http import HttpResponse, JsonResponse, HttpRequest
from django.shortcuts import get_object_or_404
from datetime import datetime
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from task_manager.models import Task, User
# from .models import Task, User


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
    tasks = Task.objects.filter(assignee_user_id=user_id).order_by('created_at','is_completed', 'priority' )
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request: HttpRequest):
    tasks = Task.objects.all()
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
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_task(request: HttpRequest):
    if request.method == "POST":
        post_data = json.loads(request.body.decode("utf-8"))
        newRecord = Task(
            title = post_data ['title'],
            priority = post_data['priority'],
            is_completed = False,
            is_accepted = False,
            created_at = datetime.now()
        )
        newRecord.save()
        print(post_data)
        return HttpResponse({'response':'200'})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_task(request: HttpRequest):
    if request.method == "PUT":
        post_data = json.loads(request.body.decode("utf-8"))
        task = get_object_or_404(Task,id = post_data['id'])
        task.title = post_data['title']
        task.priority = post_data['priority_level']
        task.is_completed = post_data['is_completed']
        task.is_accepted = post_data['is_accepted']
        task.save()
        return HttpResponse({'response':'200'})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request: HttpRequest):
    if request.method == "DELETE":
        task_id = request.GET.get('task_id')
        task = get_object_or_404(Task,id = task_id)
        task.delete()
        return HttpResponse({'response':'200'})