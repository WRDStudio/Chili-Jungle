/**
 * Supabase Storage — Chili Jungle asset helpers
 *
 * Bucket structure (create these in the Supabase dashboard):
 *
 *   audio  (public)
 *     └── playlists/
 *           ├── luxe/       ← ambient tracks for Luxe ritual
 *           ├── clasico/    ← tracks for Clásico ritual
 *           └── tropical/   ← tracks for Tropical ritual
 *
 *   images (public)
 *     ├── recipes/          ← recipe photography
 *     ├── brand/            ← logos, brand assets
 *     └── products/         ← product/bottle photography
 */

import { supabase } from './supabaseClient';

type AudioBucket = 'audio';
type ImageBucket = 'images';

type AudioPath =
  | `playlists/luxe/${string}`
  | `playlists/clasico/${string}`
  | `playlists/tropical/${string}`;

type ImagePath =
  | `recipes/${string}`
  | `brand/${string}`
  | `products/${string}`;

/**
 * Returns the public Supabase URL for an audio asset.
 * Usage: getAudioUrl('playlists/luxe/ambient-01.mp3')
 */
export function getAudioUrl(path: AudioPath): string {
  const { data } = supabase.storage.from('audio' as AudioBucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Returns the public Supabase URL for an image asset.
 * Usage: getImageUrl('recipes/tacos-cj.jpg')
 */
export function getImageUrl(path: ImagePath): string {
  const { data } = supabase.storage.from('images' as ImageBucket).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Returns all audio tracks for a given ritual playlist.
 * The files in Supabase must follow the naming convention: 01-title.mp3
 */
export async function getPlaylistTracks(
  ritual: 'luxe' | 'clasico' | 'tropical'
): Promise<{ name: string; url: string }[]> {
  const prefix = `playlists/${ritual}/`;
  const { data, error } = await supabase.storage.from('audio').list(prefix, {
    sortBy: { column: 'name', order: 'asc' },
  });

  if (error || !data) {
    console.error('[storage] Failed to list playlist tracks:', error?.message);
    return [];
  }

  return data
    .filter((file) => file.name.endsWith('.mp3') || file.name.endsWith('.wav'))
    .map((file) => ({
      name: file.name.replace(/^\d+-/, '').replace(/\.\w+$/, ''),
      url: getAudioUrl(`playlists/${ritual}/${file.name}` as AudioPath),
    }));
}
