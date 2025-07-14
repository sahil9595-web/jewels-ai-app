from fastapi import FastAPI, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil, uuid, os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

os.makedirs("models", exist_ok=True)

@app.post("/generate/")
async def generate_from_prompt(prompt: str = Form(...)):
    filename = f"models/{uuid.uuid4().hex}.glb"
    shutil.copyfile("example.glb", filename)
    return {"file_url": f"/{filename}"}

@app.post("/generate-from-image/")
async def generate_from_image(file: UploadFile):
    filename = f"models/{uuid.uuid4().hex}.glb"
    shutil.copyfile("example.glb", filename)
    return {"file_url": f"/{filename}"}

@app.get("/models/{file_name}")
async def serve_file(file_name: str):
    return FileResponse(f"models/{file_name}")

@app.get("/")
def read_root():
    return {"message": "Backend running"}
