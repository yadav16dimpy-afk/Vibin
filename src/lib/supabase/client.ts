import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-supabase-url')
);

// Frontend safe client (anon key only, respects RLS)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Storage Helper for Private Room Images:
 * Uploads to Supabase Storage private bucket 'room-images'.
 * When real Supabase isn't configured, falls back gracefully to local object URL or mock CDN.
 */
export async function uploadRoomImage(
  file: File,
  userId: string,
  projectId: string
): Promise<{ path: string; publicUrl?: string; signedUrl?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    // Graceful mock fallback for local development & demonstration
    const mockPath = `private/${userId}/${projectId}/${Date.now()}_${file.name}`;
    const objectUrl = URL.createObjectURL(file);
    return { path: mockPath, signedUrl: objectUrl };
  }

  const fileExt = file.name.split('.').pop() || 'jpg';
  const filePath = `private/${userId}/${projectId}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('room-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  // Create a time-limited signed URL for private viewing
  const { data: signedData, error: signedError } = await supabase.storage
    .from('room-images')
    .createSignedUrl(filePath, 60 * 60); // 1 hour

  if (signedError) {
    throw signedError;
  }

  return { path: filePath, signedUrl: signedData.signedUrl };
}
