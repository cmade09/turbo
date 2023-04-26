import React, { useContext, useEffect, useState } from "react";
import { useAvaxContract } from "./Connectivity/Hooks";
import { formatUnits } from "@ethersproject/units";
import Web3 from "web3";
import { AppContext } from "./utils/utils";
import Cards from "./components/Cards";
import NftChart from "./components/NftChart";
import MainSection from "./components/MainSection";
import MainWorking from "./components/MainWorking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NetworkChange from "./utils/NetworkModal";
import "./App.css";

function App() {
  const { account, signer, connect } = useContext(AppContext);
  const AvaxContract = useAvaxContract(signer);
  let decimal = 18;
  const [totalStaked, setTotalStaked] = useState();
  const [available, setAvailable] = useState();
  const [TotalWithdrawn, setTotalWithdrawn] = useState();
  const [HoldBonusPercent, setHoldBonusPercent] = useState();
  const [ReferralTotalBonus, setReferralTotalBonus] = useState();
  const [ReferralWithdrawn, setReferralWithdrawn] = useState();
  const [totalUser, setTotalUser] = useState();
  const [depositData, setDepositData] = useState([]);
  const [switchNetwork, setswitchNetwork] = useState(false);
  const web3 = new Web3(
    Web3.givenProvider
      ? Web3.givenProvider
      : "https://arbitrum.blockpi.network/v1/rpc/public"
  );

  const init = async () => {
    const staked = await AvaxContract.getUserTotalDeposits(account);
    setTotalStaked((+formatUnits(staked, decimal)).toFixed(3));
    const available = await AvaxContract.getUserAvailable(account);
    setAvailable((+formatUnits(available, decimal)).toFixed(3));
    const withdrawn = await AvaxContract.getUserTotalWithdrawn(account);
    setTotalWithdrawn((+formatUnits(withdrawn, decimal)).toFixed(3));
    const holdBonus = await AvaxContract.getUserHoldBonusPercent(account);
    setHoldBonusPercent((+holdBonus / 100).toFixed(3));
    const ReferralTotal = await AvaxContract.getUserReferralTotalBonus(account);
    setReferralTotalBonus((+formatUnits(ReferralTotal, decimal)).toFixed(3));
    const Referral = await AvaxContract.getUserReferralWithdrawn(account);
    setReferralWithdrawn((+formatUnits(Referral, decimal)).toFixed(3));
    const { level1, level2, level3 } = await AvaxContract.getUserDownlineCount(
      account
    );
    setTotalUser(+level1 + +level2 + +level3);
    const list = await AvaxContract.getUserAmountOfDeposits(account);

    let arr = [];
    for (let i = 0; i < +list; i++) {
      const { plan, amount, profit, finish, forced } =
        await AvaxContract.getUserDepositInfo(account, i.toString());
      const status = await AvaxContract.isDepositActive(account, i.toString());

      const obj = {
        plan: +plan,
        staked: (+formatUnits(amount, decimal)).toFixed(3),
        roi: (+formatUnits(profit, decimal) / 100).toFixed(3),
        finish: +finish,
        status: status,
        forced: forced,
      };
      arr.push(obj);
    }
    setDepositData([...arr]);
  };
  let chain = async () => {
    try {
      if (window.web3) {
        const chainid = await web3.eth.getChainId();
        if (+chainid !== 42161) {
          setswitchNetwork(true);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    const storage = localStorage.getItem("wallet");
    if (storage === "meta") {
      connect();
    }
    chain();
  }, []);
  useEffect(() => {
    if (account) {
      init();
    }
  }, [account]);

  useEffect(() => {
    if (window.location.href.includes("?ref=")) {
      let getAddress = window.location.href.split("?ref=")[1];
      console.log(getAddress, "getAddress");
      let final = getAddress.slice(0, 42);
      localStorage.setItem("REF_ADDRESS", final);
    }
  }, []);

  return (
    <>
      <NetworkChange open={switchNetwork} setOpen={setswitchNetwork} />

      <Navbar />
      <MainSection />
      <Cards init={init} />
      <NftChart />
      <MainWorking
        totalStaked={totalStaked}
        available={available}
        TotalWithdrawn={TotalWithdrawn}
        HoldBonusPercent={HoldBonusPercent}
        ReferralTotalBonus={ReferralTotalBonus}
        ReferralWithdrawn={ReferralWithdrawn}
        totalUser={totalUser}
        depositData={depositData}
        init={init}
      />
      <Footer />
    </>
  );
}

export default App;
