import React, { useState } from "react";
import Fetches from "./Fetches";
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [shows, setShows] = useState([]);
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const showsPerPage = 12;
  const navigate = useNavigate();

  const filteredShows = shows.filter((show) => {
    let matchesYear = true;
    let matchesGenre = true;

    if (year) {
      matchesYear = show.premiered.includes(year);
    }

    if (genre) {
      matchesGenre = show.genres.includes(genre);
    }

    if (search) {
      return show.name.toUpperCase().includes(search.toUpperCase());
    }

    return matchesYear && matchesGenre;
  });

  const totalPages = Math.ceil(filteredShows.length / showsPerPage);
  const currentShows = filteredShows.slice((currentPage - 1) * showsPerPage, currentPage * showsPerPage);

  return (
    <div className="home-container">
      <Fetches setShows={setShows} />

      <h1 className="home-title" style={{ textAlign: "center", color: "blue", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)", fontWeight: "bold" }}>MOVIEDB</h1>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />
        <select onChange={(e) => setYear(e.target.value)} value={year} className="filter-input">
          <option value="">Select Year</option>
          {Array.from({ length: 25 }, (_, i) => 2000 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select onChange={(e) => setGenre(e.target.value)} value={genre} className="filter-input">
          <option value="">Select Genre</option>
          {["Drama", "Comedy", "Action", "Thriller"].map((genre) => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="shows-grid">
        {currentShows.length > 0 ? (
          currentShows.map((show) => (
            <div key={show.id} className="show-card"    onClick={() => navigate('/desc', { state: { show } })}>
              <h3 className="show-title">{show.name}</h3>
              <p className="show-rating">Rating: {show.rating.average}</p>
              <img
                src={show.image.medium}
                alt={show.name}
                className="show-image"
              
              />
              <p className="show-year">Year: {show.premiered}</p>
              <p className="show-genres">Genres: <span>{show.genres.join(", ")}</span></p>
            </div>
          ))
        ) : (
          <p className="no-shows">No shows found</p>
        )}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;