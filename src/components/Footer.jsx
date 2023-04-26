import React, { useState } from "react";
import { Box } from "@mui/material";
import RiskModal from "./RiskModal";

function Footer() {
  const [open, setopen] = useState(false);

  return (
    <>
      <RiskModal setopen={setopen} open={open} />
      <Box
        textAlign="center"
        fontSize={{ xs: "11px", sm: "16px" }}
        fontWeight={400}
        mt={15}
        py={2}
        color="text.secondary"
      >
        © Copyright 2023 Turbo ETH. All Rights Reserved.{" "}
        <Box
          component="span"
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "#ffffff",
            "&:hover": {
              color: "#8AFFF7",
            },
          }}
          onClick={() => setopen(true)}
        >
          Disclaimer
        </Box>
      </Box>
    </>
  );
}

export default Footer;
