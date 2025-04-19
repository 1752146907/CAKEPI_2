import { Key, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import solLogo from "../../assets/image/logo.png";
import icon3 from "../../assets/image/friends/icon3.png";
import icon4 from "../../assets/image/friends/icon4.png";
import icon5 from "../../assets/image/friends/icon5.png";
import icon6 from "../../assets/image/friends/icon6.png";
import icon7 from "../../assets/image/friends/icon7.png";
import icon8 from "../../assets/image/friends/icon8.png";
import icon9 from "../../assets/image/friends/icon9.png";
import iconbnb from "../../assets/image/home/bnb.png";
import iconUSDT from "../../assets/image/home/USDT.png";

import TopBar from "../../components/topBar";
import FooterBar from "../../components/footerBar";
import {
  getSubscriptionRecord,
  getUserAccountList,
  getUserInfo,
} from "../../API/account";
import { truncateMiddle } from "../../utils/truncateMiddle";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { AbstractConnector } from "@web3-react/abstract-connector";
import { createLoginSuccessAction } from "../../store/actions";
import {
  AddrHandle,
  convertToLocalUtc0Timestamp,
  timestampToDateString,
  ToThousand,
} from "../../utils/tool";
import NoData from "../../components/NoData";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { contractAddress } from "../../config";
import { Contracts } from "../../web3";
import Web3 from "web3";

const Account = () => {
  const { deactivate, connector } = useWeb3React();
  const web3React = useWeb3React();
  let dispatch = useDispatch();

  const handleDisconnect = async () => {
    try {
      if (connector instanceof WalletConnectConnector) {
        await connector.close(); // WalletConnect 断开连接
      } else if (
        connector instanceof AbstractConnector &&
        connector.deactivate
      ) {
        connector.deactivate(); // 通用的断开方法
      }
      deactivate();

      setInfo([]);
      setList([]);
      dispatch(createLoginSuccessAction("", web3React.account as string));
      console.log("Disconnected");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const { t, i18n } = useTranslation();

  const [lan, setLan] = useState<any>();
  useEffect(() => {
    setLan(i18n.language);
  }, [i18n.language]);

  const token = useSelector((state: any) => state?.token);
  const { account } = useWeb3React<any>();
  const [info, setInfo] = useState<any>([]);
  const handleUserInfo = () => {
    getUserInfo()
      .then((res: any) => {
        setInfo(res.data);
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (!token || !account) {
      return;
    }
    handleUserInfo();
    handleGetRecord();
  }, [token, account]);

  const [list, setList] = useState<any>([]);
  const handleGetRecord = () => {
    getSubscriptionRecord()
      .then((res: any) => {
        setList(res.data);
      })
      .catch(() => {});
  };

  const navigate = useNavigate();

  // usdt余额
  const { TOKENBalance: USDTBalance } = useUSDTGroup(
    contractAddress.USDT,
    "USDT"
  );

  const [BNBBalanceAmount, setBNBBalanceAmount] = useState<any>("0");
  useEffect(() => {
    if (web3React.account) {
      Contracts.example.getBalance(web3React.account).then((res: any) => {
        let amounted = Web3.utils.fromWei(res);
        setBNBBalanceAmount(Number(amounted).toFixed(4));
      });
    }
  }, [web3React.account]);

  return (
    <div className="w-full">
      <TopBar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterBar index={4} />
    </div>
  );
};

export default Account;
