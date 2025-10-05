import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCharacters } from '../marvel/api';
import type { Character } from '../marvel/types';
import './ListView.css';

export default function ListView() {
  const [q, setQ] = useState('');
  const [raw, setRaw] = useState<Character[]>([]);
  const [sortKey, setSortKey] = useState<'name' | 'modified'>('name');
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchCharacters(q).then(setRaw).catch(console.error);
  }, [q]);

  const list = useMemo(() => {
    const arr = [...raw].sort((a, b) => {
      const va = (sortKey === 'name' ? a.name : a.modified).toLowerCase?.() ?? '';
      const vb = (sortKey === 'name' ? b.name : b.modified).toLowerCase?.() ?? '';
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return dir === 'asc' ? cmp : -cmp;
    });
    
    sessionStorage.setItem('lastListIds', JSON.stringify(arr.map(x => x.id)));
    return arr;
  }, [raw, sortKey, dir]);

  return (
    <div className="container">
      <h2>Marvel's First 50 characters</h2>

      <div className="toolbar">
        <input
          placeholder="Search characters…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <label>
          Sort:
          <select value={sortKey} onChange={(e) => setSortKey(e.target.value as any)}>
            <option value="name">Name</option>
            <option value="modified">Modified</option>
          </select>
        </label>
        <label>
          Order:
          <select value={dir} onChange={(e) => setDir(e.target.value as any)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </label>
      </div>

      <ul>
        {list.map((c) => (
          <li key={c.id}>
            <Link to={`/character/${c.id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
