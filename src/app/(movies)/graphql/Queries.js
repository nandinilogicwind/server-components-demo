import { gql } from "@apollo/client";

export const LIST_MOVIES = gql`
  query movies($filter: MoviesFilter!, $sort: ListMoviesSort!) {
    movies(filter: $filter, sort: $sort) {
      count
      data {
        originalTitle
        releaseDate
        title
        id
      }
    }
  }
`;
