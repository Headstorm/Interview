FROM python:3.7-slim

WORKDIR /src

COPY . /src

RUN set -ex \
    && BUILD_DEPS=" \
    build-essential \
    libpcre3-dev \
    libpq-dev \
    " \
    && apt-get update && apt-get install -y --no-install-recommends $BUILD_DEPS \
    && pip install --no-cache-dir -r requirements.txt \
    \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false $BUILD_DEPS \
    && rm -rf /var/lib/apt/lists/*

#CMD ["python3", "./run.py"]
CMD ["flask", "run"]

