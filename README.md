# Enterprise Monitoring Starter (React + Django)

Multi-component React dashboard + Django mock API. No DB required (SQLite default).

## Run

### Backend
```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# Unix/macOS:
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### Frontend
```bash
cd web
npm i
# copy .env.example to .env and adjust API base if needed
cp .env.example .env
npm run dev
```

Then open http://localhost:5173