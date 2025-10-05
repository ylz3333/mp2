// src/marvel/api.ts
import axios from 'axios';
import type { Character } from './types';
import md5 from 'md5';

const BASE_URL = 'https://gateway.marvel.com/v1/public';
const PUBLIC_KEY = 'ea3969594a92f1440bfdb8779690f695'
const PRIVATE_KEY = '25e97087c86fb9e2adbd08074c2849b5951be1f4';


function getAuthParams(): { ts: string; apikey: string; hash: string } {
  const ts = Date.now().toString();
  const hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY) as string; 
  return { ts, apikey: PUBLIC_KEY, hash };
}



export async function fetchCharacters(query: string): Promise<Character[]> {
  const auth = getAuthParams();
  const params: Record<string, string | number> = { ...auth, limit: 50 };
  if (query) params.nameStartsWith = query;

  const res = await axios.get(`${BASE_URL}/characters`, { params });
  return res.data.data.results as Character[];
}


export async function fetchCharacter(id: string) {
  const auth = getAuthParams();
  const res = await axios.get(`${BASE_URL}/characters/${id}`, { params: auth });
  const results = res.data?.data?.results;
  console.log("fetchCharacter result:", results);
  return results?.[0] || null;
}