import os
import openai
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from starlette.responses import JSONResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

app = FastAPI()


logging.basicConfig(level=logging.DEBUG)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify the allowed origins here
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],
)
#print(os.environ["OPENAI_API_KEY"])
openai.api_key = "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"
class Prompt(BaseModel):
    text: str

@app.post("/generate_text")
async def generate_text(prompt: Prompt):
    try:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt.text,
            max_tokens=50,
            n=1,
            stop=None,
            temperature=0.7,
        )
        generated_text = response.choices[0].text.strip()
        return JSONResponse(content={"generated_text": generated_text})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))