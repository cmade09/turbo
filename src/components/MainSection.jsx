import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  useMediaQuery,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { formatUnits } from "@ethersproject/units";
import { useAvaxContract } from "../Connectivity/Hooks";
import { AvaxAddress } from "../Connectivity/Environment";
import icon from "../assets/icon.png";
import airdrop from "../assets/airdrop.png";
import collection from "../assets/collection.svg";

import youtube from "../assets/youtube-logo.png";
import YoutubeModal from "./YoutubeModal";
import Timer from "./Timer";
import LaunchTimer from "./LaunchTimer";
import axios from "axios";
// import LaunchTimer from "./LaunchTimer";
// import LaunchTimerFTM from "./LaunchTimerFTM";

function MainSection() {
  const matches = useMediaQuery("(max-width:700px)");
  const AvaxContract1 = useAvaxContract();
  // const AvaxPriceContract1 = useAvaxPriceContract();
  const [currentPrice, setCurrentPrice] = useState(2091.36);
  const [totalStaked, setTotalStaked] = useState();
  const [open, setopen] = useState(false);
  const [launch, setlaunch] = useState(false);

  const init = async () => {
    // let dec = 18;
    // const price = await AvaxPriceContract1.getLatestPriceAvax();
    // setCurrentPrice((+formatUnits(price, dec)).toFixed(3));
    let priceInUsd = await axios
      .get(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      )
      .then((response) => {
        return response.data.ethereum.usd;
      });
    setCurrentPrice(priceInUsd.toFixed(3));

    const total = await AvaxContract1.totalStaked();
    setTotalStaked(+formatUnits(total, 18));
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Box py={10} bgcolor="#0F0F10">
      <YoutubeModal setopen={setopen} open={open} />

      <Container maxWidth="lg">
        <Box
          sx={{
            fontSize: { md: "100px ", sm: "70px", xs: "40px" },
            fontWeight: "600",
            fontFamily: "Inter",
            textAlign: "center",
            color: "#272727",
            mb: 4,
          }}
        >
          Stake and Earn
        </Box>
        <Grid
          container
          spacing={{ xs: 3, sm: 6 }}
          justifyContent={{ xs: "center", sm: "space-between" }}
        >
          <Grid item xs={12} sm={12} md={7}>
            <Box pr={{ xs: 0, sm: 2 }}>
              <Box
                fontWeight={400}
                fontSize={{ xs: "30px", sm: "44px" }}
                color="text.primary"
                fontFamily="Inter"
                lineHeight={{ xs: "auto", sm: "62px" }}
              >
                <i>First</i> ever opportunity to{" "}
                <span style={{ fontWeight: "700", letterSpacing: "3px" }}>
                  {" "}
                  stake{" "}
                </span>
                and get
                <span
                  style={{
                    fontWeight: "600",
                    marginLeft: "10px",
                    marginRight: "10px",
                    letterSpacing: "3px",
                  }}
                >
                  HIGH ROI
                </span>
                on
              </Box>

              <Box fontWeight={700} fontSize={{ xs: "30px", sm: "44px" }}>
                <Box
                  component="span"
                  fontWeight={700}
                  fontSize={{ xs: "30px", sm: "44px" }}
                  color="text.primary"
                  fontFamily="Inter"
                  lineHeight={{ xs: "auto", sm: "62px" }}
                  sx={{
                    background:
                      "linear-gradient(276deg, rgba(160,52,255,1) 0%, rgba(138,255,247,1) 86%)",
                    backgroundClip: "text",
                    textFillColor: "transparent",
                    marginRight: "10px",
                  }}
                >
                  Ethereum
                </Box>
                <span style={{ fontWeight: "400" }}>+ Get</span>
                <span style={{ color: "#A034FF", marginLeft: "10px" }}>
                  Free NFTs
                </span>
              </Box>
              <Box
                fontWeight={400}
                fontSize={{ xs: "16px", sm: "20px" }}
                color="#ffffff"
                my={1}
              >
                (invest from
                <Box
                  component="span"
                  fontFamily="Inter"
                  fontWeight={700}
                  ml={0.5}
                  color="#FFC34E"
                >
                  0.003 ETH.{" "}
                </Box>
                <Box component="span" fontStyle="italic">
                  No max limit
                </Box>{" "}
                )
              </Box>

              <Box>
                {!launch ? (
                  <>
                    <Typography
                      sx={{
                        pt: { xs: 2, sm: 3 },
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: " 400",
                        fontSize: " 18px",
                      }}
                    >
                      Launching in:
                    </Typography>
                    <Box
                      my={1}
                      sx={{
                        width: "max-content",
                        borderRadius: "8px",
                        backgroundImage:
                          " linear-gradient(#1B1B1C, #1B1B1C  ),linear-gradient(90deg, #8AFFF7 -1.72%, #A034FF 100%)",
                        backgroundOrigin: "border-box",
                        backgroundClip: "content-box, border-box",
                        padding: "1.5px",
                      }}
                    >
                      <Timer time={1682091000} setlaunch={setlaunch} />
                    </Box>
                  </>
                ) : (
                  <Box mt={4}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent={{ xs: "center", sm: "start" }}
                      gap={4}
                    >
                      <a
                        href="#plans"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          zIndex={1}
                          sx={{
                            background:
                              "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                            color: "#07071C",
                            cursor: "pointer",
                            p: "10px 30px",
                            borderRadius: "46px",
                            "&:hover": {
                              background: "#8AFFF7",
                            },
                          }}
                          ml={1}
                          fontWeight="700"
                          borderRadius="6px"
                          fontSize="18px"
                          color="#ffffff"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          letterSpacing="1%"
                        >
                          Stake ETH now
                        </Box>
                      </a>
                      <img src={icon} width="44px" alt="" />
                      <Box
                        sx={{
                          textTransform: "capitalize",
                          fontWeight: 500,
                          fontSize: matches ? "12px" : "15px",
                          "&:hover": {
                            color: "#8AFFF7",
                          },
                        }}
                      >
                        <a
                          style={{
                            color: "inherit",
                          }}
                          target="_blank"
                          href={`https://arbiscan.io/address/${AvaxAddress}`}
                        >
                          View Contract
                        </a>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Typography
              sx={{
                color: "#ffffff",
                fontFamily: "Inter",
                fontStyle: " normal",
                fontWeight: " 500",
                fontSize: "18px",
                lineHeight: "33px",
                mt: 2,
              }}
            >
              Return on investment:
            </Typography>

            <Box mt={1.5}>
              <Stack
                direction="row"
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ bgcolor: "rgba(255, 255, 255, 0.15)" }}
                  />
                }
                gap={2}
                justifyContent="center"
                alignItems="center"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.05)" }}
                py={3}
              >
                <Box
                  width={{ width: { md: "50%", xs: "100%" } }}
                  px={{ xs: 1.5, sm: 2 }}
                  borderRadius="6px"
                  mr={2}
                >
                  <Box
                    fontSize={{ xs: "12px", sm: "17px" }}
                    fontWeight={400}
                    color="text.secondary"
                  >
                    12 - 26 days
                  </Box>
                  <Box
                    fontSize={{ xs: "16px", sm: "18px" }}
                    fontWeight={700}
                    color="#FFC34E"
                  >
                    131.76% - 546.72%
                    {/* ${currentPrice ? currentPrice : "0.00"} */}
                  </Box>
                </Box>

                <Box
                  width={{ width: { md: "50%", xs: "100%" } }}
                  px={{ xs: 1.5, sm: 2 }}
                  borderRadius="6px"
                  mr={2}
                >
                  <Box
                    fontSize={{ xs: "12px", sm: "17px" }}
                    fontWeight={400}
                    color="text.secondary"
                  >
                    daily
                  </Box>
                  <Box
                    fontSize={{ xs: "16px", sm: "18px" }}
                    fontWeight={700}
                    color="#FFC34E"
                  >
                    10.98% - 21.08%
                    {/* ${currentPrice ? currentPrice : "0.00"} */}
                  </Box>
                </Box>
              </Stack>
            </Box>
            <Box display="flex" gap={2} mt={{ xs: 3, sm: 1.5 }}>
              <Box
                py={3}
                px={{ xs: 1.5, sm: 4 }}
                bgcolor="rgba(255, 255, 255, 0.05)"
                borderRadius="6px"
              >
                <Box
                  fontSize={{ xs: "12px", sm: "17px" }}
                  fontWeight={400}
                  color="text.primary"
                >
                  Current ETH price
                </Box>
                <Box
                  fontSize={{ xs: "16px", sm: "22px" }}
                  fontWeight={700}
                  color="#8AFFF7"
                >
                  {/* $1776.00 */}${currentPrice ? currentPrice : "0.00"}
                </Box>
              </Box>
              <Box
                py={3}
                px={{ xs: 1.5, sm: 3 }}
                bgcolor="rgba(255, 255, 255, 0.05)"
                borderRadius="6px"
              >
                <Box
                  fontSize={{ xs: "12px", sm: "17px" }}
                  fontWeight={400}
                  color="text.primary"
                >
                  Total Staked ETH so far
                </Box>
                <Box
                  fontSize={{ xs: "16px", sm: "22px" }}
                  fontWeight={700}
                  color="#8AFFF7"
                >
                  {/* $0.000 */}$
                  {totalStaked
                    ? (totalStaked * currentPrice).toFixed(3)
                    : "0.000"}
                </Box>
              </Box>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              gap={2}
              mt={{ xs: 3, sm: 6 }}
            >
              <Box>
                <img src={youtube} alt="youtube icon" srcset="" />
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: "500",
                    // borderBottom: "1px solid #ffffff",
                    cursor: "pointer",
                    textDecoration: "underline",
                    "&:hover": {
                      color: "#8AFFF7",
                    },
                  }}
                  onClick={() => setopen(true)}
                >
                  Welcome Youtubers! An exciting challenge awaits you.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/*  ----------------upto 10 NFt drop----------------------------- */}

        <Box pt={{ xs: 8, sm: 15 }}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  background: "#E7E0F4",
                  borderRadius: "10px",
                  pl: { xs: "2rem", sm: "4rem" },
                  p: { xs: "2rem" },
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    fontFamily: "Inter",
                    fontSize: { sm: "28px", xs: "16px" },
                    lineHeight: "36px",
                    fontWeight: "700",
                    color: "#0F0F10",
                  }}
                >
                  Upto 12 NFT airdrops{" "}
                  <Box
                    sx={{
                      fontFamily: "Inter",
                      fontSize: { sm: "28px", xs: "16px" },
                      lineHeight: "36px",
                      fontWeight: "400",
                      color: "#0F0F10",
                    }}
                  >
                    {" "}
                    on your staked ETH{" "}
                  </Box>
                </Box>

                <Typography
                  sx={{
                    mt: 2,
                    fontFamily: "Inter",
                    fontSize: { sm: "16px", xs: "12px" },
                    fontWeight: "400",
                    lineHeight: "24px",
                    color: "#0F0F10",
                    letterSpacing: "0.01em",
                  }}
                >
                  Stake your ETH and get up to 12 free NFT airdrops exclusively
                  from the Turbo ETH NFT collection
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    fontFamily: "Inter",
                    fontSize: { sm: "15px", xs: "12px" },
                    fontWeight: "400",
                    lineHeight: "24px",
                    color: "#0F0F10",
                    letterSpacing: "0.01em",
                  }}
                >
                  *NFTs will be airdroped within 10 days after staking the ETH
                </Typography>

                <Box
                  mt={2}
                  bgcolor="#D9CDF0"
                  border="1px solid #D0C0EE"
                  borderRadius="20px"
                  display={"flex"}
                  alignItems={"center"}
                  p={0.5}
                  width="fit-content"
                >
                  <img src={collection} width="35px" alt="collection" />
                  <Typography
                    sx={{
                      ml: 1,
                      pr: 2,
                      fontFamily: "Inter",
                      fontSize: { sm: "15px", xs: "12px" },
                      fontWeight: "500",
                      lineHeight: "30px",
                      color: "#0F0F10",
                    }}
                  >
                    <Box component="span" color="#FF0000">
                      *
                    </Box>
                    Collection will be activated on 30th April
                  </Typography>
                </Box>
                <Box py={3}>
                  <img src={airdrop} width="100%" alt="airdrop" />
                </Box>
              </Box>
            </Grid>
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.06)",
                  borderRadius: "10px",
                  padding: { xs: "2rem", sm: "4rem" },
                  height: "100%",
                }}
              >
                <Box
                  fontSize={{ xs: "14px", sm: "24px" }}
                  color="#ffffff"
                  letterSpacing="1%"
                  fontWeight={400}
                >
                  <Box fontWeight={700} fontSize={{ xs: "16px", sm: "28px" }}>
                    Quick Note
                  </Box>
                  before investing
                </Box>

                <ol style={{ paddingInlineStart: "20px" }}>
                  {[
                    "ETH will be staked on the Arbitrum Chain with minimum stake of 0.003 ETH",
                    "Force withdraw is available for Locked 22, 26 days and 5 days reinvest plan. ",
                    "If you don't withdraw everyday, you will get a hold bonus of 0.3% every 2 days. Maximum up to 3%. If you withdraw, hold bonus will reset to 0.",
                    "Reinvest your earnings in the exclusive 5 days locked plan with a daily interest of 35% and ROI of 175%",
                    "We recommend staking 60% in 26 days unlocked plan and 40% in 26 days locked plan OR stake in any of the the unlocked plans and reinvest daily.",
                    "Get up to 12 free NFT airdrops.",
                    "Access to Audit, Whitepaper and Contract has been enabled.",
                  ].map((val, i) => (
                    <li
                      style={{
                        fontSize: matches ? "12px" : "16px",
                        fontWeight: 400,
                        letterSpacing: "1%",
                        lineHeight: "24px",
                        margin: "1.5rem 0px",
                      }}
                    >
                      {val}
                    </li>
                  ))}
                </ol>
                {/* <Box
                  sx={{
                    background:
                      "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                    cursor: "pointer",
                    borderRadius: "46px",
                  }}
                  ml={1}
                  mt={2}
                  width="125px"
                  height="44px"
                  fontWeight="700"
                  borderRadius="6px"
                  fontSize="18px"
                  color="#ffffff"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  letterSpacing="1%"
                >
                  Get Started
                </Box> */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default MainSection;
