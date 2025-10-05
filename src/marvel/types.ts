// src/marvel/types.ts
export interface Thumbnail {
    path: string;
    extension: string;
  }
  
  export interface Character {
    id: number;
    name: string;
    description: string;
    modified: string;
    thumbnail: Thumbnail;
  }
  