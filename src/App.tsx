import "./App.scss";
import "./App.css";
import { useEffect } from "react";
import "./lang/i18n";
import { useWeb3React } from "@web3-react/core";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Routers from "./router";
import { GetQueryString, startWord } from "./utils/tool";
// import web3 from 'web3';
import { stateType } from "./store/reducer";
import { createDelMessageAction } from "./store/actions";
import { Login } from "./API";
import Loding from "./components/loding";
import ViewportProvider from "./components/viewportContext";
import prohibit from "./assets/image/prohibit.png";
import cloneIcon from "./assets/image/CloseIcon.svg";

import { t } from "i18next";
import useConnectWallet from "./hooks/useConnectWallet";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { isMain } from "./config";
import { message } from "antd";

declare let window: any;

const MessageBox = styled.div`
  position: fixed;
  z-index: 9999;
  top: 90px;
  right: 40px;
  @media screen and (max-width: 967px) {
    right: 0 !important;
  }
`;
function App() {
  const dispatch = useDispatch();
  const web3React = useWeb3React();
  let state = useSelector<stateType, stateType>((state) => state);
  console.log(state?.message);

  // useEffect(() => {
  //   window?.ethereum?.on("accountsChanged", (accounts: string[]) => {
  //     // 账号改了，刷新网页
  //     // navigate("/")
  //     window.location.reload();
  //   });
  //   window?.ethereum?.on("networkChanged", (accounts: string[]) => {
  //     // 改了，刷新网页
  //     // navigate("/")
  //     window.location.reload();
  //   });
  // }, [web3React.account]);
  return (
    <ViewportProvider>
      <MessageBox>
        {state?.message?.map((item, index) => (
          <div className="messageItem" key={index}>
            <div className="messageLebel">
              <img src={prohibit} alt="" />
            </div>
            <div className="messageConter">
              {/* <div className="title">{t("73")}</div> */}
              <div className="messageConter_content">{item.message}</div>
              <img
                className="clone"
                onClick={() => {
                  dispatch(createDelMessageAction(item.index));
                }}
                src={cloneIcon}
                alt=""
              />
            </div>
          </div>
        ))}
      </MessageBox>
      <Routers></Routers>
      {state.showLoding && <Loding></Loding>}
    </ViewportProvider>
  );
}

export default App;
