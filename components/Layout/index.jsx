import React, { useCallback, useEffect } from "react";
import Header from "./Header";
import { Box } from "@mui/material";
import { setItem } from "@/redux/features/cartSlice";
import { useDispatch } from "react-redux";

const LOCAL_STORAGE_KEY = "carts";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const loadSaveCarts = useCallback(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

    console.log(saved,'-=-=')
    if (saved) {
      dispatch(setItem(JSON?.parse(saved)));
    }
  }, [dispatch]);

  useEffect(() => {
    loadSaveCarts();
  }, [loadSaveCarts]);

  return (
    <Box sx={{ bgcolor: "background.default", color: "text.primary" }}>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
