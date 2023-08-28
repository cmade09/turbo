import React, { useContext, useState } from "react";
import { Box, Button, Divider, Stack } from "@mui/material";
import { Link as LinkS } from "react-scroll";

import wallet from "../assets/wallet.svg";
import unlock from "../assets/lock.svg";
import lock from "../assets/locked.svg";
import reinvest from "../assets/reinvest.png";

import TimerCountDown from "./DeposiTimer";
import { useAvaxContract } from "../Connectivity/Hooks";
import { AppContext } from "../utils/utils";
import Loading from "../utils/loading";
import { ToastNotify } from "../utils/ToastNotify";

function EarningsDeposit({
  totalStaked,
  available,
  TotalWithdrawn,
  HoldBonusPercent,
  depositData,
  init,
}) {
  const { signer, account } = useContext(AppContext);
  const AvaxContract = useAvaxContract(signer);
  const [loading, setloading] = useState(false);
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });
  const HandleForceWithdraw = async (i) => {
    try {
      setloading(true);
      const tx = await AvaxContract.emergencyWithdraw(i.toString());
      await tx.wait();
      init();
      setloading(false);
      setAlertState({
        open: true,
        message: `Withdrawn Successfully`,
        severity: "success",
      });
    } catch (error) {
      console.log(error);
      if (error?.data?.message) {
        setAlertState({
          open: true,
          message: error?.data?.message,
          severity: "error",
        });
      } else {
        setAlertState({
          open: true,
          message: error?.message,
          severity: "error",
        });
      }
      setloading(false);
    }
  };

  const handleWithdraw = async () => {
    if (account) {
      try {
        setloading(true);
        const tx = await AvaxContract.withdraw();
        await tx.wait();
        init();
        setloading(false);
        setAlertState({
          open: true,
          message: `Withdrawn Successfully`,
          severity: "success",
        });
      } catch (error) {
        console.log(error);
        if (error?.data?.message) {
          setAlertState({
            open: true,
            message: error?.data?.message,
            severity: "error",
          });
        } else {
          setAlertState({
            open: true,
            message: error?.message,
            severity: "error",
          });
        }
        setloading(false);
      }
    }
  };
  const handlReInvest = async () => {
    if (account) {
      try {
        setloading(true);
        const tx = await AvaxContract.reinvest();
        await tx.wait();
        init();
        setloading(false);
        setAlertState({
          open: true,
          message: `ReInvest Successfully`,
          severity: "success",
        });
      } catch (error) {
        console.log(error);
        if (error?.data?.message) {
          setAlertState({
            open: true,
            message: error?.data?.message,
            severity: "error",
          });
        } else {
          setAlertState({
            open: true,
            message: error?.message,
            severity: "error",
          });
        }
        setloading(false);
      }
    }
  };
  // console.log(
  //   depositData[1]?.status,
  //   "depositData[1].status",
  //   depositData[1]?.forced,
  //   "depositData[1].forced"
  // );
  return (
    <Box
      py={{ xs: 3, sm: 5 }}
      px={{ xs: 2, sm: 4 }}
      bgcolor="rgba(255, 255, 255, 0.05)"
      borderRadius="6px"
      height="100%"
    >
      <Loading loading={loading} />
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <Box display="flex" alignItems="center">
        <img src={wallet} width="28px" height="24px" alt="" />
        <Box fontSize={{ xs: "18px", sm: "24px" }} fontWeight={600} ml={2}>
          ETH Earnings & Deposits
        </Box>
      </Box>

      <Box mt={4}>
        <Box
          py={1.5}
          borderRadius="6px"
          width="100%"
          display="flex"
          alignItems="center"
        >
          <Box
            fontSize={{ xs: "12px", sm: "16px" }}
            width="60%"
            fontWeight={400}
            color="text.secondary"
          >
            Your Total Staked
          </Box>
          <Box
            fontSize={{ xs: "14px", sm: "20px" }}
            fontWeight={400}
            color="text.primary"
          >
            {totalStaked ? totalStaked : "0.00"}
          </Box>
        </Box>
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
        <Box
          py={1.5}
          borderRadius="6px"
          width="100%"
          display="flex"
          alignItems="center"
        >
          <Box
            fontSize={{ xs: "12px", sm: "16px" }}
            fontWeight={400}
            color="text.secondary"
            width="60%"
          >
            Hold Bonus
          </Box>
          <Box
            fontSize={{ xs: "14px", sm: "20px" }}
            fontWeight={400}
            color="text.primary"
          >
            {HoldBonusPercent ? HoldBonusPercent : "0.00"}%
          </Box>
        </Box>
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />

        <Box py={1.5} display="flex" alignItems="center" width="100%">
          <Box
            fontSize={{ xs: "12px", sm: "16px" }}
            fontWeight={400}
            color="text.secondary"
            width="60%"
          >
            Withdrawn
          </Box>
          <Box
            fontSize={{ xs: "14px", sm: "20px" }}
            fontWeight={400}
            color="text.primary"
          >
            {TotalWithdrawn ? TotalWithdrawn : "0.00"}
          </Box>
        </Box>
        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
        <Box py={1.5} display="flex" alignItems="center" width="100%">
          <Box
            fontSize={{ xs: "12px", sm: "16px" }}
            fontWeight={400}
            color="text.secondary"
            width="60%"
          >
            Available for Withdrawal
          </Box>
          <Box
            fontSize={{ xs: "14px", sm: "20px" }}
            fontWeight={400}
            color="text.primary"
          >
            {available ? available : "0.00"}
          </Box>
        </Box>

        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
        <Box py={1.5} display="flex" alignItems="center" width="100%">
          <Box
            fontSize={{ xs: "12px", sm: "16px" }}
            fontWeight={400}
            color="text.secondary"
            width="60%"
          >
            ROI on reinvestment
          </Box>
          <Box
            fontSize={{ xs: "14px", sm: "20px" }}
            fontWeight={400}
            color="#8AFFF7"
          >
            {available ? ((available * 175) / 100).toFixed(4) : "0.00"}
          </Box>
        </Box>

        <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        flexWrap={{ xs: "wrap", lg: "nowrap" }}
        gap={{ xs: 1, md: 1 }}
        py={{ xs: 3, md: 5 }}
      >
        <Box
          sx={{
            background: "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
            p: "10px 32px",
            color: "#07071C",
            fontSize: { xs: "14px", sm: "18px" },
            fontWeight: "600",
            textTransform: "capitalize",
            cursor: "pointer",
            borderRadius: "46px",
            "&:hover": {
              background: "#8AFFF7",
            },
          }}
          onClick={() => handleWithdraw()}
        >
          Withdraw
        </Box>
        <Box sx={{ fontSize: "16px" }}> OR </Box>
        <Box
          sx={{
            background: "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
            p: "10px 32px",
            color: "#07071C",
            borderRadius: "46px",
            fontSize: { xs: "14px", sm: "18px" },
            fontWeight: "600",
            textTransform: "capitalize",
            cursor: "pointer",

            "&:hover": {
              background: "#8AFFF7",
            },
          }}
          onClick={() => handlReInvest()}
        >
          Reinvest
        </Box>
        <Box sx={{ fontSize: "14px", mt: 2, pl: 1 }}>
          <span style={{ color: "red" }}>*</span>Reinvest in 5 days locked plan
          and get <span style={{ color: "#FFC34E" }}>35%</span>{" "}
          <span style={{ fontWeight: "bold" }}>daily interest</span>
        </Box>
      </Stack>
      <hr
        style={{
          border: "1px solid rgba(255, 255, 255, 0.1)",
          margin: "30px 0px",
        }}
      />

      <Box display="flex" justifyContent="space-between" my={2}>
        <Box
          fontSize={{ xs: "14px", sm: "18px" }}
          fontWeight={600}
          color="text.primary"
          letterSpacing="1%"
        >
          Deposits
        </Box>
        <LinkS to="plans" spy={true} smooth={true} duration={1500}>
          <Box
            fontSize={{ xs: "12px", sm: "14px" }}
            fontWeight={400}
            color="text.primary"
            sx={{
              textDecoration: "underline",
              "&:hover": {
                color: "#8AFFF7",
                cursor: "pointer",
              },
            }}
          >
            View All Plans
          </Box>
        </LinkS>
      </Box>

      <Box width="100%" mx="auto" mb={0.7} mt={4}>
        <Box
          display="flex"
          color="text.secondary"
          alignItems="center"
          fontSize={{ xs: "10px", sm: "12px" }}
          fontWeight={400}
          borderBottom="1px solid rgba(255, 255, 255, 0.1)"
        >
          <Box width="25%" p={1}>
            <Box
              fontWeight={400}
              textAlign="left"
              sx={{
                textTransform: "uppercase",
              }}
            >
              plans
            </Box>
          </Box>
          <Box width="25%" p={1}>
            <Box
              fontWeight={400}
              textAlign="left"
              sx={{
                textTransform: "uppercase",
              }}
            >
              Staked / ROI
            </Box>
          </Box>
          <Box width="30%" p={1}>
            <Box
              fontWeight={400}
              textAlign="left"
              sx={{
                textTransform: "uppercase",
              }}
            >
              Time Remaining
            </Box>
          </Box>
        </Box>
        {depositData?.length !== 0 ? (
          depositData.map(
            ({ plan, staked, roi, finish, status, forced }, index) => (
              <Box
                display="flex"
                alignItems="center"
                key={index}
                fontSize={{ xs: "10px", sm: "14px" }}
                borderBottom="1px solid rgba(255, 255, 255, 0.1)"
              >
                <Box width="25%" p={1.5}>
                  <Box fontWeight={400} textAlign="left">
                    <img
                      src={plan === 8 ? reinvest : plan >= 4 ? lock : unlock}
                      style={{ marginRight: "7px", width: "12px" }}
                      alt=""
                    />
                    {plan !== 8
                      ? plan === 0 || plan === 4
                        ? 12
                        : plan === 1 || plan === 5
                        ? 16
                        : plan === 2 || plan === 6
                        ? 22
                        : 26
                      : 5}{" "}
                    days
                  </Box>
                </Box>
                <Box width="25%" p={1.5}>
                  <Box fontWeight={400} textAlign="left">
                    {staked} /
                    <Box component="span" color="#FFC34E">
                      {" "}
                      {roi}
                    </Box>
                  </Box>
                </Box>
                <Box width="25%" align="left" p={1.5}>
                  <Box fontWeight={400} textAlign="left">
                    <TimerCountDown time={finish} />
                  </Box>
                </Box>
                <Box width="25%" align="left" p={1.5}>
                  {forced === false && plan > 5 ? (
                    <Box
                      display={forced === true ? "none" : "block"}
                      fontWeight={400}
                      textAlign="left"
                      fontSize={{ xs: "12px", sm: "14px" }}
                      color="#8AFFF7"
                      sx={{
                        "&:hover": {
                          color: "#ffffff",
                          cursor: "pointer",
                          // textDecoration: "underline",
                        },
                      }}
                      onClick={() => HandleForceWithdraw(index)}
                    >
                      force withdrawal
                    </Box>
                  ) : (
                    <Box
                      display={forced === true ? "block" : "none"}
                      fontWeight={400}
                      textAlign="left"
                      fontSize={{ xs: "12px", sm: "14px" }}
                      color="#E84142"
                    >
                      closed
                    </Box>
                  )}
                </Box>
              </Box>
            )
          )
        ) : (
          <Box
            color="text.secondary"
            textAlign="center"
            fontSize={{ xs: "10px", sm: "12px" }}
            fontWeight={400}
            borderBottom="1px solid rgba(255, 255, 255, 0.1)"
            py={2}
          >
            No Record
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default EarningsDeposit;
