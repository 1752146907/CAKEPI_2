import { useWeb3React } from "@web3-react/core";
import { t } from "i18next";
import { addMessage, showLoding } from "../utils/tool";
import { Contracts } from "../web3";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { useDispatch } from "react-redux";
import { createLoginSuccessAction } from "../store/actions";
export const useSign = () => {
  const { account } = useWeb3React();
  const { deactivate, connector } = useWeb3React();
  let dispatch = useDispatch();
  function signFun(callback: any, msg: string) {
    if (!account) return addMessage(t("Please link wallet"));
    let time = new Date().valueOf();
    showLoding(true);
    Contracts.example
      .Sign(account as string, `${msg}&time=${time}`)
      .then((res: string) => {
        callback({ sign: res, msg: `${msg}&time=${time}` });
      })
      .catch((res: any) => {
        if (connector instanceof WalletConnectConnector) {
          connector.close(); // WalletConnect 断开连接
        } 

        dispatch(createLoginSuccessAction("", account as string));
        showLoding(false);
      })
      .finally(() => {
        showLoding(false);
      });
  }
  return { signFun };
};
