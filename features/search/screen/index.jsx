import { Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tmdbApi from "@/utils/api/tmdbAip";
import { MovieGridContainer } from "../components/MovieGridElements";
import MovieCard from "@/components/MovieCard";

const SearchScreen = () => {
  const [resultSearch, setResultSearch] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const getList = async () => {
      const params = {
        query: query.q,
      };
      const res = await tmdbApi.search("movie", { params });

      setResultSearch(
        res.results.filter((e) => {
          if (e.backdrop_path || e.poster_path) {
            return e;
          } else {
            return;
          }
        })
      );
      setTotalPage(res.total_pages);
    };

    getList();
  }, [query]);

  console.log(resultSearch);

  const loadMore = async () => {
    const params = {
      page: page + 1,
      query: keyword,
    };
    const response = await tmdbApi.search("movie", { params });
    setItems(
      [...items, ...response.results].filter((e) => {
        if (e.backdrop_path || e.poster_path) {
          return e;
        } else {
          return;
        }
      })
    );
    setPage(page + 1);
  };

  return (
    <div className="page__header bg-[#f5f5f5]">
      <Container maxWidth="xl">
        <div className="section mb-12">
          <MovieGridContainer>
            {resultSearch.map((item) => (
              <MovieCard item={item} key={item.id} />
            ))}
          </MovieGridContainer>

          {page < totalPage ? (
            <div className="">
              <Button onClick={loadMore} variant="outlined">
                Load More
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </div>
  );
};

export default SearchScreen;
