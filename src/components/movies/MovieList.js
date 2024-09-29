"use client";

import { useLazyQuery } from "@apollo/client";
import { Button, Card, Col, Empty, Image, Row, Spin } from "antd";
import Link from "next/link";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { LIST_MOVIES } from "../../app/(movies)/graphql/Queries";
import { isEmpty, uniq } from "lodash";
import { useRouter } from "next/navigation";
import { AppContext } from "../../../AppContext";

function MovieList({ skip = 0, limit = 10, showLoadMore = true }) {
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const { getCurrentUser } = useContext(AppContext);
  const user = getCurrentUser();
  const router = useRouter();

  const [fetchMovies, { loading }] = useLazyQuery(LIST_MOVIES, {
    variables: {
      filter: { skip: skip, limit: limit },
      sort: {
        field: "createdAt",
        order: "DESC",
      },
    },
    fetchPolicy: "network-only",
    onCompleted: (res) => {
      setMovies(uniq([...movies, ...res?.movies?.data]));
      if (res?.movies?.data?.length < 10) {
        setHasMore(false);
      }
      setMoviesLoading(false);
    },
    onError: () => {
      setMoviesLoading(false);
    },
  });

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFetchMore = () => {
    if (user && !isEmpty(user)) {
      fetchMovies({
        variables: {
          filter: { skip: movies?.length, limit: 10 },
          sort: {
            field: "createdAt",
            order: "DESC",
          },
        },
      });
    } else {
      router?.push("/login");
    }
  };

  return (
    <div style={{ marginTop: "16px", marginBottom: "32px" }}>
      {!moviesLoading && movies?.length === 0 && <Empty />}
      {!moviesLoading ? (
        <div className="card-body-wrapper">
          <Row gutter={[16, 16]}>
            {movies?.map((movie) => (
              <Col key={movie?.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                <Link href={`/movies/${movie?.title}/${movie?.id}`} prefetch>
                  <Card
                    cover={
                      <Image
                        alt="example"
                        src="/images/imagePlaceholder.png"
                        className="movie-poster"
                        placeholder="blur"
                        preview={false}
                      />
                    }
                    className="movie-tile pointer full-width"
                  >
                    <h3>{movie?.title}</h3>
                  </Card>
                </Link>
              </Col>
            ))}
            {hasMore &&
              !moviesLoading &&
              movies?.length > 0 &&
              showLoadMore && (
                <Col
                  span={24}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button onClick={handleFetchMore}>Load More</Button>
                </Col>
              )}
          </Row>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin />
        </div>
      )}
      {!moviesLoading && loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spin />
        </div>
      )}
    </div>
  );
}

export default MovieList;
