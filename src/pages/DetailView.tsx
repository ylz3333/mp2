import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchCharacter } from "../marvel/api";
import "./DetailView.css";

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

export default function DetailView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ load character data
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCharacter(id)
      .then(setCharacter)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="detail-status">Loading...</p>;
  if (!character) return <p className="detail-status">No character found.</p>;


  const ids = JSON.parse(sessionStorage.getItem("lastListIds") || "[]") as number[];
  const index = ids.findIndex((x) => x === Number(id));
  const prevId = index > 0 ? ids[index - 1] : null;
  const nextId = index < ids.length - 1 ? ids[index + 1] : null;

  return (
    <div className="detail-container">
      <h2 className="detail-name">{character.name}</h2>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="detail-img"
      />
      <p className="detail-desc">
        {character.description || "No description available."}
      </p>

      {}
      <div className="detail-nav">
        {prevId && (
          <button className="nav-button" onClick={() => navigate(`/character/${prevId}`)}>
            ← Previous
          </button>
        )}
        {nextId && (
          <button className="nav-button" onClick={() => navigate(`/character/${nextId}`)}>
            Next →
          </button>
        )}
      </div>

      <Link to="/gallery" className="back-link">
        ← Back to Gallery
      </Link>
    </div>
  );
}

