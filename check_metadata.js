import { createClient } from '@supabase/supabase-js';
import * as mm from 'music-metadata';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://xnmmnvxmnydtoksmuttu.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhubW1udnhtbnlkdG9rc211dHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2MDA3NzAsImV4cCI6MjA5MDE3Njc3MH0.-kel8Wr-F_mg5_3EnV3DENWYCVsIZ6qF6eX9gQBa_qM';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  console.log("Fetching files from bucket...");
  const folders = ['LUXE', 'CLASSIC', 'TROPICAL'];

  for (const folder of folders) {
      const { data, error } = await supabase.storage.from('Jungle Studio').list(folder, { limit: 5 });
      
      if (error) {
        console.error(`Error listing files in ${folder}:`, error);
        continue;
      }
      
      const audioFiles = data.filter(f => f.name.endsWith('.m4a') || f.name.endsWith('.mp3'));
      console.log(`Found ${audioFiles.length} audio files in ${folder}.`);
      
      for (const file of audioFiles) {
         const url = supabase.storage.from('Jungle Studio').getPublicUrl(`${folder}/${file.name}`).data.publicUrl;
         try {
           const res = await fetch(url);
           const buffer = Buffer.from(await res.arrayBuffer());
           const metadata = await mm.parseBuffer(buffer);
           console.log(`[${file.name}] -> Pictures: ${metadata.common.picture?.length || 0}`);
         } catch(e) {
           console.log(`[${file.name}] -> Error parsing: ${e.message}`);
         }
      }
  }

}

run();
