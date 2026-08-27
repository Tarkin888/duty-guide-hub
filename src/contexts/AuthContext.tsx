import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import {
  hydrateProgressForUser,
  clearProgressSync,
  flushProgressNow,
  clearLegacyProgressStorage,
} from '@/lib/progressSync';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let hydratedUserId: string | null = null;

    // One-time cleanup of the pre-migration localStorage keys that are no
    // longer read anywhere in the app. Safe to run on every load.
    clearLegacyProgressStorage();

    // Module progress is account-level: load it when a user is present and
    // clear the in-memory copy on sign-out.
    const syncProgress = (nextSession: Session | null) => {
      const userId = nextSession?.user?.id ?? null;
      if (userId && userId !== hydratedUserId) {
        hydratedUserId = userId;
        void hydrateProgressForUser(userId);
      } else if (!userId && hydratedUserId) {
        hydratedUserId = null;
        clearProgressSync();
      }
    };

    // Set up auth state listener BEFORE checking for existing session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        syncProgress(session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      syncProgress(session);
    });

    const handleUnload = () => flushProgressNow();
    window.addEventListener('beforeunload', handleUnload);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
