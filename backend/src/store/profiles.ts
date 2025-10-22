type Profile = { name: string; email: string };

const store = new Map<string, Profile>();

// seed a demo user
store.set('demo@example.com', { name: 'Demo User', email: 'demo@example.com' });

export default {
  get: (email: string) => store.get(email),
  update: (email: string, data: Partial<Profile>) => {
    const existing = store.get(email);
    if (!existing) return null;
    const updated = { ...existing, ...data };
    store.set(email, updated);
    return updated;
  },
  create: (profile: Profile) => {
    store.set(profile.email, profile);
    return profile;
  },
  updateWithEmailChange: (currentEmail: string, data: Partial<Profile>) => {
    const existing = store.get(currentEmail);
    if (!existing) return null;
    const updated = { ...existing, ...data } as Profile;
    if (data.email && data.email !== currentEmail) {
      store.delete(currentEmail);
    }
    store.set(updated.email, updated);
    return updated;
  }
};