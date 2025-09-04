from django.contrib import admin
from django.urls import path
from core.views import systems, alerts, system_metrics

urlpatterns = [
  path('admin/', admin.site.urls),
  path('api/systems/', systems),
  path('api/alerts/', alerts),
  path('api/systems/<int:pk>/metrics/', system_metrics),
]