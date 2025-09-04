from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
import random

DEPARTMENTS = ['HR','Finance','IT','Marketing','Operations','Sales']
LOCATIONS = ['Toronto','Vancouver','Montreal','Calgary','Ottawa']
OS_TYPES = ['Windows 10','Windows 11','Ubuntu 20.04','macOS']

def make_system(i):
    cpu = random.random()*100
    mem = random.random()*100
    disk = random.random()*100
    latest = {
        'cpu': cpu, 'memory': mem, 'disk': disk, 'network': random.random()*100,
        'healthScore': int(max(0, min(100, 100 - (cpu+mem+disk)/3)))
    }
    return {
        'id': i,
        'name': f"WS-{i:03d}",
        'hostname': f"workstation-{i}.company.local",
        'department': random.choice(DEPARTMENTS),
        'location': random.choice(LOCATIONS),
        'os': random.choice(OS_TYPES),
        'version': f"v{random.randint(1,3)}.{random.randint(0,9)}.{random.randint(0,19)}",
        'last_seen': (datetime.now() - timedelta(minutes=random.randint(0,59))).isoformat(),
        'latest': latest,
    }

ALERT_TYPES = ['High CPU Usage','Low Disk Space','Memory Warning','Network Connectivity','Security Update Required','Service Down']
SEVERITIES = ['critical','warning','info']

@api_view(['GET'])
def systems(request):
    count = int(request.GET.get('count', 125))
    data = [ make_system(i+1) for i in range(count) ]
    return Response(data)

@api_view(['GET'])
def alerts(request):
    count = int(request.GET.get('count', 5))
    data = []
    for i in range(count):
        data.append({
            'id': i+1,
            'systemId': random.randint(1,125),
            'type': random.choice(ALERT_TYPES),
            'severity': random.choice(SEVERITIES),
            'message': f"Alert {i+1}: System requires attention",
            'ts': (datetime.now() - timedelta(hours=random.random()*24)).isoformat(),
            'acknowledged': random.random()>0.7,
            'resolved': random.random()>0.8,
        })
    return Response(data)

@api_view(['GET'])
def system_metrics(request, pk:int):
    hours = int(request.GET.get('hours', 24))
    now = datetime.now()
    points = []
    for h in range(hours-1, -1, -1):
        t = now - timedelta(hours=h)
        points.append({
            'ts': t.isoformat(),
            'cpu': random.random()*100,
            'memory': random.random()*100,
            'disk': random.random()*100,
            'network': random.random()*100,
        })
    return Response(points)