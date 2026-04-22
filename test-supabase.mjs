import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function testList() {
    console.log("Testing list()...");
    const { data, error } = await supabase.storage.from('Jungle Studio').list('TROPICAL', { limit: 5 });
    if (error) {
        console.error("ERROR from supabase:", error);
    } else {
        console.log("SUCCESS, tracks found:", data.length);
        console.log(data);
    }
}

testList();
