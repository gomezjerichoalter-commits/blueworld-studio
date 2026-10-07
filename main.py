from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel

app = FastAPI()

@app.get("/", response_class=FileResponse)
def read_root():
    return "index.html"

class ClientData(BaseModel):
    device: str
    action: str

@app.post("/api/action")
def handle_action(data: ClientData):
    return {"status": "success", "app": "Blueworld NWO Studio", "message": "Dashboard action processed successfully!", "received": data}
