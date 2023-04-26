import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import moment from "moment";
import link from "../assets/link.svg";
import bnb from "../assets/bnb.png";

function LaunchTimer({ setlaunch }) {
  let interval = useRef();
  // let time = 1654005600;
  let time = 1681260826;

  const [countTime, setCountDateTime] = useState({
    time_days: 0,
    time_Hours: 0,
    time_Minuts: 0,
    time_seconds: 0,
  });

  const startTime = async (time) => {
    interval = setInterval(() => {
      var jun = moment().utc().format("x");

      let untilTime = moment.unix(time).utc().format("x");
      const distance = +untilTime - +jun;
      // console.log(distance, "distance");
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minuts = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
        setlaunch(true);
      } else {
        setCountDateTime({
          ...countTime,
          time_days: days,
          time_Hours: hours,
          time_Minuts: minuts,
          time_seconds: seconds,
        });
      }
    }, 1000);
  };
  useEffect(() => {
    if (time) {
      startTime(+time);
    }
  }, [time]);
  return (
    <Box mt={5}>
      <Box
        width={{ xs: "100%", sm: "491px" }}
        sx={{
          borderRadius: "6px",
          border: "1px transparent",
          backgroundImage:
            " linear-gradient(#1f1f1f, #1f1f1f),linear-gradient(90deg, #FE9E05 -1.72%, #FEF314 100%)",
          backgroundOrigin: "border-box",
          backgroundClip: "content-box, border-box",

          // "linear-gradient(#1f1f1f, #1f1f1f), linear-gradient(90deg, #E93C50 -1.72%, #F806EF 100%)",
        }}
        padding="1px"
      >
        <Box
          fontFamily="Roboto"
          textAlign="center"
          fontWeight={300}
          fontSize="40px"
          my={1}
        >
          <Box
            component="span"
            fontWeight={700}
            sx={{
              background: "linear-gradient(90deg, #FE9E05 0%, #FEF314 33.82%)",
              backgroundClip: "text",
              textFillColor: "transparent",
            }}
          >
            BSC{" "}
          </Box>
          Fortune
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
          <a
            href="http://www.bscfortune.com/"
            target="_blank"
            rel="noreferrer"
            style={{ marginRight: "10px", color: "#36FF8C" }}
          >
            BSCfortune.com
          </a>
          <img width="18px" height="18px" src={link} alt="" />
        </Box>
        <Box px={4}>
          <hr
            style={{
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          my={2.5}
        >
          <img width="30px" height="30px" src={bnb} alt="" />
          <Box fontSize="26px" fontWeight="400">
            Invest from 0.03{" "}
            <Box
              component="span"
              fontWeight={700}
              sx={{
                background:
                  "linear-gradient(90deg, #FE9E05 0%, #FEF314 33.82%)",
                backgroundClip: "text",
                textFillColor: "transparent",
              }}
            >
              BNB
            </Box>
          </Box>
        </Box>

        {/* <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2}
          px={8}
        >
          <Box>
            <Box
              fontSize={{ xs: "28px", sm: "38px" }}
              fontWeight={500}
              letterSpacing="3%"
              textAlign="center"
              color="#FE9F06"
            >
              {countTime.time_days}
            </Box>
            <Box
              fontSize={{ xs: "11px", sm: "13px" }}
              fontWeight={600}
              letterSpacing="3%"
              textAlign="center"
              color="text.secondary"
            >
              DAYS
            </Box>
          </Box>
          <hr
            style={{
              border: "0.5px solid rgba(255, 255, 255, 0.15)",
              height: "70px",
            }}
          />
          <Box>
            <Box
              fontSize={{ xs: "28px", sm: "38px" }}
              fontWeight={500}
              letterSpacing="3%"
              textAlign="center"
              color="#FEBD0B"
            >
              {countTime.time_Hours}
            </Box>
            <Box
              fontSize={{ xs: "11px", sm: "13px" }}
              fontWeight={600}
              letterSpacing="3%"
              textAlign="center"
              color="text.secondary"
            >
              HOURS
            </Box>
          </Box>
          <hr
            style={{
              border: "0.5px solid rgba(255, 255, 255, 0.15)",
              height: "70px",
            }}
          />
          <Box>
            <Box
              fontSize={{ xs: "28px", sm: "38px" }}
              fontWeight={500}
              letterSpacing="3%"
              textAlign="center"
              color="#FED50F"
            >
              {countTime.time_Minuts}
            </Box>
            <Box
              fontSize={{ xs: "11px", sm: "13px" }}
              fontWeight={600}
              letterSpacing="3%"
              textAlign="center"
              color="text.secondary"
            >
              MINUTES
            </Box>
          </Box>
          <hr
            style={{
              border: "0.5px solid rgba(255, 255, 255, 0.15)",
              height: "70px",
            }}
          />
          <Box>
            <Box
              fontSize={{ xs: "28px", sm: "38px" }}
              fontWeight={500}
              letterSpacing="3%"
              textAlign="center"
              color="#FEF013"
            >
              {countTime.time_seconds}
            </Box>
            <Box
              fontSize={{ xs: "11px", sm: "13px" }}
              fontWeight={600}
              letterSpacing="3%"
              textAlign="center"
              color="text.secondary"
            >
              SECONDS
            </Box>
          </Box>
        </Box> */}
      </Box>
      {/* <LaunchTimer endTime="1651039011" /> */}
    </Box>
  );
}

export default LaunchTimer;
