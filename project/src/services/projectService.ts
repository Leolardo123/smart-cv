export type Project = { id:string; name:string; summary?:string; link?:string; tags?:string[] };
const KEY = 'projects_v1';
function read():Project[]{ try{ return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}} 
function write(items:Project[]){ localStorage.setItem(KEY, JSON.stringify(items)); }
function id(){ return Math.random().toString(36).slice(2,9); }
export function getAll(){ return read(); }
export function getById(i:string){ return read().find(x=>x.id===i); }
export function create(p:Omit<Project,'id'>){ const items = read(); const n={id:id(),...p}; items.push(n); write(items); return n }
export function update(i:string,patch:Partial<Project>){ const items=read(); const idx=items.findIndex(x=>x.id===i); if(idx===-1) return undefined; items[idx]={...items[idx],...patch}; write(items); return items[idx]; }
export function remove(i:string){ const items=read(); const f=items.filter(x=>x.id!==i); if(f.length===items.length) return false; write(f); return true }
