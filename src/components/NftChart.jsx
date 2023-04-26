import React from "react";
import {
  Box,
  Container,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";

import airdroplogo from "../assets/airdroplogo.png";

const NftChart = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      background: "#29292A",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    borderBottom: "2px solid rgba(255, 255, 255, 0.05)",
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "",
      color: "black",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
    borderBottom: "2px solid rgba(255, 255, 255, 0.05)",
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    ["12 days", 0, 0, 1, 2, 2, 3, 3, 5, 5, 7],
    ["16 days", 0, 1, 2, 3, 3, 4, 4, 6, 6, 8],
    ["22 days", 0, 1, 2, 4, 3, 5, 4, 8, 7, 10],
    ["26 days", 1, 1, 3, 5, 4, 6, 6, 10, 8, 12],
  ];

  return (
    <Box py={5}>
      <Container maxWidth="md">
        <Box textAlign="center">
          <img src={airdroplogo} alt="air" width="87px" height="87px" />
        </Box>

        <Box mt={2}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 700",
              fontSize: { md: "28px", xs: "20px" },
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            NFT airdrop chart
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 400",
              fontSize: { md: "28px", xs: "20px" },
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            as per your staked ETH
          </Typography>
        </Box>
        <Box mt={3}>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 400",
              fontSize: { md: "16px", xs: "14px" },
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            The chart below shows the number of NFTs that would be
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter",
              fontStyle: "normal",
              fontWeight: " 400",
              fontSize: { md: "16px", xs: "14px" },
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            airdroped as per the staked ETH amount
          </Typography>
        </Box>

        <Box py={5}>
          <TableContainer sx={{ borderRadius: "10px" }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead sx={{ background: "rgba(255, 255, 255, 0.05)" }}>
                <TableRow>
                  <StyledTableCell colspan="6">
                    <Box
                      textAlign="center"
                      fontSize="14px"
                      fontWeight="400"
                      fontFamily="Inter"
                      color="#ffffff"
                    >
                      <span style={{ color: "#FFC34E" }}>Amount</span> (unlocked
                      / <span style={{ color: "#8AFFF7" }}>locked</span> )
                    </Box>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell
                    align="left"
                    sx={{ color: "#FFC34E !important", width: "135px" }}
                  >
                    Plans
                  </StyledTableCell>
                  <StyledTableCell
                    align="left"
                    sx={{ color: "#FFC34E !important" }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      gap={0.1}
                      justifyContent="center"
                    >
                      <ChevronLeft />
                      <Box>0.05 ETH</Box>
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ color: "#FFC34E !important" }}
                  >
                    <Box>0.05 - 0.1 ETH</Box>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ color: "#FFC34E !important" }}
                  >
                    0.1 - 0.5 ETH{" "}
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ color: "#FFC34E !important" }}
                  >
                    0.5 - 0.1 ETH
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    sx={{ color: "#FFC34E !important" }}
                  >
                    1 + ETH
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ bgcolor: "#1E1E1F" }}>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell
                      align="left"
                      sx={{
                        // padding: "0px 0px",
                        // borderRight: "2px solid black",
                        backgroundColor: "#29292A",
                        color: "#FFC34E !important",
                        fontSize: "1.1rem",
                      }}
                      component="th"
                      scope="row"
                    >
                      {row[0]}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        justifyContent="center"
                      >
                        <Box
                          sx={{
                            border: "0.5px solid #ffffff",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[1]}
                        </Box>
                        <Box
                          sx={{
                            border: "0.5px solid #8AFFF7",
                            color: "#8AFFF7",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[2]}
                        </Box>
                      </Box>
                      {/* {row.calories} */}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* {row.fat} */}
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        justifyContent="center"
                      >
                        <Box
                          sx={{
                            border: "0.5px solid #ffffff",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[3]}
                        </Box>
                        <Box
                          sx={{
                            border: "0.5px solid #8AFFF7",
                            color: "#8AFFF7",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[4]}
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* {row.carbs}
                       */}
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        justifyContent="center"
                      >
                        <Box
                          sx={{
                            border: "0.5px solid #ffffff",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[5]}
                        </Box>
                        <Box
                          sx={{
                            border: "0.5px solid #8AFFF7",
                            color: "#8AFFF7",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[6]}
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {/* {row.protein} */}
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        justifyContent="center"
                      >
                        <Box
                          sx={{
                            border: "0.5px solid #ffffff",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[7]}
                        </Box>
                        <Box
                          sx={{
                            border: "0.5px solid #8AFFF7",
                            color: "#8AFFF7",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[8]}
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell textAlign="center">
                      {/* {row.protein} */}
                      <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        justifyContent="center"
                      >
                        <Box
                          sx={{
                            border: "0.5px solid #ffffff",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[9]}
                        </Box>
                        <Box
                          sx={{
                            border: "0.5px solid #8AFFF7",
                            color: "#8AFFF7",
                            width: "30px",
                            height: "30px",
                            borderRadius: "5px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {row[10]}
                        </Box>
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* ------------------note---------- */}

        <Box textAlign="center">
          <Box
            fontSize={{ xs: "16px", sm: "22px" }}
            fontWeight={400}
            letterSpacing="1%"
            component="span"
            textAlign="center"
            color="#FF0000"
          >
            <Box component="span"> *</Box>
            Note:
          </Box>

          <Box width={{ xs: "100%", sm: "85%", md: "65%" }} mx="auto" mt={2}>
            <Typography
              sx={{
                fontFamily: "Inter",
                fontWeight: "400",
                fontSize: { xs: "14px", sm: "16px", md: "20px" },
                lineHeight: "28px",
                textAlign: "center",
                letterSpacing: "0.5px",
              }}
            >
              The Turbo ETH NFT collection will have a max supply of 10k NFTs.
              After all the airdrops are completed, the
              <br />
              <span style={{ borderBottom: "1px solid #fff" }}>
                remaining NFTs will be burned on May 21<sup>st</sup> 2023
              </span>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NftChart;
