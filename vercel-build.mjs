import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  console.log('� Gerando Prisma Client...');
  execSync('npm run prisma:generate', { 
    cwd: join(__dirname, 'backend'), 
    stdio: 'inherit' 
  });

  console.log('📦 Instalando dependências do frontend...');
  execSync('npm install', { 
    cwd: join(__dirname, 'frontend'), 
    stdio: 'inherit' 
  });

  console.log('🔨 Construindo frontend...');
  execSync('npm run build', { 
    cwd: join(__dirname, 'frontend'), 
    stdio: 'inherit' 
  });

  console.log('✅ Build concluído com sucesso!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build falhou:', error.message);
  process.exit(1);
}
