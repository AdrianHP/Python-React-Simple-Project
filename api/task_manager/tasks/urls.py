from django.urls import path, include
from task_manager.tasks import views
 
urlpatterns = [
    path('users/', views.list_users),
    path('<int:task_id>/', views.get_task_details),
    path('get/usertasks',views.list_users_tasks),
    path('add/', views.add_task),
    path('edit/', views.edit_task),
    path('delete/', views.delete_task),
    path('getall/', views.get_tasks),
 ]