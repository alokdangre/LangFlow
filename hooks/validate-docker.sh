#!/bin/bash

# Docker validation script - checks Dockerfile without building
set -e

echo "🔍 Validating Docker setup..."

# Check if required files exist
echo "📋 Checking required files..."
required_files=("package.json" "tsconfig.json" "src/index.ts" "prisma/schema.prisma" "Dockerfile")

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file exists"
    else
        echo "  ❌ $file missing"
        exit 1
    fi
done

# Check package.json scripts
echo "📦 Checking package.json scripts..."
if grep -q '"start".*"node dist/index.js"' package.json; then
    echo "  ✅ start script correct"
else
    echo "  ❌ start script incorrect or missing"
    exit 1
fi

if grep -q '"build".*"tsc"' package.json; then
    echo "  ✅ build script correct"
else
    echo "  ❌ build script incorrect or missing"
    exit 1
fi

# Check TypeScript config
echo "🔧 Checking TypeScript configuration..."
if grep -q '"outDir".*"./dist"' tsconfig.json; then
    echo "  ✅ TypeScript outDir configured"
else
    echo "  ❌ TypeScript outDir not configured correctly"
    exit 1
fi

# Check Dockerfile syntax
echo "🐳 Validating Dockerfile syntax..."
if command -v docker &> /dev/null; then
    # Use docker to validate syntax without building
    if docker build --dry-run . > /dev/null 2>&1; then
        echo "  ✅ Dockerfile syntax valid"
    else
        echo "  ❌ Dockerfile syntax invalid"
        exit 1
    fi
else
    echo "  ⚠️  Docker not installed, skipping syntax check"
fi

# Check for common issues
echo "🔍 Checking for common issues..."

# Check if src directory has TypeScript files
if [ -d "src" ] && [ "$(find src -name '*.ts' | wc -l)" -gt 0 ]; then
    echo "  ✅ TypeScript source files found"
else
    echo "  ❌ No TypeScript source files found in src/"
    exit 1
fi

# Check if prisma schema exists
if [ -f "prisma/schema.prisma" ]; then
    echo "  ✅ Prisma schema found"
else
    echo "  ❌ Prisma schema missing"
    exit 1
fi

# Check .dockerignore
if [ -f ".dockerignore" ]; then
    echo "  ✅ .dockerignore exists"
    if grep -q "node_modules" .dockerignore; then
        echo "  ✅ .dockerignore excludes node_modules"
    else
        echo "  ⚠️  .dockerignore should exclude node_modules"
    fi
else
    echo "  ⚠️  .dockerignore missing (recommended)"
fi

echo ""
echo "✅ Docker setup validation completed successfully!"
echo ""
echo "🚀 Ready to build with:"
echo "   docker build -t langflow-hooks ."
echo ""
echo "🧪 Or test with docker-compose:"
echo "   docker-compose up --build"
