import React, { useState, useContext } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import referral from "../assets/referral-logo.png";
import { AppContext } from "../utils/utils";
import { ToastNotify } from "../utils/ToastNotify";

function ReferralInfo({ ReferralTotalBonus, ReferralWithdrawn, totalUser }) {
  const matches = useMediaQuery("(max-width:700px)");
  const { account } = useContext(AppContext);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  return (
    <Box
      py={{ xs: 3, sm: 5 }}
      px={{ xs: 2, sm: 4 }}
      border="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="6px"
    >
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <Box display="flex" alignItems="center">
        <img
          src={referral}
          width={matches ? "50px" : "60px"}
          height={matches ? "20px" : "24px"}
          alt=""
        />
        <Box fontSize={{ xs: "18px", sm: "24px" }} fontWeight={600} ml={2}>
          Referral Information
        </Box>
      </Box>

      <Box
        fontSize={{ xs: "14px", sm: "18px" }}
        fontWeight={600}
        letterSpacing="1%"
        mt={5}
      >
        Your Referral Link:
      </Box>
      <Box
        bgcolor="#fff"
        borderRadius="6px"
        my={1}
        height="50px"
        display="flex"
        justifyContent="space-between"
      >
        <input
          placeholder="https://dribbble.com/shots/17475079-Crypt..."
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            height: "50px",
            padding: "0px 20px",
            color: "#000",
            width: "80%",
          }}
          value={
            account
              ? window.location.origin + "/?ref=" + account
              : "Connect your wallet"
          }
        />
        <CopyToClipboard
          text={window.location.origin + "/?ref=" + account}
          onCopy={() => {
            setAlertState({
              open: true,
              message: `Referral Link Copied`,
              severity: "success",
            });
          }}
        >
          <Button
            sx={{
              width: "115px",
              backgroundColor: "#A034FF",
              height: "50px",
              fontSize: matches ? "12px" : "15px",
              fontWeight: 600,
              letterSpacing: "1%",
              textTransform: "capitalize",
              color: "white",
              "&:hover": {
                textDecoration: "underline",
                backgroundColor: "#A034FF",
              },
            }}
          >
            Copy Link
          </Button>
        </CopyToClipboard>
      </Box>

      <Box
        fontSize={{ xs: "14px", sm: "18px" }}
        fontWeight={600}
        letterSpacing="1%"
        mt={5}
      >
        Earnings from Referrals:
      </Box>
      <Box display="flex" mt={1}>
        <Box
          width="160px"
          bgcolor="rgba(255, 255, 255, 0.06)"
          borderRadius="6px"
          p={2}
          fontSize={{ xs: "14px", sm: "18px" }}
          fontWeight={600}
          lineHeight={{ xs: "24px", sm: "28px" }}
        >
          <Box>Deposits</Box>{" "}
          <Box color="text.secondary">
            Level 1:{" "}
            <Box component="span" color="#FFC34E">
              5%
            </Box>
          </Box>{" "}
          <Box color="text.secondary">
            Level 2:{" "}
            <Box component="span" color="#FFC34E">
              3%
            </Box>
          </Box>
          <Box color="text.secondary">
            Level 3:{" "}
            <Box component="span" color="#FFC34E">
              1%
            </Box>
          </Box>
        </Box>
        <Box
          bgcolor="rgba(255, 255, 255, 0.06)"
          borderRadius="6px"
          p={2}
          fontSize={{ xs: "14px", sm: "18px" }}
          fontWeight={600}
          ml={2}
          width="160px"
          lineHeight={{ xs: "24px", sm: "28px" }}
        >
          <Box>Withdrawals</Box>{" "}
          <Box color="text.secondary">
            Level 1:{" "}
            <Box component="span" color="#FFC34E">
              1.5%
            </Box>
          </Box>{" "}
          <Box color="text.secondary">
            Level 2:{" "}
            <Box component="span" color="#FFC34E">
              0.5%
            </Box>
          </Box>
          <Box color="text.secondary">
            Level 3:{" "}
            <Box component="span" color="#FFC34E">
              0.1%
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        bgcolor="rgba(255, 255, 255, 0.06)"
        borderRadius="6px"
        p={{ xs: 1, sm: 2 }}
        fontSize={{ xs: "12px", sm: "15px" }}
        fontWeight={400}
        mt={8}
      >
        <Box
          fontSize={{ xs: "13px", sm: "15px" }}
          fontWeight={600}
          color="text.primary"
          letterSpacing="1%"
          component="span"
        >
          <Box component="span" color="#EA3A56">
            *
          </Box>
          Note:{" "}
        </Box>
        You need to have at least 1 deposit to start receiving earnings
      </Box>

      <Box
        fontSize={{ xs: "12px", sm: "14px" }}
        fontWeight={400}
        color="text.secondary"
        mt={5}
      >
        Total Referral Earned
      </Box>
      <Box
        fontSize={{ xs: "16px", sm: "22px" }}
        fontWeight={700}
        color="text.primary"
      >
        {ReferralTotalBonus ? ReferralTotalBonus : "0.00"}
      </Box>

      <Box
        fontSize={{ xs: "12px", sm: "14px" }}
        fontWeight={400}
        color="text.secondary"
        mt={3}
      >
        Total Referral Withdrawn
      </Box>
      <Box
        fontSize={{ xs: "16px", sm: "22px" }}
        fontWeight={700}
        color="text.primary"
      >
        {ReferralWithdrawn ? ReferralWithdrawn : "0.00"}
      </Box>

      <Box
        fontSize={{ xs: "12px", sm: "14px" }}
        fontWeight={400}
        color="text.secondary"
        mt={3}
      >
        Total Users Invited
      </Box>
      <Box
        fontSize={{ xs: "16px", sm: "22px" }}
        fontWeight={700}
        color="text.primary"
      >
        {totalUser ? totalUser : "0"}
      </Box>
    </Box>
  );
}

export default ReferralInfo;
