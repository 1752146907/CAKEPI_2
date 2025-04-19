import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { addMessage, showLoding } from "../utils/tool";
import { t } from "i18next";
import { decimalNum } from "../utils/decimalNum";
import { Contracts } from "../web3";

type AddressType = string;
type CoinAddressType = string;

export default function useUSDTGroup(
  contractAddress: AddressType,
  coinName: CoinAddressType
) {
  console.log(contractAddress, coinName, "coinName");

  const { account } = useWeb3React();
  const [hash, setHash] = useState(0);
  const [TOKENBalance, setTOKENBalance] = useState("0");
  const [TOKENAllowance, setTOKENAllowance] = useState("0");
  const [symbol, setSymbol] = useState("");

  /**
   *  TOKENBalance 余额
   */
  const initTOKENBalance = useCallback(async () => {
    if (!!account) {
      const balance = await Contracts.example?.balanceOf(account, coinName);

      setTOKENBalance(decimalNum(Web3.utils.fromWei(balance.toString()), 8));
    }
  }, [account, coinName]);

  /**
   *  授权USDT
   */
  const handleApprove = useCallback(async () => {
    console.log("account", account);
    if (account) {
      showLoding(true);
      try {
        const res = await Contracts.example?.approve(
          account,
          contractAddress,
          coinName
        );
        console.log("res", res);
        // const info = await res.wait();
        setHash(+new Date());
        showLoding(false);
      } catch (error) {
        showLoding(false);
        throw error;
      }
    }
  }, [showLoding, coinName, account]);

  /**
   *  TOKENBalance 授权额度
   */
  const initTOKENAllowance = useCallback(async () => {
    if (!!account) {
      const allowance = await Contracts.example?.Tokenapprove(
        account,
        contractAddress,
        coinName
      );
      console.log("allowance");
      console.log(Web3.utils.fromWei(allowance.toString()));
      setTOKENAllowance(Web3.utils.fromWei(allowance.toString(), "ether"));
      // debugger;
    }
  }, [account, contractAddress, coinName]);

  /**
   *  TOKENBalance 授权额度
   */
  const initSymbol = useCallback(async () => {
    if (!!account) {
      const symbol = await Contracts.example?.symbol(account, coinName);
      setSymbol(symbol);
    }
  }, [account, contractAddress, coinName]);

  /**
   *  TOKENBalance 授权额度
   */
  const handleUSDTRefresh = useCallback(() => {
    setHash(+new Date());
  }, [coinName]);

  /**
   *  TOKENBalance 授权额度
   */
  const handleTransaction = useCallback(
    async (
      price: number | string,
      transactionCallBack: (refreshCall: () => void) => void
    ) => {
      if (Number(TOKENAllowance) >= Number(price)) {
        await transactionCallBack(handleUSDTRefresh);
      } else {
        console.log("2222");
        await handleApprove();
      }
      console.log(Number(TOKENAllowance));
      console.log(Number(price));

      // debugger;
    },
    [
      account,
      handleApprove,
      symbol,
      handleUSDTRefresh,
      coinName,
      TOKENBalance,
      TOKENAllowance,
      addMessage,
    ]
  );

  useEffect(() => {
    if (account) {
      initTOKENAllowance();
      initTOKENBalance();
      initSymbol();
    }
  }, [account, hash, coinName]);

  return {
    TOKENBalance,
    TOKENAllowance,
    handleApprove,
    handleTransaction,
    handleUSDTRefresh,
  };
}
