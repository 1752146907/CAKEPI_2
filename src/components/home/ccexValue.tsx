import React, { useEffect, useState } from "react";
import icon1 from "../../assets/image/home/icon1.png";
import { useTranslation } from "react-i18next";
import { getCcexValueInfo } from "../../API/home";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ComponentName = (props?: {}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state?.token);

  const [CcexValueInfo, setCcexValueInfo] = useState<any>([]);
  const handleGetBanner = () => {
    getCcexValueInfo().then((res: any) => {
      setCcexValueInfo(res.data);
    });
  };

  const handleToCcex = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动效果，若不支持则自动回退到立即滚动
    });
    navigate("/transaction/ccex");
  };
  const handleMyProduct = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 平滑滚动效果，若不支持则自动回退到立即滚动
    });
    navigate("/account/myNft");
  };

  useEffect(() => {
    if (!token) return;
    handleGetBanner();
  }, [token]);

  return (
    <div className="flex px-24">
      <div
        className="w-[156px] h-[184px] bg-[#CEE3CC] relative rounded-lg text-center mr-16"
        onClick={() => {
          handleToCcex();
        }}
      >
        <div className="text-[#121212] text-[22px] pt-20 font-bold">
          {CcexValueInfo?.currentPrice}$
        </div>
        <div className="text-[#6E6E6E] text-[14px] font-bold">{t("9")}</div>
        <img
          src={icon1}
          className="w-[107px] h-[94px] absolute left-[23px] bottom-0"
          alt=""
        />
      </div>
      <div className="flex-1">
        <div
          className="bg-[#F2E8E8] rounded-lg mb-16 text-center"
          onClick={() => {
            handleMyProduct();
          }}
        >
          <div className="text-[#6E6E6E] text-[14px] pt-18 font-bold">
            {t("10")}
          </div>
          <div className="text-[#121212] text-[22px] pb-18 font-bold leading-[30px]">
            {CcexValueInfo?.myProductValue}$
          </div>
        </div>
        <div className="bg-[#FBF0DD] rounded-lg  text-center">
          <div className="text-[#6E6E6E] text-[14px] pt-18 font-bold">
            {t("11")}
          </div>
          <div className="text-[#121212] text-[22px] pb-18 font-bold leading-[30px]">
            {CcexValueInfo?.totalEarn}$
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
