import { ExpandMore } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  maxWidth: 345,
};

const PaymentModal = ({ open, onClose }) => {
  const [count, setCount] = useState(60);
  const [resetCount, setResetCount] = useState(true);

  const handleModalClose = useCallback(() => {
    setResetCount(true);
    onClose();
  }, [onClose]);


  useEffect(() => {
    if (resetCount) {
      setCount(60);
      setResetCount(false);
    }

    if (count <= 0) {
      handleModalClose();
    }

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [count, onClose, handleModalClose, resetCount]);

 
  return (
    <div>
      <Modal
        open={open}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <span className="absolute right-4 top-5 text-lg font-bold">
            {count}
          </span>
          <CardHeader
            sx={{
              ontFamily: "Montserrat",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            title="Payment account"
            subheader="Account name Test co. ltd"
          />
          <CardContent>
            <div className="flex items-center gap-5 mb-3">
              <MonetizationOnIcon
                className="mr-3"
                fontSize="large"
                color="success"
              />
              <Typography
                sx={{ fontFamily: "Montserrat" }}
                color="text.secondary"
              >
                123-4-56789-0
              </Typography>
            </div>
            <div className="flex items-center gap-5 mb-3">
              <SavingsIcon
                className="mr-3"
                fontSize="large"
                color="secondary"
              />
              <Typography
                sx={{ fontFamily: "Montserrat" }}
                color="text.secondary"
              >
                123-4-56789-0
              </Typography>
            </div>
            <div className="flex items-center gap-5 mb-3">
              <AccountBalanceWalletIcon
                className="mr-3"
                fontSize="large"
                color="warning"
              />
              <Typography
                sx={{ fontFamily: "Montserrat" }}
                color="text.secondary"
              >
                123-4-56789-0
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
};

export default PaymentModal;
