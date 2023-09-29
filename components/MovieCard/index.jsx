import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import apiConfig from "@/utils/api/apiConfig";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TrailModal from "../common/TrailerModal";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/features/cartSlice";

function MovieCard({ item }) {
  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const dispatch = useDispatch();

  const trailerCloseHandler = () => setTrailerOpen(false);

  return (
    <div>
      <Box
        className="hover:scale-105 hover:z-30 overflow-hidden duration-200 relative rounded-lg mb-4 "
        sx={{ pb: "148%" }}
      >
        <img
          src={bg}
          alt="poster"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </Box>
      <div className="flex-column ">
        <Button
          onClick={() => dispatch(addItem({ ...item, price: 100, amount:1 }))}
          startIcon={<AddCircleIcon />}
          className="mb-2"
          fullWidth
          variant="outlined"
          size="small"
        >
          add to cart
        </Button>
        <Button
          onClick={() => setTrailerOpen(true)}
          fullWidth
          variant="outlined"
          size="small"
        >
          watch trailer
        </Button>
      </div>

      <TrailModal
        item={item}
        open={trailerOpen}
        onClose={trailerCloseHandler}
      />
    </div>
  );
}

export default MovieCard;
