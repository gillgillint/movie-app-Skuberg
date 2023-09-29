import apiConfig from "@/utils/api/apiConfig";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, clearItem } from "@/redux/features/cartSlice";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import PaymentModal from "../components/PaymentModal";

const CheckoutScreen = () => {
  const { items, totalAmount, totalPrice } = useSelector(
    (state) => state.carts
  );
  const [openPayment, setOpenPayment] = useState(false);

  const handleOpen = () => setOpenPayment(true);
  const handleClose = () => setOpenPayment(false);

  const dispatch = useDispatch();

  return (
    <div className="page__header bg-[#f5f5f5]">
      {items.length > 0 ? (
        <Container maxWidth="xl">
          <div className="section mb-12">
            <span className="font-bold  text-xl">Cart Items</span>

            <div className=" flex-col-reverse lg:flex-row flex justify-between gap-4 mt-9">
              <div className="flex-column">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    sx={{
                      display: "flex",
                      marginBottom: "20px",
                      width: "600px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 151 }}
                      image={apiConfig.w500Image(
                        item.poster_path || item.backdrop_path
                      )}
                      alt="Live from space album cover"
                    />

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                      }}
                    >
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          sx={{ fontFamily: "Montserrat" }}
                          component="div"
                          variant="h5"
                        >
                          {item.name || item.original_title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="body2"
                          sx={{ fontFamily: "Montserrat" }}
                        >
                          {item.overview}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pr: 2,
                          pb: 1,
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(
                              removeItem({ ...item, price: 100, amount: 1 })
                            )
                          }
                          aria-label="remove"
                        >
                          <RemoveCircleIcon />
                        </IconButton>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          component="div"
                          sx={{ fontFamily: "Montserrat" }}
                        >
                          {item.amount}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(
                              addItem({ ...item, price: 100, amount: 1 })
                            )
                          }
                          aria-label="add"
                        >
                          <AddCircleIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Card>
                ))}
              </div>
              <div>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent className="flex-col flex">
                    <div className="flex justify-between mb-3">
                      <Typography
                        sx={{ fontFamily: "Montserrat" }}
                        color="text.secondary"
                      >
                        Subtotal
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "Montserrat" }}
                        color="text.secondary"
                      >
                        $ {totalPrice}
                      </Typography>
                    </div>
                    <div className="flex justify-between mb-3">
                      <Typography
                        sx={{ fontFamily: "Montserrat" }}
                        color="text.secondary"
                      >
                        Discount
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "Montserrat" }}
                        color="text.secondary"
                      >
                        ${" "}
                        {totalAmount > 3
                          ? `${
                              (totalPrice * (totalAmount > 5 ? 20 : 10)) / 100
                            }`
                          : 0}
                      </Typography>
                    </div>
                    <Divider variant="middle" className="my-5" />

                    <div className="flex justify-between mb-3">
                      <Typography sx={{ fontFamily: "Poppins" }} variant="h6">
                        Total
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "Montserrat" }}
                        variant="h6"
                      >
                        ${" "}
                        {totalPrice -
                          `${
                            totalAmount > 3
                              ? `${
                                  (totalPrice * (totalAmount > 5 ? 20 : 10)) /
                                  100
                                }`
                              : 0
                          }`}
                      </Typography>
                    </div>
                  </CardContent>
                  <CardActions>
                    <Button
                      startIcon={<DeleteIcon />}
                      fullWidth
                      variant="outlined"
                      color="error"
                      onClick={() => dispatch(clearItem())}
                    >
                      Clear cart
                    </Button>
                    <Button
                      endIcon={<ShoppingCartCheckoutIcon />}
                      fullWidth
                      variant="outlined"
                      onClick={() => handleOpen()}
                    >
                      Checkout
                    </Button>
                  </CardActions>
                </Card>
                <Typography
                  variant="caption"
                  color="error"
                  display="block"
                  gutterBottom
                  sx={{ fontFamily: "Montserrat", marginTop: "10px" }}
                >
                  *When purchasing more than 3 items, get a 10% discount, more
                  than 5 items, get a 20% discount.
                </Typography>
              </div>
            </div>
          </div>
        </Container>
      ) : (
        <span className="font-bold text-lg">Cart is empty</span>
      )}
      <PaymentModal open={openPayment} onClose={handleClose}/>
    </div>
  );
};

export default CheckoutScreen;
