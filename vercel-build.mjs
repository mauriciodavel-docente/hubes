import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

try {
  console.log('📦 Installing frontend dependencies...');
  execSync('npm install --legacy-peer-deps', { cwd: join(__dirname, 'frontend'), stdio: 'inherit' });

  console.log('🔨 Building frontend...');
  execSync('npm run build', { cwd: join(__dirname, 'frontend'), stdio: 'inherit' });

  console.log('✅ Build complete!');
  process.exit(0);
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
