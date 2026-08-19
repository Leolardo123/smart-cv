export type Skill = { id:string; name:string; level?:string; years?:number };
const KEY='skills_v1';
function read():Skill[]{ try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}} 
function write(items:Skill[]){ localStorage.setItem(KEY,JSON.stringify(items)) }
function id(){ return Math.random().toString(36).slice(2,9) }
export function getAll(){ return read() }
export function getById(i:string){ return read().find(x=>x.id===i) }
export function create(s:Omit<Skill,'id'>){ const items=read(); const n={id:id(),...s}; items.push(n); write(items); return n }
export function update(i:string,patch:Partial<Skill>){ const items=read(); const idx=items.findIndex(x=>x.id===i); if(idx===-1) return undefined; items[idx]={...items[idx],...patch}; write(items); return items[idx] }
export function remove(i:string){ const items=read(); const f=items.filter(x=>x.id!==i); if(f.length===items.length) return false; write(f); return true }
