import React from "react";
import { Box, Container, Grid } from "@mui/material";
import EarningsDeposit from "./EarningsDeposit";
import ReferralInfo from "./ReferralInfo";

function MainWorking({
  totalStaked,
  available,
  TotalWithdrawn,
  HoldBonusPercent,
  ReferralTotalBonus,
  ReferralWithdrawn,
  totalUser,
  depositData,
  init,
}) {
  return (
    <Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6} mt={5}>
            <EarningsDeposit
              totalStaked={totalStaked}
              available={available}
              TotalWithdrawn={TotalWithdrawn}
              HoldBonusPercent={HoldBonusPercent}
              depositData={depositData}
              init={init}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} mt={5}>
            <ReferralInfo
              ReferralTotalBonus={ReferralTotalBonus}
              ReferralWithdrawn={ReferralWithdrawn}
              totalUser={totalUser}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default MainWorking;
