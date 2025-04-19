import React, { useEffect, useState } from "react";
import icon5 from "../../assets/image/home/icon5.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { handleUserSignIn, isUserSign } from "../../API/home";
import { addMessage, dateFormat, showLoding } from "../../utils/tool";
import { useSign } from "../../hooks/useSign";
import { useWeb3React } from "@web3-react/core";
import { notification } from "antd";

const ComponentName = (props?: {}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const handleMore = () => {
    navigate("/home/doSgnIn");
  };

  const token = useSelector((state: any) => state?.token);

  const [isSign, setisSign] = useState<any>();
  const handleGetBanner = () => {
    isUserSign().then((res: any) => {
      setisSign(res.data);
    });
  };

  useEffect(() => {
    if (!token) return;
    handleGetBanner();
  }, [token]);

  const { signFun } = useSign();
  const web3React = useWeb3React();
  const handleSign = async () => {
    if (isSign) return;
    showLoding(true);
    await signFun((res: any) => {
      handleUserSignIn({
        ...res,
      })
        .then((res: any) => {
          if (res.code === 200) {
            notification.success({
              duration: 3,
              message: t("Received successfully"),
              className: "custom-notification",
            });
            handleGetBanner();
          } else {
            addMessage(res.msg);
          }
          showLoding(false);
        })
        .finally(() => {});
    }, `userAddress=${web3React.account as string}`);
  };

  return (
    <div>
      <div className="pb-16 pt-[22px] px-24 text-[#121212] text-[18px] font-bold flex">
        {t("308")}
        <div
          className="flex font-bold text-[#51E04E] text-[14px] flex-1 items-center justify-end"
          onClick={handleMore}
        >
          {t("309")}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="ml-2"
          >
            <path
              d="M1.59168 0.940274L6.17428 5.37725C6.34784 5.54534 6.44533 5.77329 6.44533 6.01098C6.44533 6.24866 6.34784 6.47661 6.17428 6.6447L1.59168 11.0817C1.41708 11.245 1.18322 11.3353 0.940486 11.3333C0.697751 11.3312 0.465554 11.2369 0.293908 11.0708C0.122261 10.9046 0.0248981 10.6797 0.0227887 10.4447C0.0206793 10.2097 0.113992 9.98328 0.28263 9.81423L4.21071 6.01098L0.28263 2.20773C0.194209 2.12504 0.12368 2.02613 0.0751612 1.91677C0.026642 1.80741 0.0011032 1.68979 3.49586e-05 1.57077C-0.00103329 1.45176 0.0223906 1.33372 0.0689395 1.22356C0.115488 1.1134 0.18423 1.01332 0.271154 0.929163C0.358078 0.845001 0.461443 0.778444 0.575217 0.733374C0.688992 0.688304 0.810899 0.665626 0.933823 0.66666C1.05675 0.667694 1.17823 0.692421 1.29118 0.739399C1.40413 0.786376 1.50628 0.854663 1.59168 0.940274ZM7.14635 0.940274L11.7289 5.37725C11.9025 5.54534 12 5.77329 12 6.01098C12 6.24866 11.9025 6.47661 11.7289 6.6447L7.14635 11.0817C6.97174 11.245 6.73789 11.3353 6.49515 11.3333C6.25242 11.3312 6.02022 11.2369 5.84857 11.0708C5.67693 10.9046 5.57956 10.6797 5.57746 10.4447C5.57535 10.2097 5.66866 9.98328 5.8373 9.81423L9.76537 6.01098L5.8373 2.20773C5.66866 2.03867 5.57535 1.81225 5.57746 1.57723C5.57956 1.3422 5.67693 1.11739 5.84857 0.951194C6.02022 0.785002 6.25242 0.690733 6.49515 0.68869C6.73789 0.686648 6.97174 0.776996 7.14635 0.940274Z"
              fill="#51E04E"
            />
          </svg>
        </div>
      </div>
      <div className="mx-24 bg-[#B8EED8] px-[20px] py-12 rounded-lg relative">
        <div className="mb-8 text-[#6E6E6E] text-[14px] font-bold">
          {t("311")}：{dateFormat("YYYY-mm-dd", new Date())}
        </div>
        <div
          className="inline-block bg-[#51E04E] text-[#fff] text-[14px] font-bold py-[4px] px-16 rounded-[8px]"
          style={{ opacity: isSign ? 0.5 : 1 }}
          onClick={handleSign}
        >
          {isSign ? t("307") : t("310")}
        </div>
        <img
          className="w-[123px] absolute right-[20px] bottom-0"
          src={icon5}
          alt=""
        />
      </div>
    </div>
  );
};

export default ComponentName;
