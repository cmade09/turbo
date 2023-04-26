import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  useMediaQuery,
  Divider,
  Button,
} from "@mui/material";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { formatUnits, parseUnits } from "@ethersproject/units";

import lock from "../assets/lock.svg";
import yellow from "../assets/yellowlock.svg";
import Loading from "../utils/loading";
import { useAvaxContract } from "../Connectivity/Hooks";
import { AppContext } from "../utils/utils";
import { ToastNotify } from "../utils/ToastNotify";

function Cards({ init }) {
  const matches = useMediaQuery("(max-width:700px)");
  const { account, signer, connect } = useContext(AppContext);
  const AvaxContract = useAvaxContract(signer);
  const AvaxContract1 = useAvaxContract();
  const [loading, setloading] = useState(false);
  const [dataDetails, setDataDetails] = useState([]);
  const [value0, setValue0] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [value6, setValue6] = useState();
  const [value7, setValue7] = useState();
  // state for airDrops
  const [air0, setAir0] = useState("0");
  const [air1, setAir1] = useState("0");
  const [air2, setAir2] = useState("0");
  const [air3, setAir3] = useState("0");
  const [air4, setAir4] = useState("0");
  const [air5, setAir5] = useState("0");
  const [air6, setAir6] = useState("0");
  const [air7, setAir7] = useState("0");
  const [returnProfit, setreturnProfit] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });

  let refAddress =
    typeof localStorage != "undefined"
      ? localStorage.getItem("REF_ADDRESS")
      : "";
  let defaultAddress = "0xb8754A3923cdE32BACf9B76e05F38c539175344A";
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  let arr = [];
  const values = async () => {
    try {
      for (let i = 0; i < 8; i++) {
        const { percent, profit } = await AvaxContract1.getResult(i, 100);
        const obj = {
          profit: +percent / 100,
          returnProfit: +profit / 100,
        };
        arr.push(obj);
      }
      setDataDetails([...arr]);
    } catch (e) {
      console.log(e);
    }

    // try {
    //   for (let i = 0; i < 8; i++) {
    //     const { time, percent } = await AvaxContract1.getPlanInfo(i);
    //     const obj = {
    //       time: time,
    //       profit: +percent / 100,
    //       returnProfit: (+percent * time) / 100,
    //     };
    //     arr.push(obj);
    //   }
    //   setDataDetails([...arr]);
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const getProfit = async (i, val) => {
    try {
      const { profit } = await AvaxContract1.getResult(i, parseUnits(val));

      const tx = (+profit / 100 / 1e18).toFixed(5);
      setreturnProfit({
        ...returnProfit,
        [i]: +tx,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    values();
  }, []);

  const HandleStake = async (amount, plan) => {
    console.log(+amount, plan, "handleStake", +amount > 0);
    if (account) {
      if (+amount > 0) {
        try {
          setloading(true);
          let ref = refAddress ? refAddress : defaultAddress;
          const tx = await AvaxContract.invest(ref, plan.toString(), {
            value: parseUnits(amount.toString()),
          });
          await tx.wait();
          init();
          setloading(false);
          setAlertState({
            open: true,
            message: `Successfully invested`,
            severity: "success",
          });
        } catch (error) {
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
      } else {
        setAlertState({
          open: true,
          message: `Please enter valid amount`,
          severity: "error",
        });
      }
    } else {
      connect();
    }
  };

  const HandleAirDrop = async () => {
    if (+value0 < 0.05) {
      setAir0("0");
    } else if (+value0 >= 0.05 && +value0 < 0.1) {
      setAir0("1");
    } else if (+value0 >= 0.1 && +value0 < 0.5) {
      setAir0("2");
    } else if (+value0 >= 0.5 && +value0 < 1) {
      setAir0("3");
    } else if (+value0 >= 1) {
      setAir0("5");
    }

    if (+value1 < 0.05) {
      setAir1("0");
    } else if (+value1 >= 0.05 && +value1 < 0.1) {
      setAir1("2");
    } else if (+value1 >= 0.1 && +value1 < 0.5) {
      setAir1("3");
    } else if (+value1 >= 0.5 && +value1 < 1) {
      setAir1("4");
    } else if (+value1 >= 1) {
      setAir1("6");
    }

    if (+value2 < 0.05) {
      setAir2("0");
    } else if (+value2 >= 0.05 && +value2 < 0.1) {
      setAir2("2");
    } else if (+value2 >= 0.1 && +value2 < 0.5) {
      setAir2("3");
    } else if (+value2 >= 0.5 && +value2 < 1) {
      setAir2("4");
    } else if (+value2 >= 1) {
      setAir2("7");
    }

    if (+value3 < 0.05) {
      setAir3("1");
    } else if (+value3 >= 0.05 && +value3 < 0.1) {
      setAir3("3");
    } else if (+value3 >= 0.1 && +value3 < 0.5) {
      setAir3("4");
    } else if (+value3 >= 0.5 && +value3 < 1) {
      setAir3("6");
    } else if (+value3 >= 1) {
      setAir3("8");
    }

    if (+value4 < 0.05) {
      setAir4("0");
    } else if (+value4 >= 0.05 && +value4 < 0.1) {
      setAir4("2");
    } else if (+value4 >= 0.1 && +value4 < 0.5) {
      setAir4("3");
    } else if (+value4 >= 0.5 && +value4 < 1) {
      setAir4("5");
    } else if (+value4 >= 1) {
      setAir4("7");
    }

    if (+value5 < 0.05) {
      setAir5("1");
    } else if (+value5 >= 0.05 && +value5 < 0.1) {
      setAir5("3");
    } else if (+value5 >= 0.1 && +value5 < 0.5) {
      setAir5("4");
    } else if (+value5 >= 0.5 && +value5 < 1) {
      setAir5("6");
    } else if (+value5 >= 1) {
      setAir5("8");
    }

    if (+value6 < 0.05) {
      setAir6("1");
    } else if (+value6 >= 0.05 && +value6 < 0.1) {
      setAir6("4");
    } else if (+value6 >= 0.1 && +value6 < 0.5) {
      setAir6("5");
    } else if (+value6 >= 0.5 && +value6 < 1) {
      setAir6("8");
    } else if (+value6 >= 1) {
      setAir6("10");
    }

    if (+value7 < 0.05) {
      setAir7("1");
    } else if (+value7 >= 0.05 && +value7 < 0.1) {
      setAir7("5");
    } else if (+value7 >= 0.1 && +value7 < 0.5) {
      setAir7("6");
    } else if (+value7 >= 0.5 && +value7 < 1) {
      setAir7("10");
    } else if (+value7 >= 1) {
      setAir7("12");
    }
  };

  useEffect(() => {
    HandleAirDrop();
  }, [value0, value1, value2, value3, value4, value5, value6, value7]);

  return (
    <Box id="plans" py={6}>
      <Loading loading={loading} />
      <ToastNotify alertState={alertState} setAlertState={setAlertState} />
      <Container maxWidth="lg">
        <Box display={"flex"} alignItems="center">
          <img src={lock} style={{ width: "19.2px", height: "24px" }} alt="" />
          <Typography fontWeight="600" fontSize="24px" ml={2}>
            Unlocked Plans
          </Typography>
        </Box>
        <Grid container spacing={5} mt={1}>
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
          >
            <Box
              sx={{
                width: matches ? "290px" : "270px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px 6px 0px 0px",
                }}
                p={3}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#FBF8F9",
                    fontSize: matches ? "20px" : "22px",
                  }}
                  py={2}
                >
                  12 Days
                </Typography>
                <Divider style={{ borderColor: "rgba(255, 255, 255, 0.16)" }} />
                <Box display="flex" justifyContent="space-between" pt={3}>
                  <Typography fontWeight="500" color="#999999" fontSize="14px">
                    Daily Earning
                  </Typography>
                  <Typography fontWeight="500" color="#999999" fontSize="14px">
                    Total Return
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[0].profit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[0].returnProfit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box py={3}>
                  <Typography pb={1} textAlign="center">
                    Enter Amount ETH
                  </Typography>
                  <input
                    value={value0}
                    style={{
                      height: "44px",
                      backgroundColor: "rgba(255, 255, 255, 0.06",
                      width: "150px",
                      fontSize: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      outline: "none",
                      textAlign: "center",
                      borderRadius: "6px",
                      color: "white",
                    }}
                    placeholder="0"
                    onChange={(e) => {
                      setValue0(e.target.value);
                      getProfit(0, e.target.value);
                    }}
                  />
                </Box>
                <Box py={1}>
                  <Box
                    fontWeight="600"
                    fontSize="14px"
                    lineheight="28px"
                    color="#999999"
                    textAlign={"center"}
                  >
                    ETH ROI in 12 Days
                  </Box>
                  <Box
                    fontWeight="700"
                    fontSize="30px"
                    textAlign="center "
                    color={value0 > 0 ? "#8AFFF7" : "#999999"}
                  >
                    {/* {dataDetails?.length !== 0
                      ? (
                          (dataDetails[0].returnProfit / 100) *
                          (value0 === undefined ? 0 : value0)
                        ).toFixed(3)
                      : "0.0"} */}
                    {returnProfit[0]}
                  </Box>
                </Box>
                <Box color="#999999" fontSize="16px">
                  NFT airdrop : <span style={{ color: "#8AFFF7" }}>{air0}</span>
                </Box>
                <Box py={3}>
                  <Box
                    sx={{
                      width: "216px",
                      height: "44px",
                      fontWeight: 700,
                      display: "flex",
                      cursor: "pointer",
                      border: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      color: "#07071C",
                      background:
                        "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                      borderRadius: "46px",
                      "&:hover": {
                        background: "#8AFFF7",
                      },
                    }}
                    onClick={() => HandleStake(value0, 0)}
                  >
                    Stake ETH
                  </Box>
                </Box>
                <Box display="flex" my={1} pb={2}>
                  <img
                    src={lock}
                    style={{ width: "14px", height: "18px" }}
                    alt=""
                  />
                  <Typography color="#999999" ml={1}>
                    withdraw anytime
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
          >
            <Box
              sx={{
                width: matches ? "290px" : "270px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px 6px 0px 0px",
                }}
                p={3}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#FBF8F9",
                    fontSize: matches ? "20px" : "22px",
                  }}
                  py={2}
                >
                  16 Days
                </Typography>
                <Divider style={{ borderColor: "rgba(255, 255, 255, 0.16)" }} />
                <Box display="flex" justifyContent="space-between" pt={3}>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Daily Earning
                  </Typography>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Total Return
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[1].profit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[1].returnProfit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box py={3}>
                  <Typography pb={1} textAlign="center">
                    Enter Amount ETH
                  </Typography>
                  <input
                    value={value1}
                    style={{
                      height: "44px",
                      backgroundColor: "rgba(255, 255, 255, 0.06",
                      width: "150px",
                      fontSize: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      outline: "none",
                      textAlign: "center",
                      borderRadius: "6px",
                      color: "white",
                    }}
                    placeholder="0"
                    onChange={(e) => {
                      setValue1(e.target.value);
                      getProfit(1, e.target.value);
                    }}
                  />
                </Box>
                <Box py={1}>
                  <Box
                    fontWeight="600"
                    fontSize="14px"
                    lineheight="28px"
                    color="#999999"
                    textAlign={"center"}
                  >
                    ETH ROI in 16 Days
                  </Box>
                  <Box></Box>
                  <Box
                    fontWeight="700"
                    color={value1 > 0 ? "#8AFFF7" : "#999999"}
                    fontSize="30px"
                    textAlign="center"
                  >
                    {/* {dataDetails?.length !== 0
                      ? (
                          (dataDetails[1].returnProfit / 100) *
                          (value1 === undefined ? 0 : value1)
                        ).toFixed(3)
                      : "0.0"} */}
                    {returnProfit[1]}
                  </Box>
                </Box>
                <Box color="#999999" fontSize="16px">
                  NFT airdrop : <span style={{ color: "#8AFFF7" }}>{air1}</span>
                </Box>
                <Box py={3}>
                  <Box
                    sx={{
                      width: "216px",
                      height: "44px",
                      fontWeight: 700,
                      display: "flex",
                      cursor: "pointer",
                      border: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      color: " #07071C",
                      background:
                        "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                      borderRadius: "46px",
                      "&:hover": {
                        background: "#8AFFF7",
                      },
                    }}
                    onClick={() => HandleStake(value1, 1)}
                  >
                    Stake ETH
                  </Box>
                </Box>
                <Box display="flex" my={1} pb={2}>
                  <img
                    src={lock}
                    style={{ width: "14px", height: "18px" }}
                    alt=""
                  />
                  <Typography color="#999999" ml={1}>
                    withdraw anytime
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
          >
            <Box
              sx={{
                width: matches ? "290px" : "270px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px 6px 0px 0px",
                }}
                p={3}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#FBF8F9",
                    fontSize: matches ? "20px" : "22px",
                  }}
                  py={2}
                >
                  22 Days
                </Typography>
                <Divider style={{ borderColor: "rgba(255, 255, 255, 0.16)" }} />
                <Box display="flex" justifyContent="space-between" pt={3}>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Daily Earning
                  </Typography>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Total Return
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[2].profit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[2].returnProfit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box py={3}>
                  <Typography pb={1} textAlign="center">
                    Enter Amount ETH
                  </Typography>
                  <input
                    value={value2}
                    style={{
                      height: "44px",
                      backgroundColor: "rgba(255, 255, 255, 0.06",
                      width: "150px",
                      fontSize: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      outline: "none",
                      textAlign: "center",
                      borderRadius: "6px",
                      color: "white",
                    }}
                    placeholder="0"
                    onChange={(e) => {
                      setValue2(e.target.value);
                      getProfit(2, e.target.value);
                    }}
                  />
                </Box>
                <Box py={1}>
                  <Box
                    fontWeight="600"
                    fontSize="14px"
                    lineheight="28px"
                    color="#999999"
                    textAlign={"center"}
                  >
                    ETH ROI in 22 Days
                  </Box>
                  <Box></Box>
                  <Box
                    fontWeight="700"
                    color={value2 > 0 ? "#8AFFF7" : "#999999"}
                    fontSize="30px"
                    textAlign="center"
                  >
                    {/* {dataDetails?.length !== 0
                      ? (
                          (dataDetails[2].returnProfit / 100) *
                          (value2 === undefined ? 0 : value2)
                        ).toFixed(3)
                      : "0.0"} */}
                    {returnProfit[2]}
                  </Box>
                </Box>
                <Box color="#999999" fontSize="16px">
                  NFT airdrop : <span style={{ color: "#8AFFF7" }}>{air2}</span>
                </Box>
                <Box py={3}>
                  <Box
                    sx={{
                      width: "216px",
                      height: "44px",
                      fontWeight: 700,
                      display: "flex",
                      cursor: "pointer",
                      border: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      color: " #07071C",
                      background:
                        "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                      borderRadius: "46px",
                      "&:hover": {
                        background: "#8AFFF7",
                      },
                    }}
                    onClick={() => HandleStake(value2, 2)}
                  >
                    Stake ETH
                  </Box>
                </Box>
                <Box display="flex" my={1} pb={2}>
                  <img
                    src={lock}
                    style={{ width: "14px", height: "18px" }}
                    alt=""
                  />
                  <Typography color="#999999" ml={1}>
                    withdraw anytime
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
            mt={{ xs: 5, lg: 0 }}
          >
            <Box
              sx={{
                width: matches ? "290px" : "270px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  width: matches ? "290px" : "270px",
                  // background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px",
                  position: "relative",
                  border: "1px solid #FFE8Ba",
                }}
              >
                <Box
                  display={"flex"}
                  justifyContent="center"
                  sx={{
                    width: "101%",
                    background: "#FFE8Ba",
                    borderRadius: "6px 6px 0px 0px",
                    fontWeight: 400,
                    position: "absolute",
                    top: "-6.5%",
                    left: "-1px",
                    fontSize: "15px",
                    alignItems: "center",
                    color: "#000000",
                  }}
                  p={1}
                >
                  <StarOutlinedIcon
                    sx={{ color: "black", marginRight: "4px" }}
                  />
                  Recommended
                </Box>
                <Box
                  sx={{
                    background: "rgba(255, 255, 255, 0.06)",
                    borderRadius: "6px 6px 0px 0px",
                  }}
                  p={3}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      textAlign: "center",
                      color: "#FBF8F9",
                      fontSize: matches ? "20px" : "22px",
                    }}
                    py={2}
                  >
                    26 Days
                  </Typography>
                  <Divider
                    style={{ borderColor: "rgba(255, 255, 255, 0.16)" }}
                  />
                  <Box display="flex" justifyContent="space-between" pt={3}>
                    <Typography
                      fontWeight="600"
                      color="#999999"
                      fontSize="14px"
                    >
                      Daily Earning
                    </Typography>
                    <Typography
                      fontWeight="600"
                      color="#999999"
                      fontSize="14px"
                    >
                      Total Return
                    </Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      // color="#FFC34E"
                      color={"#FFC34E"}
                      fontWeight="700"
                      fontSize={{ xs: "18px", md: "24px" }}
                    >
                      {dataDetails?.length !== 0
                        ? dataDetails[3].profit.toFixed(2)
                        : "0.0"}
                      %
                    </Typography>
                    <Typography
                      color={"#FFC34E"}
                      // color="#FFC34E"
                      fontWeight="700"
                      fontSize={{ xs: "18px", md: "24px" }}
                    >
                      {dataDetails?.length !== 0
                        ? dataDetails[3].returnProfit.toFixed(2)
                        : "0.0"}
                      %
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" flexDirection="column">
                  <Box py={3}>
                    <Typography pb={1} textAlign="center">
                      Enter Amount ETH
                    </Typography>
                    <input
                      value={value3}
                      style={{
                        height: "44px",
                        backgroundColor: "rgba(255, 255, 255, 0.06",
                        width: "150px",
                        fontSize: "18px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        outline: "none",
                        textAlign: "center",
                        borderRadius: "6px",
                        color: "white",
                      }}
                      placeholder="0"
                      onChange={(e) => {
                        setValue3(e.target.value);
                        getProfit(3, e.target.value);
                      }}
                    />
                  </Box>
                  <Box py={1}>
                    <Box
                      fontWeight="600"
                      fontSize="14px"
                      lineheight="28px"
                      color="#999999"
                      textAlign={"center"}
                    >
                      ETH ROI in 26 Days
                    </Box>
                    <Box
                      fontWeight="700"
                      fontSize="30px"
                      textAlign="center"
                      color={value3 > 0 ? "#8AFFF7" : "#999999"}
                    >
                      {/* {dataDetails?.length !== 0
                        ? (
                            (dataDetails[3].returnProfit / 100) *
                            (value3 === undefined ? 0 : value3)
                          ).toFixed(3)
                        : "0.0"} */}
                      {returnProfit[3]}
                    </Box>
                  </Box>
                  <Box color="#999999" fontSize="16px">
                    NFT airdrop :{" "}
                    <span style={{ color: "#8AFFF7" }}>{air3}</span>
                  </Box>
                  <Box py={3}>
                    <Box
                      sx={{
                        width: "216px",
                        height: "44px",
                        fontWeight: 700,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "18px",
                        cursor: "pointer",
                        border: "none",
                        background:
                          "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                        borderRadius: "46px",
                        color: "#07071C",
                        "&:hover": {
                          background: "#8AFFF7",
                        },
                      }}
                      onClick={() => HandleStake(value3, 3)}
                    >
                      Stake ETH
                    </Box>
                  </Box>
                  <Box display="flex" my={1} pb={2}>
                    <img
                      src={lock}
                      style={{ width: "14px", height: "18px" }}
                      alt=""
                    />
                    <Typography color="#999999" ml={1}>
                      withdraw anytime
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box display={"flex"} alignItems="center" mt={10}>
          <img
            src={yellow}
            style={{ width: "19.2px", height: "24px" }}
            alt=""
          />
          <Typography fontWeight="600" fontSize="24px" ml={2}>
            Locked Plans
          </Typography>
        </Box>
        <Grid container spacing={5} mt={1}>
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
          >
            <Box
              sx={{
                width: matches ? "290px" : "270px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px 6px 0px 0px",
                }}
                p={3}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#FBF8F9",
                    fontSize: matches ? "20px" : "22px",
                  }}
                  py={2}
                >
                  12 Days
                </Typography>
                <Divider style={{ borderColor: "rgba(255, 255, 255, 0.16)" }} />
                <Box display="flex" justifyContent="space-between" pt={3}>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Daily Earning
                  </Typography>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Total Return
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[4].profit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[4].returnProfit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box py={3}>
                  <Typography pb={1} textAlign="center">
                    Enter Amount ETH
                  </Typography>
                  <input
                    value={value4}
                    style={{
                      width: "150px",
                      fontSize: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      height: "44px",
                      backgroundColor: "rgba(255, 255, 255, 0.06",
                      outline: "none",
                      textAlign: "center",
                      borderRadius: "6px",
                      color: "white",
                    }}
                    placeholder="0"
                    onChange={(e) => {
                      setValue4(e.target.value);
                      getProfit(4, e.target.value);
                    }}
                  />
                </Box>
                <Box py={1}>
                  <Box
                    fontWeight="600"
                    fontSize="14px"
                    lineheight="28px"
                    color="#999999"
                    textAlign={"center"}
                  >
                    ETH ROI in 12 Days
                  </Box>
                  <Box
                    fontWeight="700"
                    fontSize="30px"
                    textAlign="center"
                    color={value4 > 0 ? "#8AFFF7" : "#999999"}
                  >
                    {/* {dataDetails?.length !== 0
                      ? (
                          (dataDetails[4].returnProfit / 100) *
                          (value4 === undefined ? 0 : value4)
                        ).toFixed(3)
                      : "0.0"} */}
                    {returnProfit[4]}
                  </Box>
                </Box>
                <Box color="#999999" fontSize="16px">
                  NFT airdrop : <span style={{ color: "#8AFFF7" }}>{air4}</span>
                </Box>
                <Box py={3}>
                  <Box
                    sx={{
                      width: "216px",
                      height: "44px",
                      fontWeight: 700,
                      display: "flex",
                      cursor: "pointer",
                      border: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      background:
                        "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                      borderRadius: "46px",
                      color: " #07071C",
                      "&:hover": {
                        background: "#8AFFF7",
                      },
                    }}
                    onClick={() => HandleStake(value4, 4)}
                  >
                    Stake ETH
                  </Box>
                </Box>
                <Box display="flex" my={1} pb={2}>
                  <img
                    src={yellow}
                    style={{ width: "14px", height: "18px" }}
                    alt=""
                  />
                  <Typography color="#999999" ml={1}>
                    at the end
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems={"center"}
          >
            <Box
              sx={{
                width: matches ? "290px" : "270px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px 6px 0px 0px",
                }}
                p={3}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#FBF8F9",
                    fontSize: matches ? "20px" : "22px",
                  }}
                  py={2}
                >
                  16 Days
                </Typography>
                <Divider style={{ borderColor: "rgba(255, 255, 255, 0.16)" }} />
                <Box display="flex" justifyContent="space-between" pt={3}>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Daily Earning
                  </Typography>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Total Return
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[5].profit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[5].returnProfit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box py={3}>
                  <Typography pb={1} textAlign="center">
                    Enter Amount ETH
                  </Typography>
                  <input
                    value={value5}
                    style={{
                      width: "150px",
                      fontSize: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      height: "44px",
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                      outline: "none",
                      textAlign: "center",
                      borderRadius: "6px",
                      color: "white",
                    }}
                    placeholder="0"
                    onChange={(e) => {
                      setValue5(e.target.value);
                      getProfit(5, e.target.value);
                    }}
                  />
                </Box>

                <Box py={1}>
                  <Box
                    fontWeight="600"
                    fontSize="14px"
                    lineheight="28px"
                    color="#999999"
                    textAlign={"center"}
                  >
                    ETH ROI in 16 Days
                  </Box>
                  <Box
                    fontWeight="700"
                    fontSize="30px"
                    textAlign="center"
                    color={value5 > 0 ? "#8AFFF7" : "#999999"}
                  >
                    {/* {dataDetails?.length !== 0
                      ? (
                          (dataDetails[5].returnProfit / 100) *
                          (value5 === undefined ? 0 : value5)
                        ).toFixed(3)
                      : "0.0"} */}
                    {returnProfit[5]}
                  </Box>
                </Box>
                <Box color="#999999" fontSize="16px">
                  NFT airdrop : <span style={{ color: "#8AFFF7" }}>{air5}</span>
                </Box>
                <Box py={3}>
                  <Box
                    sx={{
                      width: "216px",
                      height: "44px",
                      fontWeight: 700,
                      display: "flex",
                      cursor: "pointer",
                      border: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      background:
                        "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                      borderRadius: "46px",
                      color: " #07071C",
                      "&:hover": {
                        background: "#8AFFF7",
                      },
                    }}
                    onClick={() => HandleStake(value5, 5)}
                  >
                    Stake ETH
                  </Box>
                </Box>
                <Box display="flex" my={1} pb={2}>
                  <img
                    src={yellow}
                    style={{ width: "14px", height: "18px" }}
                    alt=""
                  />
                  <Typography color="#999999" ml={1}>
                    at the end
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            display="flex"
            justifyContent="center"
            alignItems={"end"}
          >
            <Box
              sx={{
                width: matches ? "290px" : "270px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
              }}
            >
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px 6px 0px 0px",
                }}
                p={3}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#FBF8F9",
                    fontSize: matches ? "20px" : "22px",
                  }}
                  py={2}
                >
                  22 Days
                </Typography>
                <Divider style={{ borderColor: "rgba(255, 255, 255, 0.16)" }} />
                <Box display="flex" justifyContent="space-between" pt={3}>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Daily Earning
                  </Typography>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Total Return
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[6].profit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                  <Typography
                    color="#FFC34E"
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[6].returnProfit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box py={3}>
                  <Typography pb={1} textAlign="center">
                    Enter Amount ETH
                  </Typography>
                  <input
                    vlaue={value6}
                    style={{
                      height: "44px",
                      backgroundColor: "rgba(255, 255, 255, 0.06",
                      width: "150px",
                      fontSize: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      outline: "none",
                      textAlign: "center",
                      borderRadius: "6px",
                      color: "white",
                    }}
                    onChange={(e) => {
                      setValue6(e.target.value);
                      getProfit(6, e.target.value);
                    }}
                    placeholder="0"
                  />
                </Box>
                <Box py={1}>
                  <Box
                    fontWeight="600"
                    fontSize="14px"
                    color="#999999"
                    textAlign={"center"}
                  >
                    ETH ROI in 22 Days
                  </Box>
                  <Box
                    fontWeight="700"
                    fontSize="30px"
                    color={value6 > 0 ? "#8AFFF7" : "#999999"}
                    textAlign="center"
                  >
                    {/* {dataDetails?.length !== 0
                      ? (
                          (dataDetails[6].returnProfit / 100) *
                          (value6 === undefined ? 0 : value6)
                        ).toFixed(3)
                      : "0.0"} */}
                    {returnProfit[6]}
                  </Box>
                </Box>
                <Box color="#999999" fontSize="16px">
                  NFT airdrop : <span style={{ color: "#8AFFF7" }}>{air6}</span>
                </Box>
                <Box py={3}>
                  <Box
                    sx={{
                      width: "216px",
                      height: "44px",
                      fontWeight: 700,
                      display: "flex",
                      cursor: "pointer",
                      border: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      background:
                        "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                      borderRadius: "46px",
                      color: " #07071C",
                      "&:hover": {
                        background: "#8AFFF7",
                      },
                    }}
                    onClick={() => HandleStake(value6, 6)}
                  >
                    Stake ETH
                  </Box>
                </Box>
                <Box display="flex" my={1} pb={2}>
                  <img
                    src={yellow}
                    style={{ width: "14px", height: "18px" }}
                    alt=""
                  />
                  <Typography color="#999999" ml={1}>
                    at the end / force withdraw
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            lg={3}
            sm={6}
            display="flex"
            justifyContent="center"
            mt={{ xs: 5, lg: 0 }}
          >
            <Box
              sx={{
                boxSizing: "border-box",
                width: matches ? "290px" : "270px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "6px",
                position: "relative",
                border: "1px solid #FFE8Ba",
              }}
            >
              <Box
                display={"flex"}
                justifyContent="center"
                sx={{
                  width: "101%",
                  background: "#FFE8Ba",
                  borderRadius: "6px 6px 0px 0px",
                  fontWeight: 400,
                  position: "absolute",
                  top: "-6.5%",
                  left: "-1px",
                  fontSize: "15px",
                  alignItems: "center",
                  color: "#000000",
                }}
                p={1}
              >
                <StarOutlinedIcon sx={{ color: "black", marginRight: "4px" }} />
                Recommended
              </Box>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "6px 6px 0px 0px",
                }}
                p={3}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    textAlign: "center",
                    color: "#FBF8F9",
                    fontSize: matches ? "20px" : "22px",
                  }}
                  py={2}
                >
                  26 Days
                </Typography>
                <Divider style={{ borderColor: "rgba(255, 255, 255, 0.16)" }} />
                <Box display="flex" justifyContent="space-between" pt={3}>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Daily Earning
                  </Typography>
                  <Typography fontWeight="600" color="#999999" fontSize="14px">
                    Total Return
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography
                    color={"#FFC34E"}
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[7].profit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                  <Typography
                    color={"#FFC34E"}
                    fontWeight="700"
                    fontSize={{ xs: "18px", md: "24px" }}
                  >
                    {dataDetails?.length !== 0
                      ? dataDetails[7].returnProfit.toFixed(2)
                      : "0.0"}
                    %
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box py={3}>
                  <Typography pb={1} textAlign="center">
                    Enter Amount ETH
                  </Typography>
                  <input
                    vaalue={value7}
                    style={{
                      height: "44px",
                      backgroundColor: "rgba(255, 255, 255, 0.06",
                      width: "150px",
                      fontSize: "18px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      outline: "none",
                      textAlign: "center",
                      borderRadius: "6px",
                      color: "white",
                    }}
                    placeholder="0"
                    onChange={(e) => {
                      setValue7(e.target.value);
                      getProfit(7, e.target.value);
                    }}
                  />
                </Box>
                <Box py={1}>
                  <Box
                    fontWeight="600"
                    fontSize="14px"
                    lineheight="28px"
                    color="#999999"
                    textAlign={"center"}
                  >
                    ETH ROI in 26 Days
                  </Box>
                  <Box
                    fontWeight="700"
                    fontSize="30px"
                    color={value7 > 0 ? "#8AFFF7" : "#999999"}
                    textAlign="center"
                  >
                    {/* {dataDetails?.length !== 0
                      ? (
                          (dataDetails[7].returnProfit / 100) *
                          (value7 === undefined ? 0 : value7)
                        ).toFixed(3)
                      : "0.0"} */}
                    {returnProfit[7]}
                  </Box>
                </Box>
                <Box color="#999999" fontSize="16px">
                  NFT airdrop : <span style={{ color: "#8AFFF7" }}>{air7}</span>
                </Box>
                <Box py={3}>
                  <Box
                    sx={{
                      width: "216px",
                      height: "44px",
                      fontWeight: 700,
                      display: "flex",
                      cursor: "pointer",
                      border: "none",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "18px",
                      background:
                        "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                      borderRadius: "46px",
                      color: " #07071C",
                      "&:hover": {
                        background: "#8AFFF7",
                      },
                    }}
                    onClick={() => HandleStake(value7, 7)}
                  >
                    Stake ETH
                  </Box>
                </Box>
                <Box display="flex" my={1} pb={2}>
                  <img
                    src={yellow}
                    style={{ width: "14px", height: "18px" }}
                    alt=""
                  />
                  <Typography color="#999999" ml={1}>
                    at the end / force withdraw
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Cards;
