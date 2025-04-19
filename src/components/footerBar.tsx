import React from "react";
import { useNavigate } from "react-router-dom";
import icon1 from "../assets/image/footerBar/icon1.png";
import icon1On from "../assets/image/footerBar/icon1-on.png";
import icon2 from "../assets/image/footerBar/icon2.png";
import icon2On from "../assets/image/footerBar/icon2-on.png";
import icon3 from "../assets/image/footerBar/icon3.png";
import icon3On from "../assets/image/footerBar/icon3-on.png";
import icon4 from "../assets/image/footerBar/icon4.png";
import icon4On from "../assets/image/footerBar/icon4-on.png";
import { useTranslation } from "react-i18next";

interface Props {
  index: number;
}

const ComponentName = (props: any) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  const handleAccount = () => {
    navigate("/account");
  };
  const handleFriends = () => {
    navigate("/friends");
  };
  const handleCommunity = () => {
    navigate("/community");
  };

  const { t, i18n } = useTranslation();

  return (
    <div
      className="bg-[#1F54A0] fixed left-[20px] right-[20px] bottom-[30px] rounded-[56px] py-10 z-20"
      style={{
        boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.08)",
      }}
    >
      <div className="flex text-[#A6A6A6] text-center">
        <div className="flex-1" onClick={handleHome}>
          <img
            className="block mx-auto h-22"
            src={props.index === 1 ? icon1On : icon1}
            alt=""
          />
          <div
            className={
              props.index === 1 ? "text-[#EFD382] font-bold" : " font-bold"
            }
          >
            {t("7")}
          </div>
        </div>
        <div className="flex-1" onClick={handleFriends}>
          <img
            className="block mx-auto h-22"
            src={props.index === 2 ? icon2On : icon2}
            alt=""
          />
          <div
            className={
              props.index === 2 ? "text-[#EFD382] font-bold" : " font-bold"
            }
          >
            {t("8")}
          </div>
        </div>
        <div className="flex-1" onClick={handleCommunity}>
          <img
            className="block mx-auto h-22"
            src={props.index === 3 ? icon3On : icon3}
            alt=""
          />

          <div
            className={
              props.index === 3 ? "text-[#EFD382] font-bold" : " font-bold"
            }
          >
            {t("9")}
          </div>
        </div>
        <div className="flex-1" onClick={handleAccount}>
          <img
            className="block mx-auto h-22"
            src={props.index === 4 ? icon4On : icon4}
            alt=""
          />

          <div
            className={
              props.index === 4 ? "text-[#EFD382] font-bold" : " font-bold"
            }
          >
            {t("10")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentName;
