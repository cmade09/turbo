import React, { useState, useContext } from "react";
import { Box, Container, useMediaQuery, Grid, Hidden } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../utils/utils";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { Paper } from "@mui/material";
import { AvaxAddress } from "../Connectivity/Environment";
import twitter from "../assets/twitter.svg";
import discord from "../assets/discord.svg";
import telegram from "../assets/telegram.svg";
import logo from "../assets/logo.svg";

const useStyles = makeStyles({
  list: {
    width: 250,
    paddingTop: "70px",
  },
  fullList: {
    width: "auto",
    alignItems: "center",
  },
  paper: {
    background: "#000 !important",
    justifyContent: "space-between",
  },
  hover: {
    "&:hover": {
      color: "#8AFFF7",
    },
  },
});

function Navbar() {
  const classes = useStyles();
  const [active, setactive] = useState(0);
  const [state, setState] = useState(false);
  const { account, connect, disconnect } = useContext(AppContext);
  const matches = useMediaQuery("(max-width:960px)");

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box
        mb={5}
        display="flex"
        gap={1}
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <img src={logo} alt="log" />
        </Box>
        <Box
          fontFamily="Inter"
          fontWeight={300}
          fontSize={matches ? "25px" : "30px"}
          color="#8AFFF7"
        >
          <Box component="span" fontWeight={700} color="#A034FF" mr={0.5}>
            Turbo
          </Box>
          ETH
        </Box>
      </Box>
      <List>
        {[
          <a
            href="https://the-stamp.com/2023/04/turboeth"
            target="_blank"
            rel=" noreferrer"
            style={{
              textDecoration: "none",
              color: "#999999",
            }}
            onClick={() => setactive(0)}
          >
            <Box>Audit</Box>
          </a>,
          <a
            href="./whitepaper.pdf"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "#999999",
            }}
            onClick={() => setactive(1)}
          >
            <Box>Whitepaper</Box>
          </a>,

          <a
            href="https://arbiscan.io/address/0x134A62A5C11809A149Fe90c0b78C2953f39874Af"
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: "none",
              color: "#999999",
            }}
            onClick={() => setactive(2)}
          >
            <Box>Contract</Box>
          </a>,
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            mt={2}
          >
            <a
              href="https://twitter.com/TurboETHminer"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "#fff",
                marginRight: "20px",
              }}
            >
              <Box>
                <img src={twitter} width="27px" alt="" />
              </Box>
            </a>

            <a
              href="https://discord.com/invite/7Cb8JbqnQF"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "#fff",
                marginRight: "20px",
              }}
            >
              <Box>
                <img src={discord} width="22px" alt="" />
              </Box>
            </a>

            <a
              href="https://t.me/TurboETH"
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration: "none",
                color: "#fff",
                marginRight: "20px",
              }}
            >
              <Box
              // sx={{
              //   background:
              //     "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
              //   borderRadius: "3px",
              //   padding: "8px",
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   "&:hover": {
              //     background: "#EB3A5A",
              //   },
              // }}
              >
                <img src={telegram} width="24px" alt="" />
              </Box>
            </a>
          </Box>,
        ].map((text, index) => (
          <ListItem
            button
            style={{
              justifyContent: "center",
            }}
            key={text}
          >
            <ListItemText
              className={classes.hover}
              sx={{
                textTransform: "capitalize",
                textAlign: "center",
                textDecoration: "none",
                cursor: "pointer",
                color: "#ffffff",
                fontSize: "15px",
                fontWeight: 600,
              }}
              primary={text}
            />
          </ListItem>
        ))}
      </List>
      <Box mt={5} display="flex" justifyContent="center">
        {account ? (
          <Box
            sx={{
              background: "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
              cursor: "pointer",
              borderRadius: "46px",
              "&:hover": {
                background: "#8AFFF7",
              },
            }}
            width="117px"
            height="44px"
            fontWeight="700"
            borderRadius="6px"
            fontSize="18px"
            color="#ffffff"
            display="flex"
            justifyContent="center"
            alignItems="center"
            letterSpacing="1%"
            onClick={() => disconnect()}
            style={{ zIndex: 1 }}
          >
            {account.slice(0, 4) + "..." + account.slice(-4)}
          </Box>
        ) : (
          <Box
            zIndex={1}
            sx={{
              background: "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
              cursor: "pointer",
              borderRadius: "46px",
              "&:hover": {
                background: "#8AFFF7",
              },
            }}
            width="117px"
            height="44px"
            fontWeight="700"
            borderRadius="6px"
            fontSize="18px"
            color="#ffffff"
            display="flex"
            justifyContent="center"
            alignItems="center"
            letterSpacing="1%"
            onClick={() => connect()}
          >
            Connect
          </Box>
        )}
      </Box>
    </div>
  );

  return (
    <Box position="relative">
      <Box
        bgcolor="#0F0F10"
        height="100px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderBottom="1px solid #353535"
      >
        <Container maxWidth="lg">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexBasis={matches ? "100%" : "26%"}
            >
              <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
              >
                <Grid item>
                  <Box display="flex" gap={1.5}>
                    <Box>
                      <img src={logo} alt="logo" />
                    </Box>
                    <Box
                      fontFamily="Inter"
                      fontWeight={700}
                      fontSize={matches ? "25px" : "30px"}
                      color="#8AFFF7"
                    >
                      <Box
                        component="span"
                        fontWeight={700}
                        sx={{
                          color: "#A034FF",
                          mr: 1,
                        }}
                      >
                        Turbo
                      </Box>
                      ETH
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box display={{ xs: "none", sm: "block" }}>
              <Hidden mdDown>
                <Box
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <a
                    href="https://the-stamp.com/2023/04/turboeth"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: "none",
                      // color: "",
                    }}
                  >
                    <Box
                      className={classes.hover}
                      fontWeight={500}
                      fontSize="18px"
                      mr={5}
                      color="#999999"
                    >
                      Audit
                    </Box>
                  </a>

                  <a
                    href="./whitepaper.pdf"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      // color: "",
                    }}
                  >
                    <Box
                      className={classes.hover}
                      fontWeight={400}
                      fontSize="18px"
                      mr={5}
                      color="#999999"
                      onClick={() => setactive(1)}
                    >
                      Whitepaper
                    </Box>
                  </a>

                  <a
                    href="https://arbiscan.io/address/0x134A62A5C11809A149Fe90c0b78C2953f39874Af"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      // color: "",
                    }}
                  >
                    <Box
                      className={classes.hover}
                      fontWeight={400}
                      fontSize="18px"
                      mr={5}
                      color={"#999999"}
                      onClick={() => setactive(2)}
                    >
                      Contract
                    </Box>
                  </a>
                </Box>
              </Hidden>
            </Box>

            <Box display={{ xs: "none", sm: "block" }}>
              <Hidden mdDown>
                <Box
                  display="flex"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <a
                    href="https://twitter.com/TurboETHminer"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      marginRight: "20px",
                    }}
                  >
                    <Box>
                      <img src={twitter} width="27px" alt="" />
                    </Box>
                  </a>

                  <a
                    href="https://discord.com/invite/7Cb8JbqnQF"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      marginRight: "20px",
                    }}
                  >
                    <Box>
                      <img src={discord} width="22px" alt="" />
                    </Box>
                  </a>

                  <a
                    href="https://t.me/TurboETH"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: "none",
                      color: "#fff",
                      marginRight: "20px",
                    }}
                  >
                    <Box
                    // sx={{
                    //   background:
                    //     "linear-gradient(90deg, #EA3B55 0%, #F808E7 100%)",
                    //   borderRadius: "3px",
                    //   padding: "8px",
                    //   display: "flex",
                    //   justifyContent: "center",
                    //   alignItems: "center",
                    //   "&:hover": {
                    //     background: "#EB3A5A",
                    //   },
                    // }}
                    >
                      <img src={telegram} width="24px" alt="" />
                    </Box>
                  </a>

                  {account ? (
                    <Box
                      zIndex={1}
                      sx={{
                        background:
                          "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                        color: "#07071C",
                        cursor: "pointer",
                        borderRadius: "46px",
                        "&:hover": {
                          background: "#8AFFF7",
                        },
                      }}
                      width="123px"
                      height="44px"
                      fontWeight="700"
                      borderRadius="6px"
                      fontSize="18px"
                      color="#ffffff"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      letterSpacing="1%"
                      ml={1}
                      onClick={() => disconnect()}
                    >
                      {account.slice(0, 4) + "..." + account.slice(-4)}
                    </Box>
                  ) : (
                    <Box
                      zIndex={1}
                      sx={{
                        background:
                          "linear-gradient(90deg, #8AFFF7 0%, #A034FF 100%)",
                        color: "#07071C",
                        cursor: "pointer",
                        borderRadius: "46px",
                        "&:hover": {
                          background: "#8AFFF7",
                        },
                      }}
                      ml={1}
                      width="117px"
                      height="44px"
                      fontWeight="700"
                      borderRadius="6px"
                      fontSize="18px"
                      color="#ffffff"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      letterSpacing="1%"
                      onClick={() => connect()}
                    >
                      Connect
                    </Box>
                  )}
                </Box>
              </Hidden>
            </Box>
            <Hidden mdUp>
              {["left"].map((anchor) => (
                <React.Fragment key={anchor}>
                  <Button
                    onClick={toggleDrawer(anchor, true)}
                    style={{ zIndex: 1, justifyContent: "end", width: "100%" }}
                  >
                    <MenuIcon
                      style={{
                        fontSize: "38px",
                        cursor: "pointer",
                        color: "#fff",
                      }}
                    ></MenuIcon>
                  </Button>
                  <Paper style={{ background: "#1C0D38" }}>
                    <SwipeableDrawer
                      classes={{ paper: classes.paper }}
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </Paper>
                </React.Fragment>
              ))}
            </Hidden>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Navbar;
