import { notification } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import nav1 from "../../assets/image/home/nav1.png";
import nav2 from "../../assets/image/home/nav2.png";
import nav3 from "../../assets/image/home/nav3.png";
import nav4 from "../../assets/image/home/nav4.png";
import nav5 from "../../assets/image/home/nav5.png";
import nav6 from "../../assets/image/home/nav6.png";
import nav7 from "../../assets/image/home/nav7.png";
import nav8 from "../../assets/image/home/nav8.png";

const ComponentName = (props?: {}) => {
  const navigate = useNavigate();
  const handleTransfer = () => {
    navigate("/home/transfer");
  };
  const handleCommunity = () => {
    navigate("/home/community");
  };
  const handleCpb = () => {
    navigate("/transaction/cpb");
  };
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="flex px-14">
        <div className="w-[25%] pl-7 pr-7" onClick={handleCpb}>
          <div className="mx-4">
            <img
              src={nav1}
              alt=""
              className="block mx-auto w-[50px] h-[50px]"
            />
          </div>
          <div className="text-[#6E6E6E] text-[14px] font-bold mt-10 text-center leading-[14px] block">
            {/* {t("1")}  */}
            TQB
          </div>
        </div>
        <div
          className="w-[25%] pl-7 pr-7"
          onClick={() => {
            handleTransfer();
          }}
        >
          <div className="mx-4">
            <img
              src={nav2}
              alt=""
              className="block mx-auto w-[50px] h-[50px]"
            />
          </div>
          <div className="text-[#6E6E6E] text-[14px] font-bold mt-10 text-center leading-[14px] block">
            {t("2")}
          </div>
        </div>
        <div className="w-[25%] pl-7 pr-7" onClick={handleCommunity}>
          <div className="mx-4">
            <img
              src={nav3}
              alt=""
              className="block mx-auto w-[50px] h-[50px]"
            />
          </div>
          <div className="text-[#6E6E6E] text-[14px] font-bold mt-10 text-center leading-[14px] block">
            {t("3")}
          </div>
        </div>
        <div
          className="w-[25%] pl-7 pr-7"
          onClick={() => {
            notification.success({
              duration: 2,
              message: t("349"),
              className: "custom-notification",
            });
          }}
        >
          <div className="mx-4">
            <img
              src={nav4}
              alt=""
              className="block mx-auto w-[50px] h-[50px]"
            />
          </div>
          <div className="text-[#6E6E6E] text-[14px] font-bold mt-10 text-center leading-[14px] block">
            {t("4")}
          </div>
        </div>
      </div>
      <div className="flex px-14 pt-24">
        <div
          className="w-[25%] pl-7 pr-7"
          onClick={() => {
            notification.success({
              duration: 2,
              message: t("349"),
              className: "custom-notification",
            });
          }}
        >
          <div className="rounded-[6px] mx-4">
            <img
              src={nav5}
              alt=""
              className="block mx-auto w-[50px] h-[50px]"
            />
          </div>
          <div className="text-[#6E6E6E] text-[14px] font-bold mt-10 text-center leading-[14px] block">
            {t("350")}
          </div>
        </div>
        <div
          className="w-[25%] pl-7 pr-7"
          onClick={() => {
            notification.success({
              duration: 2,
              message: t("349"),
              className: "custom-notification",
            });
          }}
        >
          <div className="rounded-[6px] mx-4">
            <img
              src={nav6}
              alt=""
              className="block mx-auto w-[50px] h-[50px]"
            />
          </div>
          <div className="text-[#6E6E6E] text-[14px] font-bold mt-10 text-center leading-[14px] block">
            {t("351")}
          </div>
        </div>
        <div
          className="w-[25%] pl-7 pr-7"
          onClick={() => {
            notification.success({
              duration: 2,
              message: t("349"),
              className: "custom-notification",
            });
          }}
        >
          <div className="rounded-[6px] mx-4">
            <img
              src={nav8}
              alt=""
              className="block mx-auto w-[50px] h-[50px]"
            />
          </div>
          <div className="text-[#6E6E6E] text-[14px] font-bold mt-10 text-center leading-[14px] block">
            {t("353")}
          </div>
        </div>
        <div
          className="w-[25%] pl-7 pr-7"
          onClick={() => {
            notification.success({
              duration: 2,
              message: t("349"),
              className: "custom-notification",
            });
          }}
        >
          <div className="rounded-[6px] mx-4">
            <img
              src={nav7}
              alt=""
              className="block mx-auto w-[50px] h-[50px]"
            />
          </div>
          <div className="text-[#6E6E6E] text-[14px] font-bold mt-10 text-center leading-[14px] block">
            {t("352")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
