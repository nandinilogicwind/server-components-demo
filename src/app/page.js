import MovieList from "../components/movies/MovieList";

export default function Home() {
  return (
    <div style={{ padding: "12px" }}>
      <h1>Top Movies</h1>
      <MovieList skip={0} limit={4} showLoadMore={false} />
    </div>
  );
}
