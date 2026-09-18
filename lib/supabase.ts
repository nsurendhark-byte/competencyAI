import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://wldqqfhvjkqraxnajbaj.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_5zTNPaX2ejV1H0wF5vzr4Q_cJND2WZG';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export interface SupabaseUserCredentials {
  id?: string;
  email: string;
  password?: string;
  fullName?: string;
  role?: string;
  mobile?: string | null;
  lastLoginAt?: string;
}

/**
 * Syncs user credentials to Supabase Auth and database tables upon portal login or registration.
 */
export async function syncUserCredentialsToSupabase(credentials: SupabaseUserCredentials) {
  try {
    const { email, password, fullName, role, mobile } = credentials;

    if (!email) return { success: false, error: 'Email is required for Supabase sync' };

    const metadata = {
      fullName: fullName || 'User',
      role: role || 'LEARNER',
      mobile: mobile || null,
      lastLoginAt: new Date().toISOString(),
      sourcePortal: 'CompetencyAI Portal'
    };

    // 1. Sync credentials with Supabase Auth Engine
    if (password) {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      // If user already exists in Supabase auth, sign in or update user metadata
      if (signUpError) {
        if (signUpError.message.includes('already registered') || signUpError.status === 422 || signUpError.status === 400) {
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
          });
          if (signInData?.user) {
            await supabase.auth.updateUser({ data: metadata });
            return { success: true, user: signInData.user, action: 'signed_in' };
          }
        }
      } else if (signUpData?.user) {
        return { success: true, user: signUpData.user, action: 'registered' };
      }
    }

    // 2. Sync record to Supabase DB table if available
    try {
      await supabase.from('user_credentials').upsert(
        [
          {
            email: email.toLowerCase(),
            full_name: fullName || 'User',
            role: role || 'LEARNER',
            mobile: mobile || null,
            last_login_at: new Date().toISOString()
          }
        ],
        { onConflict: 'email' }
      );
    } catch (dbErr) {
      // Table creation might be pending; auth engine sync succeeded
      console.warn('[Supabase DB Sync Warning]', dbErr);
    }

    return { success: true, message: 'User credentials processed in Supabase' };

  } catch (err: any) {
    console.error('[Supabase Credentials Sync Error]:', err?.message || err);
    return { success: false, error: err?.message || 'Supabase connection error' };
  }
}

/**
 * Records portal login event into Supabase
 */
export async function recordUserLoginToSupabase(user: { id?: string; email: string; fullName?: string; role?: string; mobile?: string | null }) {
  return syncUserCredentialsToSupabase({
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    mobile: user.mobile,
    lastLoginAt: new Date().toISOString()
  });
}
