import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Box, Divider, Stack, Typography } from "@mui/material";

export default function TimerCountDown({ time, setlaunch }) {
  let interval = useRef();
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
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minuts = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        setlaunch(true);
        clearInterval(interval.current);
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
    <>
      <Stack
        sx={{
          padding: { xs: "1rem 1rem", sm: "1rem 2rem" },
        }}
        justifyContent="center"
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: "rgba(255, 255, 255, 0.15)" }}
          />
        }
        gap={{ xs: 2, sm: 3 }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{
              color: "#8AFFF7",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 700",
              fontSize: " 38px",
            }}
          >
            {countTime.time_days}
          </Typography>
          <Typography
            color="#999999"
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 600",
              fontSize: " 13px",
            }}
          >
            Days
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{
              color: "#91BEFA",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 700",
              fontSize: " 38px",
            }}
          >
            {countTime.time_Hours}
          </Typography>
          <Typography
            color="#999999"
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 600",
              fontSize: " 13px",
            }}
          >
            HOURS
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{
              color: "#959BFB",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 700",
              fontSize: " 38px",
            }}
          >
            {countTime.time_Minuts}
          </Typography>
          <Typography
            color="#999999"
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 600",
              fontSize: " 13px",
            }}
          >
            MINUTES
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            sx={{
              color: "#A034FF",
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 700",
              fontSize: " 38px",
            }}
          >
            {countTime.time_seconds}
          </Typography>
          <Typography
            color="#999999"
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 600",
              fontSize: " 13px",
            }}
          >
            SECONDS
          </Typography>
        </Box>
      </Stack>
    </>
  );
}
