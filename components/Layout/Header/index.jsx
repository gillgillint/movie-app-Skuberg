import React, { useEffect, useRef } from "react";
import {
  Badge,
  Container,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { toggleSearch, setSearchValue } from "@/redux/features/searchSlice";
import { useRouter } from "next/router";

const HeaderStyled = styled.header`
  height: 8rem;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  transition: height 0.3s ease, background-color 0.3s ease;

  &.shrink {
    height: 5rem;
  }
  .header__wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    @media screen and (max-width: 600px) {
      justify-content: center;
    }
  }
  .logo {
    font-size: 2.5rem;

    img {
      width: 150px;
      margin: -20px;

      @media screen and (max-width: 600px) {
        margin: 0;
      }
    }
  }

  .herder__nav {
    display: flex;
    align-items: center;

    @media screen and (max-width: 600px) {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 5rem;
      width: 100%;
      background-color: #f5f5f5;
      padding: 0 2rem;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`;

const Header = () => {
  const { isSearch, searchValue } = useSelector((state) => state.search);
  const { items } = useSelector((state) => state.carts);

  const headerRef = useRef(null);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current?.classList.add("shrink");
      } else {
        headerRef.current?.classList.remove("shrink");
      }
    };
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handlerBlurInput = (value) => {
    if (!value) {
      dispatch(toggleSearch());
    }
  };

  const handlerChangeInput = (value) => {
    dispatch(setSearchValue(value));

    if (value) {
      router.push(`/search?q=${value}`);
    } else {
      dispatch(toggleSearch());
      router.push("/");
    }
  };

  return (
    <HeaderStyled ref={headerRef}>
      <Container className="header__wrap ">
        <div className="logo">
          <Link href="/">
            <img src={"/img/logo.png"} alt="" />
          </Link>
        </div>

        <ul className="herder__nav gap-4">
          {!isSearch ? (
            <IconButton
              onClick={() => dispatch(toggleSearch())}
              size="large"
              aria-label="search"
            >
              <SearchIcon color="error" fontSize="inherit" />
            </IconButton>
          ) : (
            <TextField
              autoFocus={isSearch}
              onChange={(e) => handlerChangeInput(e.target.value)}
              onBlur={(e) => handlerBlurInput(e.target.value)}
              value={searchValue}
              size="small"
              className="custom_input"
              color="error"
              id="search_movie"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="medium" color="error" />
                  </InputAdornment>
                ),
              }}
            />
          )}
          <IconButton
            onClick={() => router.push("/checkout")}
            aria-label="cart"
          >
            <Badge badgeContent={items.length} color="primary">
              <ShoppingCartIcon color="error" />
            </Badge>
          </IconButton>
        </ul>
      </Container>
    </HeaderStyled>
  );
};

export default Header;
