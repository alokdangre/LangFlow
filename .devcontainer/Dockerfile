# Use official Dev Container base image
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install system tools
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
