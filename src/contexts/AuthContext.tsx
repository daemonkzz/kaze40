import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
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

interface AuthProviderProps {
  children: ReactNode;
}

// Helper function to clean URL hash
const cleanUrlHash = () => {
  if (window.location.hash && window.location.hash.includes('access_token')) {
    const cleanUrl = window.location.pathname + window.location.search;
    window.history.replaceState(null, '', cleanUrl);
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // NOT: OAuth dönüşlerinde bazı akışlarda token URL hash içinde gelir.
    // Supabase bunu okuyup oturumu kurmadan önce hash'i temizlemek oturumun hiç oluşmamasına yol açabilir.
    // Bu yüzden URL temizliğini yalnızca session oluştuğunda (aşağıda) yapıyoruz.

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event);
        
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);

        // Log user info on sign in
        if (event === 'SIGNED_IN' && session?.user) {
          console.log('Oturum Açıldı:', session.user.email);
          // Clean URL hash after OAuth redirect
          cleanUrlHash();
        }

        if (event === 'SIGNED_OUT') {
          console.log('Oturum Kapatıldı');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (session?.user) {
        console.log('Mevcut Oturum:', session.user.email);
        // Clean URL hash if session exists
        cleanUrlHash();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
