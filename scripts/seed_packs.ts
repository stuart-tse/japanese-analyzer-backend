import 'dotenv/config';
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { WordPack } from '../src/models/WordPack.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set');
    process.exit(1);
  }

  await mongoose.connect(uri);
  console.log('Connected to MongoDB');

  const packsData = JSON.parse(
    readFileSync(resolve(__dirname, '../data/n5_packs_seed.json'), 'utf-8')
  );

  // Clear existing packs and re-insert
  await WordPack.deleteMany({ jlptLevel: 'N5' });
  const result = await WordPack.insertMany(packsData);
  console.log(`Seeded ${result.length} N5 word packs (${packsData.reduce((s: number, p: { words: string[] }) => s + p.words.length, 0)} words)`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
