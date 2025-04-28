import { Outlet, useNavigate, useLocation } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "antd";
import { addMessage, startWord } from "../utils/tool";
import { Login } from "../API/index";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import { Contracts } from "../web3";
import Web3 from "web3";
import { createLoginSuccessAction } from "../store/actions";

import "../assets/style/layout.scss";
import useConnectWallet from "../hooks/useConnectWallet";
import { LOCAL_KEY } from "../config";
import styled from "styled-components";
import { useSign } from "../hooks/useSign";
import { showLoding as showLodingFun } from "../utils/tool";
import { getQueryParam } from "../utils/getUrlParamsLegacy";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

let refereeUserAddress: any;

const ContentContainer = styled(Layout)`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  min-height: calc(100vh - 80px);
  overflow-y: auto;
  z-index: 2;
  background: transparent;
  position: relative;
  overflow: hidden;
  @media (max-width: 768px) {
    /* padding: 40px 0px; */
  }
`;

const MainLayout: React.FC = () => {
  let dispatch = useDispatch();
  const token = useSelector((state: any) => state?.token);
  let { t, i18n } = useTranslation();
  const web3React = useWeb3React();
  const { signFun } = useSign();

  const { connectWallet } = useConnectWallet();
  const [BNBBalanceAmount, setBNBBalanceAmount] = useState<any>("0");
  const location = useLocation();
  const web3 = new Web3();
  const pathname = startWord(location.pathname);
  console.log(pathname, location.pathname);

  const LoginFun = useCallback(async () => {
    if (web3React.account) {
      const exampleValue = getQueryParam("inviteCode") || ""; // 推荐地址
      let tag = await web3.utils.isAddress(exampleValue);
      if (tag) {
        refereeUserAddress = exampleValue;
      } else {
        refereeUserAddress = "";
      } 
      try {
        await signFun((res: any) => { 
          Login({
            ...res,
            userAddress: web3React.account as string,
            refereeUserAddress: exampleValue,
          })
            .then((res: any) => {
              if (res.code === 200) {
                showLodingFun(false);
                dispatch(
                  createLoginSuccessAction(
                    res.data.token,
                    web3React.account as string
                  )
                );
              } else {
                showLodingFun(false);
                addMessage(res.msg);
              }
            })
            .catch(() => { });
        }, `userAddress=${web3React.account as string}&refereeUserAddress=${refereeUserAddress}`);
      } catch (error) {
        console.info(error);
      }
    }
  }, [web3React.account, refereeUserAddress]);

  useEffect(() => {
    connectWallet && connectWallet();
  }, [connectWallet]);

  useEffect(() => {
    LoginFun();
  }, [web3React.account]);

  useEffect(() => {
    if (web3React.account) {
      Contracts.example.getBalance(web3React.account).then((res: any) => {
        let amounted = Web3.utils.fromWei(res);
        setBNBBalanceAmount(amounted);
      });
    } else {
    }
  }, [web3React.account]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showLoding, setShowLoding] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.style.overflow = showLoding ? "hidden" : "auto";
  }, [showLoding]);

  return (
    <div className="UUContainer">
      {/* <ContainerBg1 src={allContainerBg}></ContainerBg1> */}

      <ContentContainer className="MainContent">
        <Outlet />
      </ContentContainer>
    </div>
  );
};
export default MainLayout;
