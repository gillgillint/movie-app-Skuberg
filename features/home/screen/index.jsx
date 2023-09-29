import React from "react";
import HeroSlide from "@/components/HeroSlide";
import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";
import MovieList from "@/components/MovieList";
import { category, movieType } from "@/utils/api/tmdbAip";

const Home = () => {
  return (
    <div>
      <HeroSlide />
      <Container maxWidth="xl">
        <div className="section mb-12">
          <div className="section__header">
            <Typography component="h2">Trending Movies</Typography>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
          <div className="section__header ">
            <Typography component="h2">Top Rated Movies</Typography>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>
      </Container>
    </div>
  );
};

export default Home;
