import { config } from './config/index.js';
import { createApp } from './app.js';

async function main() {
  const app = createApp();
  app.listen(config.port, () => {
    console.log(`Japanese Analyzer API running on port ${config.port}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
