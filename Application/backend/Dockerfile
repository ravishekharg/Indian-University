FROM python:3.12-slim AS base

# Create an unprivileged user instead of running as root
RUN useradd --create-home --uid 1000 appuser

WORKDIR /app

# Install dependencies first so this layer is cached independently of app code
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Now copy the application code (the .env file is excluded via .dockerignore
# and must never be baked into the image - it's injected at runtime instead)
COPY . .

USER appuser

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request,sys; sys.exit(0) if urllib.request.urlopen('http://127.0.0.1:5000/live').status==200 else sys.exit(1)"

CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]
