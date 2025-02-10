# ProtoScan - AI-Assisted Oncology Treatment

ProtoScan é uma aplicação que utiliza uma solução de Inteligência Artificial baseada em **RAG (Retrieval-Augmented Generation)** para auxiliar médicos no tratamento de pacientes oncológicos. Através de uma análise avançada de documentos clínicos, como protocolos e históricos de tratamento, o sistema oferece recomendações personalizadas, otimizando os cuidados e melhorando a qualidade de vida dos pacientes.

## Funcionalidade do Sistema

1. **Upload de Documentos**  
   Os médicos podem enviar documentos PDF relacionados a tratamentos e protocolos oncológicos.

2. **Processamento e Análise de Dados**  
   O sistema processa os documentos enviados, extrai informações relevantes, e utiliza um modelo de **Embeddings** e **FAISS** para construir um banco de dados de informações.

3. **Interação com o Chatbot**  
   O médico pode interagir com um chatbot que, baseado nos dados processados, oferece recomendações de tratamentos, levando em conta o histórico de decisões clínicas.

4. **Processamento de Perguntas**  
   Quando uma pergunta é enviada ao sistema, ele analisa os documentos para fornecer uma resposta baseada em dados históricos.

## 🛠 Como Funciona?

O código é construído com **FastAPI** para expor endpoints RESTful e utiliza bibliotecas de **Langchain** para o processamento de linguagem natural. Abaixo, estão descritos os principais componentes do sistema:

### Processamento de Documentos

- **PyPDFLoader**: Utilizado para carregar e ler arquivos PDF.
- **RecursiveCharacterTextSplitter**: Divide o conteúdo dos documentos em partes menores para otimizar o processamento e análise.
- **OpenAIEmbeddings**: Utilizado para gerar embeddings dos documentos.
- **FAISS**: Armazena e consulta documentos embutidos, permitindo buscas rápidas e eficientes.
- **ChatOpenAI**: Utiliza o modelo GPT-4 (ou mini) para gerar respostas a partir dos dados carregados.
- **ConversationalRetrievalChain**: Encapsula a lógica de recuperação de informações de forma conversacional.

### Endpoints

- **POST /upload**: Envia arquivos PDF para processamento.
- **POST /chat**: Envia uma pergunta para o chatbot e retorna uma resposta baseada nos documentos carregados.
- **GET /status**: Verifica se o sistema está pronto para interagir.

## 🌟 Benefícios

- **Decisões mais precisas** baseadas em histórico clínico real.
- **Menos toxicidade nos tratamentos**, ajustando terapias ao perfil do paciente.
- **Agilidade** na consulta a protocolos, reduzindo a necessidade de buscas manuais.
- **Melhoria na qualidade de vida** dos pacientes mais vulneráveis.

## 🏃‍♂️ Como Executar o Projeto

### Pré-requisitos

- Python 3.8+
- Dependências listadas em `requirements.txt`

### Passos para Execução

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/Victor-Amarante/ProtoScan-AI-RAG.git
   cd ProtoScan-AI-RAG
   ```

2. **Instalar as Dependências**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # Para sistemas Linux/Mac
    venv\Scripts\activate     # Para Windows
    ```
    ```bash
    pip install -r requirements.txt
    ```

3. **Criar o arquivo .env**: O arquivo .env deve conter variáveis de ambiente necessárias, como suas credenciais da OpenAI (se necessário).

4. **Execute o Servidor**: Para rodar o servidor localmente, use o Uvicorn
    ```bash
    pip install -r requirements.txt
    ```

5. **Acesse a API**: O servidor estará rodando em http://localhost:8000
Você pode testar os endpoints diretamente, usando ferramentas como Postman ou cURL.


## Dependências

- **fastapi**: Framework para construir APIs rápidas.
- **uvicorn**: Servidor ASGI para rodar o FastAPI.
- **langchain**: Framework para construir aplicações de NLP (Natural Language Processing).
- **openai**: SDK da OpenAI para integração com os modelos GPT-3 e GPT-4.
- **faiss**: Biblioteca para pesquisa e indexação eficiente de vetores.
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env`.
- **pypdf2**, **shutil**, **uuid**: Utilizados para manipulação de arquivos e diretórios.
