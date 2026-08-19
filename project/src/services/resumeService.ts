export type Resume = {
  id: string;
  name: string;
  sections: string[]; // ordered list of section keys
};

const KEY = "resumes_v1";

function read(): Resume[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: Resume[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

function id() {
  return Math.random().toString(36).slice(2, 9);
}

export function getAll(): Resume[] {
  return read();
}

export function getById(i: string): Resume | undefined {
  return read().find((r) => r.id === i);
}

export function create(r: Omit<Resume, "id">): Resume {
  const items = read();
  const n: Resume = { id: id(), ...r };
  items.push(n);
  write(items);
  return n;
}

export function update(i: string, patch: Partial<Resume>): Resume | undefined {
  const items = read();
  const idx = items.findIndex((r) => r.id === i);
  if (idx === -1) return undefined;
  items[idx] = { ...items[idx], ...patch };
  write(items);
  return items[idx];
}

export function remove(i: string): boolean {
  const items = read();
  const filtered = items.filter((r) => r.id !== i);
  if (filtered.length === items.length) return false;
  write(filtered);
  return true;
}
