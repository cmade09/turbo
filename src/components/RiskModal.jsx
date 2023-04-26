import React from "react";
import {
  Dialog,
  DialogContent,
  Box,
  useMediaQuery,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const StyledModal = withStyles((theme) => ({
  root: {
    "& .MuiDialog-root": {
      zIndex: "1301 !important",
    },
    "&.MuiDialog-container": {
      overflowX: "hidden !important",
    },
    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: "tranparent !important",
      height: "auto",
      boxShadow: "0px 0px 13px 0px  rgb(0, 0 ,0)",
      borderRadius: "6px !important",
      maxWidth: "900px !important",
      overflowX: "hidden !important",
    },
    "& .dialoge__content__section": {
      background: "#FFF 0% 0% no-repeat padding-box",
      border: "1px solid #fff",
      borderRadius: "6px",
      padding: "10px",
      overflowX: "hidden !important",
    },
  },
}))(Dialog);
function RiskModal({ open, setopen }) {
  const matches = useMediaQuery("(max-width:760px)");

  const handleClose = () => {
    setopen(false);
  };
  return (
    <StyledModal
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContent className="dialoge__content__section">
        <div
          style={{
            paddingBottom: "30px",
            width: matches ? "270px" : "840px",
            overflowX: "hidden",
          }}
        >
          <Box display="flex" justifyContent="end">
            <CloseIcon
              onClick={handleClose}
              style={{
                color: "#888888",
                textAlign: "right",
                fontSize: "20px",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box my={3} mx={{ xs: 1, sm: 12 }}>
            <Box
              fontSize={{ xs: "14px", sm: "18px" }}
              fontWeight={600}
              letterSpacing="1%"
              color="#000"
              textAlign="center"
              mt={3}
            >
              High Risk Investment
            </Box>
            <Box
              fontSize={{ xs: "12px", sm: "15px" }}
              fontWeight={400}
              letterSpacing="1%"
              color="#000"
              my={5}
            >
              Investing in Turbo ETH carries a high level of risk, and may not
              be suitable for all investors. Before deciding to invest in Turbo
              ETH you should carefully consider your investment objectives,
              level of experience, and risk appetite. The possibility exists
              that you could sustain a loss of some or all of your initial
              investment and therefore you should not invest money that you
              cannot afford to lose. You should be aware of all the risks
              associated with high-risk projects such as Turbo ETH, and seek
              advice from an independent financial advisor.
              <br />
              <br /> Turbo ETH will not accept liability for any loss or damage,
              including without limitation to, any loss of profit, which may
              arise directly or indirectly from use of or reliance on such
              information.
              <br />
              <br /> Turbo ETH makes no representation or warranties as to the
              accuracy and or timelines of the information contained herein. A
              qualified professional should be consulted before making any
              financial decisions.
            </Box>
          </Box>
        </div>
      </DialogContent>
    </StyledModal>
  );
}

export default RiskModal;
