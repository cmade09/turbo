import React from "react";
import { Dialog, DialogContent, Box, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function NetworkChange({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const networkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xA4B1" }],
      });
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="modal__main__container">
        <Dialog
          open={open}
          keepMounted
          TransitionComponent={Transition}
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent
            className="dialoge__content__section"
            style={{
              borderImage: " linear-gradient(#8AFFF7, #A034FF) 30 ",
              borderWidth: "1px",
              borderRadius: "10px",
              borderStyle: "solid",
              background: "#000",
              boxShadow: "0px 0px 13px rgba(182, 0, 211, 0.7)",
            }}
          >
            <Box component="h3" color="#fff">
              <Box component="span" color="red" fontSize="30px">
                Error!
              </Box>{" "}
              You are on the incorrect network, please switch your network and
              try again.{" "}
            </Box>
            <Box textAlign="center">
              <Box
                sx={{
                  background:
                    "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                  color: "#07071C",
                  boxShadow: "0px 0px 13px rgba(182, 0, 211, 0.7)",
                  borderRadius: "34px",
                  padding: "15px 20px",
                  border: "none",
                  outline: "none",
                  width: "max-content",
                  mx: "auto",
                  cursor: "pointer",
                  fontSize: "16px",
                  lineHeight: "19px",
                  fontWeight: "bolder",
                  textTransform: "uppercase",
                  "&:hover": {
                    background: "#8AFFF7",
                  },
                }}
                onClick={() => networkHandler()}
              >
                Switch Network
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
        {/* </Slide> */}
      </div>
    </div>
  );
}

export default NetworkChange;
