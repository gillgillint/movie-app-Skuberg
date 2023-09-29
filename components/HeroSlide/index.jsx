import tmdbApi, { movieType } from "@/utils/api/tmdbAip";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import HeroSlideItem from "./HeroSlideItem";

function HeroSlide() {
  const [movieItems, setMovieItems] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const params = { page: 1 };
      try {
        const res = await tmdbApi.getMoviesList(movieType.popular, { params });

        setMovieItems(res.results.slice(0, 4));
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovies();
  }, []);
  return (
    <div className="mb-12">
      <Swiper
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {movieItems.map((item) => (
          <SwiperSlide key={item.id}>
            {({ isActive }) => <HeroSlideItem item={item} active={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroSlide;
