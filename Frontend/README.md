# Monsort — Frontend

React + TypeScript (Vite) frontend for Monsort. Currently includes the
login screen, wired to the FastAPI backend's `/auth/login` endpoint.

## Setup

```bash
cd Frontend
npm install
cp .env.example .env   # adjust VITE_API_URL if your backend runs elsewhere
npm run dev
```

The app expects the backend running (default `http://localhost:8000`).

## Backend requirement: enable CORS

The browser will block requests to the FastAPI backend until CORS is
enabled there. Add this to `Backend/main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware

aplicacion.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default dev port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Structure

```
src/
  api/
    client.ts     # fetch wrapper (base URL, error handling)
    auth.ts       # typed login/refresh calls, mirrors Backend esquemas/usuario.py
  context/
    AuthContext.tsx  # session state + localStorage persistence
  pages/
    Login.tsx / Login.css       # login screen
    Dashboard.tsx / Dashboard.css  # placeholder post-login screen
  App.tsx         # screen switching based on session state
```

## Notes

- Access/refresh tokens are stored in `localStorage` under `monsort.session`
  for now. Once more of the app exists, consider moving the access token to
  memory only and relying on the refresh token + `/auth/refresh` for
  persistence, to reduce XSS exposure.
- `Dashboard.tsx` is a placeholder — replace with the real app shell as
  screens are added.
