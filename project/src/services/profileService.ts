export type Profile = {
  id: string;
  name: string;
  title?: string;
  email?: string;
  notes?: string;
};

const STORAGE_KEY = "profiles_v1";
const ACTIVE_KEY = "active_profile_v1";

function readStorage(): Profile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Profile[];
  } catch (e) {
    return [];
  }
}

function writeStorage(items: Profile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function generateId() {
  return Math.random().toString(36).slice(2, 9);
}

export function getAll(): Profile[] {
  return readStorage();
}

export function getById(id: string): Profile | undefined {
  return readStorage().find((p) => p.id === id);
}

export function create(profile: Omit<Profile, "id">): Profile {
  const items = readStorage();
  const newItem: Profile = { id: generateId(), ...profile };
  items.push(newItem);
  writeStorage(items);
  return newItem;
}

export function update(id: string, patch: Partial<Profile>): Profile | undefined {
  const items = readStorage();
  const idx = items.findIndex((p) => p.id === id);
  if (idx === -1) return undefined;
  items[idx] = { ...items[idx], ...patch };
  writeStorage(items);
  return items[idx];
}

export function remove(id: string): boolean {
  const items = readStorage();
  const filtered = items.filter((p) => p.id !== id);
  if (filtered.length === items.length) return false;
  writeStorage(filtered);
  // if removed profile was active, clear active
  const active = getActiveProfileId();
  if (active === id) {
    localStorage.removeItem(ACTIVE_KEY);
    try {
      window.dispatchEvent(new Event("activeProfileChange"));
    } catch (e) {}
  }
  return true;
}

export function setActiveProfileId(id: string | null) {
  if (id) localStorage.setItem(ACTIVE_KEY, id);
  else localStorage.removeItem(ACTIVE_KEY);
  try {
    window.dispatchEvent(new Event("activeProfileChange"));
  } catch (e) {}
}

export function getActiveProfileId(): string | null {
  return localStorage.getItem(ACTIVE_KEY);
}

export function getActiveProfile(): Profile | undefined {
  const id = getActiveProfileId();
  if (!id) return undefined;
  return getById(id);
}
