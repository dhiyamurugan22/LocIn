import { supabase, isSupabaseConfigured } from './supabase';

const LOCAL_STORAGE_KEYS = {
  USER: 'locin_user',
  AUTH_TOKEN: 'locin_auth_token',
  NOTES: 'locin_student_notes',
  ONBOARDING: 'locin_onboarding_status',
  APP_TEMPLATE: 'locin_app_template',
  TARGET_LANG: 'locin_target_lang',
  PROGRESS: 'locin_user_progress'
};

/**
 * Unified Cloud Database & Fallback Storage Gateway for LocIn
 */
export const dbService = {
  isCloudActive() {
    return isSupabaseConfigured;
  },

  // ---------------------------------------------------------------------------
  // AUTHENTICATION
  // ---------------------------------------------------------------------------
  async signUp({ email, password, name }) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name || 'Student User' }
        }
      });
      if (error) throw error;
      
      const user = data.user;
      if (user) {
        // Create matching database profile record
        const profile = {
          id: user.id,
          name: name || user.email.split('@')[0],
          email: user.email,
          streak: 1,
          xp: 100,
          app_template: 'midnight',
          target_lang: 'es',
          onboarding_status: 'pending'
        };
        await this.updateProfile(profile);
        return { ...profile, token: data.session?.access_token || 'supabase-token' };
      }
    }

    // Local Storage Fallback
    const mockUser = {
      id: 'local-' + Date.now(),
      name: name || email.split('@')[0] || 'Student User',
      email: email || 'student@locin.edu',
      token: 'local-jwt-token-' + Date.now(),
      streak: 7,
      xp: 1450,
      app_template: 'midnight',
      target_lang: 'es',
      onboarding_status: 'passed'
    };
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(mockUser));
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, mockUser.token);
    return mockUser;
  },

  async login({ email, password }) {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;

      const user = data.user;
      const profile = await this.getProfile(user.id);
      const fullUser = {
        ...profile,
        id: user.id,
        email: user.email,
        token: data.session?.access_token
      };
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(fullUser));
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, data.session?.access_token || '');
      return fullUser;
    }

    // Local Storage Fallback
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    if (stored) {
      return JSON.parse(stored);
    }
    const mockUser = {
      id: 'local-student-1',
      name: email ? email.split('@')[0] : 'Student User',
      email: email || 'student@locin.edu',
      token: 'mock-jwt-token-12345',
      streak: 7,
      xp: 1450,
      app_template: 'midnight',
      target_lang: 'es',
      onboarding_status: 'passed'
    };
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(mockUser));
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, mockUser.token);
    return mockUser;
  },

  async logout() {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase logout warning:', err.message);
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ONBOARDING);
  },

  // ---------------------------------------------------------------------------
  // PROFILE & USER STATS
  // ---------------------------------------------------------------------------
  async getProfile(userId) {
    if (isSupabaseConfigured && supabase && userId && !userId.startsWith('local-')) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (!error && data) {
        return data;
      }
    }

    // Local Fallback
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
    if (storedUser) {
      return JSON.parse(storedUser);
    }
    return {
      id: userId || 'local-student-1',
      name: 'Student User',
      email: 'student@locin.edu',
      streak: 7,
      xp: 1450,
      app_template: localStorage.getItem(LOCAL_STORAGE_KEYS.APP_TEMPLATE) || 'midnight',
      target_lang: localStorage.getItem(LOCAL_STORAGE_KEYS.TARGET_LANG) || 'es',
      onboarding_status: localStorage.getItem(LOCAL_STORAGE_KEYS.ONBOARDING) || 'passed'
    };
  },

  async updateProfile(profileData) {
    const userId = profileData.id;

    if (isSupabaseConfigured && supabase && userId && !userId.startsWith('local-')) {
      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          name: profileData.name,
          email: profileData.email,
          streak: profileData.streak ?? 1,
          xp: profileData.xp ?? 100,
          target_lang: profileData.target_lang ?? 'es',
          app_template: profileData.app_template ?? 'midnight',
          onboarding_status: profileData.onboarding_status ?? 'passed',
          updated_at: new Date().toISOString()
        })
        .select()
        .single();
      if (!error && data) {
        // Keep local cache synced
        const cached = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || '{}');
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify({ ...cached, ...data }));
        return data;
      }
    }

    // Local Fallback Sync
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.USER) || '{}');
    const updated = { ...existing, ...profileData };
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(updated));
    if (profileData.app_template) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.APP_TEMPLATE, profileData.app_template);
    }
    if (profileData.target_lang) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TARGET_LANG, profileData.target_lang);
    }
    if (profileData.onboarding_status) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.ONBOARDING, profileData.onboarding_status);
    }
    return updated;
  },

  async addXP(amount) {
    const currentProfile = await this.getProfile();
    const updatedXP = (currentProfile.xp || 0) + amount;
    return await this.updateProfile({ ...currentProfile, xp: updatedXP });
  },

  // ---------------------------------------------------------------------------
  // NOTES CRUD
  // ---------------------------------------------------------------------------
  async getNotes(userId) {
    if (isSupabaseConfigured && supabase && userId && !userId.startsWith('local-')) {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (!error && data) {
        return data;
      }
    }

    // Local Fallback
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.NOTES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  },

  async saveNotes(notes, userId) {
    if (isSupabaseConfigured && supabase && userId && !userId.startsWith('local-')) {
      const notesToUpsert = notes.map(note => ({
        id: note.id || crypto.randomUUID(),
        user_id: userId,
        title: note.title || '',
        content: note.content || '',
        tags: note.tags || [],
        pinned: Boolean(note.pinned),
        color: note.color || 'dark',
        updated_at: new Date().toISOString()
      }));

      const { data, error } = await supabase
        .from('notes')
        .upsert(notesToUpsert);

      if (!error) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.NOTES, JSON.stringify(notes));
        return data;
      }
    }

    // Local Fallback
    localStorage.setItem(LOCAL_STORAGE_KEYS.NOTES, JSON.stringify(notes));
    return notes;
  },

  async deleteNote(noteId, userId) {
    if (isSupabaseConfigured && supabase && userId && !userId.startsWith('local-')) {
      await supabase.from('notes').delete().eq('id', noteId);
    }
    const currentNotes = await this.getNotes(userId);
    const filtered = currentNotes.filter(n => n.id !== noteId);
    localStorage.setItem(LOCAL_STORAGE_KEYS.NOTES, JSON.stringify(filtered));
    return filtered;
  }
};
