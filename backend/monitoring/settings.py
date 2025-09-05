import os
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('DJANGO_SECRET', 'dev')
DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'

# Allow your Render domain and local dev
ALLOWED_HOSTS = [
    'localhost', '127.0.0.1',
    os.getenv('RENDER_EXTERNAL_HOSTNAME', ''),  # Render injects this
]

INSTALLED_APPS = [
    'django.contrib.admin','django.contrib.auth','django.contrib.contenttypes',
    'django.contrib.sessions','django.contrib.messages','django.contrib.staticfiles',
    'rest_framework','core','corsheaders',  # add corsheaders
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',     # add whitenoise
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',          # add corsheaders BEFORE CommonMiddleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Static files for production
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
# Optional: compression for smaller payloads
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# CORS — add your frontend origins here
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://enterprise-monitoring-dashboard.vercel.app",
]
