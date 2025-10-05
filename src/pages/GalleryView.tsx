import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCharacters } from "../marvel/api";
import "./GalleryView.css";

interface Thumbnail {
  path: string;
  extension: string;
}

interface Character {
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
}

export default function GalleryView() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCharacters("").then(setCharacters).catch(console.error);
  }, []);

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Marvel Gallery</h2>

      <input
        className="gallery-filter"
        type="text"
        placeholder="Filter by name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div className="gallery-grid">
        {filtered.map((char) => (
          <div
            key={char.id}
            className="gallery-card"
            onClick={() => navigate(`/character/${char.id}`)}
          >
            <img
              src={`${char.thumbnail.path}.${char.thumbnail.extension}`}
              alt={char.name}
              className="gallery-img"
            />
            <p className="gallery-name">{char.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
