#!/bin/bash
set -e

echo "📦 Instalando dependências do Frontend..."
cd frontend
npm install
echo "✅ Frontend instalado"

echo "🔨 Construindo Frontend..."
npm run build
echo "✅ Frontend construído"

echo "🔄 Gerando Prisma Client..."
cd ../backend
npm run prisma:generate
echo "✅ Prisma Client gerado"

echo "✨ Build completo!"
