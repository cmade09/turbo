import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { Box, Divider, Stack, Typography } from "@mui/material";

export default function TimerCountDown({ time }) {
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
      {countTime.time_days}:{countTime.time_Hours}:{countTime.time_Minuts}:
      {countTime.time_seconds}
    </>
  );
}
