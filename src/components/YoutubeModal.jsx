import React from "react";
import { Dialog, DialogContent, Box, useMediaQuery } from "@mui/material";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import youtube from "../assets/youtube.png";

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
function YoutubeModal({ open, setopen }) {
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
          <Box my={3} mx={{ xs: 1, sm: 5 }}>
            <img
              src={youtube}
              width={matches ? "50px" : "66.78px"}
              height={matches ? "40px" : "48px"}
              alt=""
            />
            <Box
              fontSize={{ xs: "14px", sm: "18px" }}
              fontWeight={600}
              letterSpacing="1%"
              color="#000"
              mt={3}
            >
              Youtube and Referral Contest
            </Box>
            <Box
              fontSize={{ xs: "12px", sm: "15px" }}
              fontWeight={400}
              letterSpacing="1%"
              width={{ xs: "100%", sm: "70%" }}
              color="#000"
              my={2}
            >
              Make a review of Turbo ETH and stand a chance to win 3 ETH.
              <br />
              Refer your friends and stand a chance to win 2 ETH
            </Box>
            <Box
              fontSize={{ xs: "14px", sm: "18px" }}
              fontWeight={600}
              letterSpacing="1%"
              color="#000"
              mt={4}
            >
              Youtube Contest
            </Box>
            <ol style={{ paddingInlineStart: "22px", color: "#000" }}>
              <li
                style={{
                  fontSize: matches ? "12px" : "15px",
                  fontWeight: 400,
                  letterSpacing: "1%",
                  lineHeight: "24px",
                  margin: "6px 0px",
                }}
              >
                A total of 3 ETH will be given out as rewards in this contest.
              </li>
              <li
                style={{
                  fontSize: matches ? "12px" : "15px",
                  fontWeight: 400,
                  letterSpacing: "1%",
                  lineHeight: "24px",
                  margin: "6px 0px",
                }}
              >
                The rewards will be as follows:
                <ul
                  type="circle"
                  style={{ paddingInlineStart: "22px", color: "#000" }}
                >
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.8 ETH for video with highest number of views, likes and
                    comments
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.6 ETH for video with second highest number of views, likes
                    and comments
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.4 ETH for video with third highest number of views, likes
                    and comments
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.25 ETH for video with fourth highest number of views,
                    likes and comments
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.15 ETH for video with fifth highest number of views, likes
                    and comments
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.1 ETH for videos with 6-10 highest number of views, likes
                    and comments
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.06 ETH for videos with 11-20 highest number of views,
                    likes and comments
                  </li>
                </ul>
              </li>
              <li
                style={{
                  fontSize: matches ? "12px" : "15px",
                  fontWeight: 400,
                  letterSpacing: "1%",
                  lineHeight: "24px",
                  margin: "6px 0px",
                }}
              >
                The description of the video must have a link to the official
                Turbo ETH website
              </li>
              <li
                style={{
                  fontSize: matches ? "12px" : "15px",
                  fontWeight: 400,
                  letterSpacing: "1%",
                  lineHeight: "24px",
                  margin: "6px 0px",
                }}
              >
                Youtubers need to invest at least 0.03 ETH to be eligible
              </li>
              <li
                style={{
                  fontSize: matches ? "12px" : "15px",
                  fontWeight: 400,
                  letterSpacing: "1%",
                  lineHeight: "24px",
                  margin: "6px 0px",
                }}
              >
                Send your video links to{" "}
                <span style={{ color: "#A034FF", fontWeight: 600 }}>
                  @TheETHking
                </span>{" "}
                on Telegram or our discord along with your wallet address
              </li>
            </ol>
            <Box
              fontSize={{ xs: "14px", sm: "18px" }}
              fontWeight={600}
              letterSpacing="1%"
              color="#000"
              mt={4}
            >
              Referral Contest
            </Box>
            <ol style={{ paddingInlineStart: "22px", color: "#000" }}>
              <li
                style={{
                  fontSize: matches ? "12px" : "15px",
                  fontWeight: 400,
                  letterSpacing: "1%",
                  lineHeight: "24px",
                  margin: "6px 0px",
                }}
              >
                A total of 2 ETH will be given out as reward in this contest.
              </li>
              <li
                style={{
                  fontSize: matches ? "12px" : "15px",
                  fontWeight: 400,
                  letterSpacing: "1%",
                  lineHeight: "24px",
                  margin: "6px 0px",
                }}
              >
                The rewards will be given out as follows:
                <ul
                  type="circle"
                  style={{ paddingInlineStart: "22px", color: "#000" }}
                >
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.7 ETH for referrer with highest number of staked ETH
                    through referrals
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.5 ETH for referrer with second highest staked ETH through
                    referrals
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.3 ETH for referrer with third highest staked ETH through
                    referrals
                  </li>
                  <li
                    style={{
                      fontSize: matches ? "12px" : "15px",
                      fontWeight: 400,
                      letterSpacing: "1%",
                      lineHeight: "24px",
                      margin: "6px 0px",
                    }}
                  >
                    0.5 ETH for referrer with most number of referred users
                  </li>
                </ul>
                <li
                  style={{
                    fontSize: matches ? "12px" : "15px",
                    fontWeight: 400,
                    letterSpacing: "1%",
                    lineHeight: "24px",
                    margin: "6px 0px",
                  }}
                >
                  Referrers need to invest at least 0.03 ETH to be eligible for
                  this contest
                </li>
                <li
                  style={{
                    fontSize: matches ? "12px" : "15px",
                    fontWeight: 400,
                    letterSpacing: "1%",
                    lineHeight: "24px",
                    margin: "6px 0px",
                  }}
                >
                  The rewards will be given out 21 days after launch.
                </li>
              </li>
            </ol>
            <Box
              fontSize={{ xs: "12px", sm: "15px" }}
              fontWeight={400}
              letterSpacing="1%"
              width={{ xs: "100%", sm: "70%" }}
              color="#000"
              my={2}
            >
              <Box component="span" fontWeight={700}>
                Note:
              </Box>{" "}
              If the total amount of ETH staked through referrals is less than
              $65000, then the contest will be void.
              <br />
              <br />
              The rewards will be given out 22 days after launch.
            </Box>
          </Box>
        </div>
      </DialogContent>
    </StyledModal>
  );
}

export default YoutubeModal;
