import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import TopBar from "../../components/topBar";
import FooterBar from "../../components/footerBar";
import icon2 from "../../assets/image/friends/icon2.png";
import { getUserAccountList, getUserInfo } from "../../API/account";
import { truncateMiddle } from "../../utils/truncateMiddle";
import { useNavigate } from "react-router-dom";
import { AddrHandle, formatTimestamp2 } from "../../utils/tool";
import copy from "copy-to-clipboard";
import { Dropdown, notification, Tooltip } from "antd";
import { useWeb3React } from "@web3-react/core";
import NoData from "../../components/NoData";

const Account = () => {
  const { t, i18n } = useTranslation();

  const [lan, setLan] = useState<any>();
  useEffect(() => {
    setLan(i18n.language);
  }, [i18n.language]);

  const token = useSelector((state: any) => state?.token);
  const [userInfo, setUserInfo] = useState<any>([]);
  const handleUserInfo = () => {
    getUserInfo()
      .then(async (res: any) => {
        setUserInfo(res.data);

        await getUserAccountList({
          pageNum: 1,
          pageSize: 20,
        })
          .then((res: any) => {
            setFriends(res.data?.pageInfo?.records);
            setShowLength(res.data?.total);
            setBuyNftNum(res?.data?.buyNftNum);
          })
          .catch(() => {});
      })
      .catch(() => {})
      .finally(() => {});
  };

  const [buyNftNum, setBuyNftNum] = useState(0);
  const [showLength, setShowLength] = useState(20);
  const [pageNum, setPageNum] = useState(1);
  const [friends, setFriends] = useState([]);

  const handleGetFriends = async (num: number) => {
    await getUserAccountList({
      pageNum: num,
      pageSize: 20,
    })
      .then((res: any) => {
        setFriends(friends.concat(res.data?.pageInfo?.records || []));
        setShowLength(res.data?.total);
        setBuyNftNum(res?.data?.buyNftNum);
      })
      .catch(() => {});
  };

  const { account } = useWeb3React<any>();
  useEffect(() => {
    setFriends([]);
    if (token && account) {
      handleUserInfo();
    }
  }, [token, account]);

  const navigate = useNavigate();

  const handleShar = () => {
    if (!account) return;
    const _url =
      window.origin + "?" + encodeURIComponent("inviteCode=" + account);
    copy(_url);
    notification.open({
      message: t("Copied successfully"),
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <div className={"text-[#1A2C50] text-[12px] w-[232px]"}>{t("13")}</div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <TopBar />
      <div className="text-[#fff] text-[26px] font-[700] text-center pb-[30px]">
        {t("14")}
      </div>
      <div className="h-[200px] rounded-[16px] mx-[20px] flex items-center">
        <div className="">
          <div className="px-[26px] text-[#fff] text-[14px] font-[400] pt-[20px] text-center leading-5">
            {t("15")}
          </div>
          <div className="px-[26px] text-[#fff] text-[14px] font-[400] text-center pt-[10px]">
            {t("16")}
          </div>
          <div className="flex items-center mx-[20px] bg-[#232932bf] rounded-xl px-16 py-10 mt-[20px]">
            <div className="text-[#fff] text-[14px] font-[600] flex-1">
              {AddrHandle(
                window.origin +
                  "?" +
                  encodeURIComponent("inviteCode=" + account) || "-",
                16,
                4
              )}
            </div>
            <img
              src={icon2}
              className="w-[30px] h-[30px]"
              onClick={handleShar}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="mt-20 bg-[#194077] rounded-xl px-18 py-16 mx-[20px]">
        <div className="text-[#EFD382] flex items-center text-[18px] font-[600] pb-2">
          {t("17")}({buyNftNum}/{showLength})
          <Dropdown menu={{ items }} placement="bottom" trigger={["click"]}>
            <svg
              className="ml-4 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.98958 1.98962C8.80002 1.98962 9.58567 2.14812 10.3247 2.46072C11.0391 2.76286 11.6809 3.19562 12.2322 3.74698C12.7836 4.29833 13.2163 4.94009 13.5185 5.65445C13.8311 6.39351 13.9896 7.17919 13.9896 7.98962C13.9896 8.80006 13.8311 9.58572 13.5185 10.3248C13.2163 11.0392 12.7836 11.6809 12.2322 12.2323C11.6809 12.7836 11.0391 13.2164 10.3247 13.5185C9.58569 13.8311 8.80002 13.9896 7.98958 13.9896C7.17914 13.9896 6.39348 13.8311 5.65441 13.5185C4.94005 13.2164 4.29828 12.7836 3.74694 12.2323C3.19558 11.6809 2.76283 11.0392 2.46067 10.3248C2.14808 9.58573 1.98958 8.80006 1.98958 7.98962C1.98958 7.17919 2.14808 6.39353 2.46067 5.65445C2.76281 4.94009 3.19558 4.29833 3.74694 3.74698C4.29828 3.19562 4.94005 2.76287 5.65441 2.46072C6.39348 2.14812 7.17914 1.98962 7.98958 1.98962ZM7.98958 0.989624C4.12358 0.989624 0.989578 4.12362 0.989578 7.98962C0.989578 11.8556 4.12358 14.9896 7.98958 14.9896C11.8556 14.9896 14.9896 11.8556 14.9896 7.98962C14.9896 4.12362 11.8556 0.989624 7.98958 0.989624Z"
                fill="#7893C4"
              />
              <path
                d="M8.48959 9H7.48958L7.00136 3.99927H9.00175L8.48959 9Z"
                fill="#7893C4"
              />
              <path
                d="M7.37654 10.9839C7.37654 11.1496 7.44239 11.3086 7.5596 11.4258C7.67681 11.543 7.83578 11.6089 8.00154 11.6089C8.1673 11.6089 8.32627 11.543 8.44348 11.4258C8.56069 11.3086 8.62654 11.1496 8.62654 10.9839C8.62654 10.8181 8.56069 10.6592 8.44348 10.5419C8.32627 10.4247 8.1673 10.3589 8.00154 10.3589C7.83578 10.3589 7.67681 10.4247 7.5596 10.5419C7.44239 10.6592 7.37654 10.8181 7.37654 10.9839Z"
                fill="#7893C4"
              />
            </svg>
          </Dropdown>
        </div>
        <div className="">
          <NoData />
          <div
            style={{
              display:
                showLength === friends.length || friends.length === 0
                  ? "none"
                  : "flex",
            }}
            className=" items-center justify-center pt-[20px] pb-[30px] text-[#fff] text-[12px] font-[300]"
            onClick={() => {
              setPageNum(pageNum + 1);
              handleGetFriends(pageNum + 1);
            }}
          >
            {t("18")}
            <svg
              className="ml-4"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M1.86828 1.84467L6.00211 5.87321L10.1887 1.82715L10.6806 1.84467L6.00211 6.79251L1.32373 1.84467H1.86828ZM1.86828 5.14121L6.00211 9.16976L10.1887 5.12959L10.6806 5.14121L6.00211 10.0949L1.32373 5.14121H1.86828Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterBar index={2} />
    </div>
  );
};

export default Account;
