// 领取奖励
import { useWeb3React } from "@web3-react/core";
import { t } from "i18next";
import { drawAward } from "../API";
import { addMessage, showLoding } from "../utils/tool";
import { Contracts } from "../web3";
export const useReceiveBep = () => {
  const { account } = useWeb3React();
  async function receiveBep(callbackFun: any, contractName: any) {
    if (!account) return addMessage(t("Please link wallet"));

    showLoding(true);
    try {
      let resed = await Contracts.example.ClaimIdoTokenBep(
        account,
        contractName
      );
      showLoding(false);
      addMessage(t("Received successfully"));
      setTimeout(() => callbackFun(), 1000);
    } catch (error: any) {
      addMessage(t("failed"));
      showLoding(false);
    }
  }
  return { receiveBep };
};
