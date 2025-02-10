import os
import uuid
import shutil
import uvicorn
from typing import List
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from langchain_community.document_loaders.pdf import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai.embeddings import OpenAIEmbeddings
from langchain_community.vectorstores.faiss import FAISS
from langchain.memory import ConversationBufferMemory
from langchain_openai.chat_models import ChatOpenAI
from langchain.chains.conversational_retrieval.base import ConversationalRetrievalChain

load_dotenv()

app = FastAPI()

FILES_DIR = Path("files")
MODEL_NAME = "gpt-4o-mini"
chat_chain = None

if not FILES_DIR.exists():
    FILES_DIR.mkdir()

def process_documents():
    """Processa os PDFs e cria a cadeia de conversação"""
    global chat_chain
    documentos = []
    for arquivo in FILES_DIR.glob("*.pdf"):
        loader = PyPDFLoader(str(arquivo))
        documentos.extend(loader.load())
    
    splitter = RecursiveCharacterTextSplitter(chunk_size=2500, chunk_overlap=250)
    documentos = splitter.split_documents(documentos)
    
    embedding_model = OpenAIEmbeddings()
    vector_store = FAISS.from_documents(documents=documentos, embedding=embedding_model)
    
    chat = ChatOpenAI(model=MODEL_NAME)
    memory = ConversationBufferMemory(return_messages=True, memory_key="chat_history", output_key="answer")
    retriever = vector_store.as_retriever()
    
    chat_chain = ConversationalRetrievalChain.from_llm(llm=chat, memory=memory, retriever=retriever, return_source_documents=True, verbose=True)

@app.post("/upload")
async def upload_pdf(files: List[UploadFile] = File(...), background_tasks: BackgroundTasks = None):
    """Recebe PDFs e inicia o processamento"""
    for file in files:
        file_path = FILES_DIR / f"{uuid.uuid4()}_{file.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    background_tasks.add_task(process_documents)
    return {"message": "Arquivos enviados e processamento iniciado."}

@app.post("/chat")
async def chat(question: str):
    """Recebe uma pergunta e retorna a resposta do chatbot"""
    if not chat_chain:
        raise HTTPException(status_code=400, detail="O chatbot ainda não foi inicializado.")
    response = chat_chain.invoke({"question": question})
    return {"answer": response["answer"]}

@app.get("/status")
async def status():
    """Verifica se o chatbot está pronto"""
    return {"status": "ready" if chat_chain else "not_ready"}
