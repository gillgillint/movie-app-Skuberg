import { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import apiConfig from '@/utils/api/apiConfig';
import tmdbApi from '@/utils/api/tmdbAip';
import { MovieListStyled } from './MovieListElement';
import MovieCard from '../MovieCard';

function MovieList({ category, type, id }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let res;
      const params = {};

      if (type !== 'similar') {
        switch (category) {
          case 'movie':
            res = await tmdbApi.getMoviesList(type, { params });
            break;
          default:
            res = await tmdbApi.getTvList(type, { params });
        }
      } else {
        res = await tmdbApi.similar(category, id);
      }

      setItems(
        res.results.filter((e) => {
          if (e.backdrop_path || e.poster_path) {
            return e;
          } else {
            return;
          }
        })
      );
    };
    getList();
  }, []);


  return (
    <MovieListStyled>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item) => (
          <SwiperSlide className='py-4' key={item.id}>
            <MovieCard item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </MovieListStyled>
  );
}

export default MovieList;
