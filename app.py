"""FastAPI entry point used by the React frontend (frontend/).

Endpoints (contract expected by frontend/src/api.js):
  GET  /api/health              -> {"status": "ok", "ai_mode": "groq" | "fallback"}
  POST /api/generate            -> run_factory result (requirements, plan, build, tests, events, memory)
  GET  /api/download/{project}  -> ZIP of a generated project

Run:  uvicorn app:app --reload --port 8000
"""
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field

try:  # optional: load GROQ_API_KEY etc. from a local .env file
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

from integration.output_manager import get_project_zip
from orchestrator.workflow import run_factory

app = FastAPI(title="Agent Factory API")

origins = [o.strip() for o in os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",") if o.strip()]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_methods=["GET", "POST"], allow_headers=["*"])


class GenerateRequest(BaseModel):
    prompt: str = Field(..., min_length=8, max_length=4000)


@app.get("/api/health")
def health():
    return {"status": "ok", "ai_mode": "groq" if os.getenv("GROQ_API_KEY", "").strip() else "fallback"}


@app.post("/api/generate")
def generate(body: GenerateRequest):
    try:
        return run_factory(body.prompt.strip())
    except Exception as exc:  # surfaced to the UI as the error banner
        raise HTTPException(status_code=500, detail=f"Generation failed: {exc}") from exc


@app.get("/api/download/{project_id}")
def download(project_id: str):
    archive = get_project_zip(project_id)
    if archive is None:
        raise HTTPException(status_code=404, detail="Project not found.")
    return FileResponse(archive, media_type="application/zip", filename=f"{project_id}.zip")
