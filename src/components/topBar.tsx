import { useEffect, useState } from "react";
import logo from "../assets/image/logo.jpg";
import lanIcon from "../assets/image/lan.png";

import Frame from "../assets/image/Frame.svg"
import { useNavigate } from "react-router-dom";
import useConnectWallet from "../hooks/useConnectWallet";
import { Dropdown, notification } from "antd";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import { LOCAL_KEY } from "../config";
import { useSelector } from "react-redux";
import { truncateMiddle } from "../utils/truncateMiddle";

const TopBar = (props: any) => {


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [showLoding, setShowLoding] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.body.style.overflow = showLoding ? "hidden" : "auto";
  }, [showLoding]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { connectWallet } = useConnectWallet();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { activate, deactivate, active, account } = useWeb3React();


  // eslint-disable-next-line react-hooks/rules-of-hooks
  let { t, i18n } = useTranslation();

  function changeLanguage(key: string) {
    window.localStorage.setItem(LOCAL_KEY, key);
    i18n.changeLanguage(key);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const token = useSelector((state: any) => state?.token);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDetail = (url?: string) => {
    if (!account) {
      connectWallet();
    }
  };

  const items = [
    {
      key: "0",
      label: (
        <div
          className="text-[#fff] text-[14px] font-bold pb-6 pt-2"
          style={{ textAlign: "center", borderBottom: "1px solid #6b6b6b" }}
        >
          {t("1")}
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div
          className="text-[#686868] text-[14px] font-bold pb-6 pt-2"
          style={{ textAlign: "center", borderBottom: "1px solid #6b6b6b" }}
          onClick={() => {
            notification.open({
              message: "Coming soon",
            })
          }}
        >
          {t("2")}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-[#686868] text-[14px] font-bold pb-6 pt-2"
          style={{ textAlign: "center", borderBottom: "1px solid #6b6b6b" }}
          onClick={() => {
            notification.open({
              message: "Coming soon",
            })
          }}
        >
          {t("3")}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="text-[#686868] text-[14px] font-bold pb-6 pt-2"
          style={{ textAlign: "center", borderBottom: "1px solid #6b6b6b" }}
          onClick={() => {
            notification.open({
              message: "Coming soon",
            })
          }}
        >
          {t("4")}
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          className="text-[#686868] text-[14px] font-bold pb-6 pt-2"
          style={{ textAlign: "center", borderBottom: "1px solid #6b6b6b" }}
          onClick={() => {
            notification.open({
              message: "Coming soon",
            })
          }}
        >
          {t("5")}
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div
          className="text-[#686868] text-[14px] font-bold pb-6 pt-2"
          style={{ textAlign: "center", borderBottom: "1px solid #6b6b6b" }}
          onClick={() => {
            notification.open({
              message: "Coming soon",
            })
          }}
        >
          {t("6")}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="text-[#FFAE2E] pt-6 text-[14px] font-bold flex justify-center items-center"
          style={{ textAlign: "center" }}
          onClick={() => handleDetail()}
        >
          <img className="w-[16px] h-[16px] mr-4 rounded-full" src={logo} alt="" />
          {truncateMiddle(account, 4, 4) || t("7")}
        </div>
      ),
    },
  ];

  const items2 = [
    {
      key: "2",
      label: (
        <div
          className={
            i18n.language === "en"
              ? "text-[#fff] text-[14px] font-bold"
              : "text-[#9199A7] text-[14px] font-bold"
          }
          style={{ textAlign: "center" }}
          onClick={() => changeLanguage("en")}
        >
          English
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className={
            i18n.language === "ja"
              ? "text-[#fff] text-[14px] font-bold"
              : "text-[#9199A7] text-[14px] font-bold"
          }
          style={{ textAlign: "center" }}
          onClick={() => changeLanguage("ja")}
        >
          日本語
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          className={
            i18n.language === "ko"
              ? "text-[#fff] text-[14px] font-bold"
              : "text-[#9199A7] text-[14px] font-bold"
          }
          style={{ textAlign: "center" }}
          onClick={() => changeLanguage("ko")}
        >
          한국어
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div
          className={
            i18n.language === "zh"
              ? "text-[#fff] text-[14px] font-bold"
              : "text-[#9199A7] text-[14px] font-bold"
          }
          style={{ textAlign: "center" }}
          onClick={() => changeLanguage("zh")}
        >
          中文繁体
        </div>
      ),
    },
  ]

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-5" style={{ background: scrollPosition > 20 ? "#252525" : 'transparent' }}>
      <div
        className="flex items-center py-10 p-20"
        style={{ boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.08)" }}
      >
        <img className="w-[32px] h-[32px] rounded-full" src={logo} alt="" />
        <div style={{ flex: 1 }}></div>

        <Dropdown menu={{ items: items2 }} placement="bottom" trigger={["click"]}>
          <img className="w-[24px] h-[24px] mr-10" src={lanIcon} alt="" />
        </Dropdown>
        <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
          <img className="w-[24px] h-[24px] rounded-full" src={Frame} alt="" />
        </Dropdown>
      </div>
    </div>
  );
};

export default TopBar;
