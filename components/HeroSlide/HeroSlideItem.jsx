import { Container } from "@mui/material";
import React, { useState } from "react";
import apiConfig from "@/utils/api/apiConfig";
import styles from "./styles/heroSlide.module.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TrailModal from "../common/TrailerModal";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/features/cartSlice";

function HeroSlideItem({ item, active }) {
  const [trailerOpen, setTrailerOpen] = useState(false);

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const dispatch = useDispatch();

  const trailerCloseHandler = () => setTrailerOpen(false);
  return (
    <>
      <div
        className={` ${styles.heroItem} ${active && "active"}`}
        style={{ backgroundImage: `url(${background})` }}
      >
        <Container maxWidth="xl" className={styles.content}>
          <div className={styles.info}>
            <h2
              className={`${styles.title} lg:text-7xl md:text-6xl sm:text-4xl text-2xl`}
            >
              {item.title}
            </h2>
            <p className={`${styles.overview} font-bold`}>{item.overview}</p>

            <div className={`${styles.btns} flex gap-4`}>
              <Button
                onClick={() =>
                  dispatch(addItem({ ...item, price: 100, amount: 1 }))
                }
                style={{ backgroundColor: "#1976d2" }}
                startIcon={<AddCircleIcon />}
                variant="contained"
              >
                Add to Cart
              </Button>
              <Button
                onClick={() => setTrailerOpen(true)}
                style={{ backgroundColor: "#1976d2" }}
                variant="contained"
              >
                Watch trailer
              </Button>
            </div>
          </div>

          <div className=" flex flex-1 items-center justify-end ">
            <img
              className={`rounded-xl shadow  sm:hidden md:block`}
              src={apiConfig.w500Image(item.poster_path)}
              alt="poster"
            />
          </div>
        </Container>
      </div>
      <TrailModal
        item={item}
        open={trailerOpen}
        onClose={trailerCloseHandler}
      />
    </>
  );
}

export default HeroSlideItem;
