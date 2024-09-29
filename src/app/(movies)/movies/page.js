import MovieList from "../../../components/movies/MovieList";

function Movies() {
  return (
    <div style={{ padding: "14px" }}>
      <div
        style={{
          position: "sticky",
          height: "60px",
          top: "0",
          background: "black",
          zIndex: "999",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>Movies</h1>
      </div>
      <div>
        <MovieList />
      </div>
    </div>
  );
}

export default Movies;
