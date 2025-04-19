import React, { useEffect, useState } from "react";
import { Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getProductBaseList } from "../API/product";
import { addMessage, showLoding } from "../utils/tool";
import { buyProduct as handleBuyProduct } from "../API/product";
import { useSign } from "../hooks/useSign";
import { useWeb3React } from "@web3-react/core";
import { Skeleton } from "antd";
import useUSDTGroup from "../hooks/useUSDTGroup";
import { contractAddress } from "../config";
import { Contracts } from "../web3";

interface Props {
  type?: 1;
  setStateNftList: any;
}

const ComponentName = (props?: any) => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playType, setPlayType] = useState(0);
  const navigate = useNavigate();
  const { signFun } = useSign();
  const web3React = useWeb3React();
  const { account } = useWeb3React<any>();

  // usdt余额
  const { TOKENBalance: USDTBalance } = useUSDTGroup(
    contractAddress.USDT,
    "USDT"
  );
  const {
    handleTransaction,
    TOKENAllowance,
    handleApprove,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress.CC, "USDT");
  const handleBuy = async () => {
    showLoding(true);
    if (playType === 0) {
      // 判断USDT余额
      if (Number(USDTBalance) < Number(buyProduct?.payUsdNum)) {
        addMessage(t("332"));
        showLoding(false);
        return;
      }
      if (Number(TOKENAllowance) < Number(buyProduct?.payUsdNum)) {
        try {
          await handleApprove();
          await handleUSDTRefresh();
        } catch (error) {
          showLoding(false);
          return;
        }
      }
      handleBuyProduct({
        msg: "",
        sign: "",
        coinType: coinName === "JHB" ? "1" : "2", // 1-JHB 2-CCM
        buyType: playType + 1,
        productBaseId: buyProduct.id,
      })
        .then(async (res: any) => {
          if (res.code === 200) {
            buyCc(res.data);
          } else {
            addMessage(res.msg);
            showLoding(false);
          }
        })
        .finally(() => {});
    } else {
      await signFun(async (res: any) => {
        handleBuyProduct({
          ...res,
          coinType: coinName === "JHB" ? "1" : "2", // 1-JHB 2-CCM
          buyType: playType + 1,
          productBaseId: buyProduct.id,
        })
          .then(async (res: any) => {
            if (res.code === 200) {
              setIsModalOpen(false);
              showLoding(false);
              handleProductList();
              props.setStateNftList(new Date().getTime());
              return notification.success({
                duration: 3,
                message: t("Received successfully"),
                className: "custom-notification",
              });
            } else {
              addMessage(res?.msg);
              showLoding(false);
            }
          })
          .finally(() => {});
      }, `userAddress=${web3React.account as string}`);
    }
  };

  const [coinName, setCoinName] = useState("JHB");

  const buyCc = async (data: any) => {
    showLoding(true);
    let res;
    try {
      res = await Contracts.example?.buyCc(account, data);
    } catch (error: any) {
      showLoding(false);
      return addMessage(t("failed"));
    }
    showLoding(false);
    if (!!res?.status) {
      setIsModalOpen(false);
      showLoding(false);
      handleProductList();
      props.setStateNftList(new Date().getTime());
      notification.success({
        duration: 3,
        message: t("Received successfully"),
        className: "custom-notification",
      });
    } else {
      return addMessage(t("failed"));
    }
  };

  const token = useSelector((state: any) => state?.token);

  const [isFinally, setIsFinally] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const handleProductList = () => {
    getProductBaseList(2)
      .then((res: any) => {
        setList(res.data);
      })
      .finally(() => {
        setIsFinally(true);
      });
  };

  useEffect(() => {
    if (!token) return;
    handleProductList();
  }, [token]);

  const [buyProduct, setBuyProduct] = useState<any>({
    payJhbNum: 0,
    payUsdNum: 0,
    payCpbNum: 0,
  });

  const closeIcon = (
    <svg
      className="relative top-[10px] right-[-10px]"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
    >
      <path
        d="M23.2852 23.2852C22.875 23.6953 22.2041 23.6953 21.7939 23.2852L6.71484 8.20605C6.30469 7.7959 6.30469 7.125 6.71484 6.71484C7.125 6.30469 7.7959 6.30469 8.20605 6.71484L23.2881 21.7969C23.6953 22.2041 23.6953 22.875 23.2852 23.2852Z"
        fill="#2F2F2F"
      />
      <path
        d="M23.2852 6.71423C23.6953 7.12439 23.6953 7.79529 23.2852 8.20545L8.20605 23.2845C7.7959 23.6947 7.125 23.6947 6.71484 23.2845C6.30469 22.8744 6.30469 22.2035 6.71484 21.7933L21.7969 6.7113C22.2041 6.30408 22.875 6.30408 23.2852 6.71423Z"
        fill="#2F2F2F"
      />
    </svg>
  );

  const failedList = [
    {
      id: 1,
      type: 2,
      level: 1,
      imgUrl: "https://api.ccexlab.com/ccr/product/product-1.gif",
      payUsdNum: 120.0,
    },
    {
      id: 2,
      type: 2,
      level: 2,
      imgUrl: "https://api.ccexlab.com/ccr/product/product-2.gif",
      payUsdNum: 600.0,
    },
    {
      id: 3,
      type: 2,
      level: 3,
      imgUrl: "https://api.ccexlab.com/ccr/product/product-3.gif",
      payUsdNum: 1200.0,
    },
    {
      id: 4,
      type: 2,
      level: 4,
      imgUrl: "https://api.ccexlab.com/ccr/product/product-4.gif",
      payUsdNum: 3600.0,
    },
    {
      id: 5,
      type: 2,
      level: 5,
      imgUrl: "https://api.ccexlab.com/ccr/product/product-5.gif",
      payUsdNum: 6000.0,
    },
    {
      id: 6,
      type: 2,
      level: 6,
      imgUrl: "https://api.ccexlab.com/ccr/product/product-6.gif",
      payUsdNum: 12000.0,
    },
  ];

  return (
    <div className="px-18">
      <div className="">
        {/* 加载中临时列表 */}
        {!isFinally
          ? failedList.map((item: any, index: number) => (
              <div
                className="mb-[16px] px-[3px] float-left w-[50%]"
                key={index}
              >
                <div
                  className="bg-[#fff] p-8 rounded-lg"
                  style={{
                    boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <div className="image-container">
                    <img
                      className="rounded-lg mr-12"
                      src={item.imgUrl}
                      alt=""
                    />
                  </div>
                  <div className="flex-1">
                    <div className="h-[32px] line-clamp-1_1 text-[#121212] pt-12 pb-4 text-[12px] font-bold leading-[19px]">
                      {Number(item.level) === 1
                        ? t("342")
                        : Number(item.level) === 2
                        ? t("343")
                        : Number(item.level) === 3
                        ? t("344")
                        : Number(item.level) === 4
                        ? t("345")
                        : Number(item.level) === 5
                        ? t("346")
                        : Number(item.level) === 6
                        ? t("347")
                        : t("348")}
                    </div>
                    <div
                      className=" font-bold  pt-4"
                      style={{ display: props.type !== 2 ? "flex" : "none" }}
                    >
                      <div className="text-[#2EBD85] text-[16px] font-bold flex-1">
                        {item.payUsdNum}$
                      </div>
                      <div className="text-[14px] bg-[#51E04E] text-[#fff] px-16 py-4  rounded-lg">
                        {t("12")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : ""}
        {/* 正式列表 */}
        {list.map((item: any, index: number) => (
          <div className="mb-[16px] px-[3px] float-left w-[50%]" key={index}>
            <div
              className="bg-[#fff] p-8 rounded-lg"
              style={{
                boxShadow: "0px 5px 20px 0px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className="image-container">
                <img className="rounded-lg mr-12" src={item.imgUrl} alt="" />
              </div>
              {/* <img
                  className="w-[148px] h-[148px] rounded-lg mr-12"
                  src={item.imgUrl}
                  alt=""
                /> */}
              <div className="flex-1">
                <div className="h-[32px] line-clamp-1_1 text-[#121212] pt-12 pb-4 text-[12px] font-bold leading-[19px]">
                  {Number(item.level) === 1
                    ? t("342")
                    : Number(item.level) === 2
                    ? t("343")
                    : Number(item.level) === 3
                    ? t("344")
                    : Number(item.level) === 4
                    ? t("345")
                    : Number(item.level) === 5
                    ? t("346")
                    : Number(item.level) === 6
                    ? t("347")
                    : t("348")}
                </div>
                <div
                  className=" font-bold  pt-4"
                  style={{ display: props.type !== 2 ? "flex" : "none" }}
                >
                  <div className="text-[#2EBD85] text-[16px] font-bold flex-1">
                    {item.payUsdNum}$
                  </div>
                  <div
                    className="text-[14px] bg-[#51E04E] text-[#fff] px-16 py-4  rounded-lg"
                    onClick={() => {
                      if (item.isOpen === 1) {
                        setIsModalOpen(true);
                        setBuyProduct(item);
                      } else {
                        notification.success({
                          duration: 2,
                          message: t("349"),
                          className: "custom-notification",
                        });
                      }
                    }}
                  >
                    {t("12")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="clearfix"></div>
      </div>
      {/* 购买弹框 */}
      <Modal
        width={327}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setPlayType(0);
        }}
        footer={null}
        title={null}
        closeIcon={closeIcon}
      >
        <div className="text-[#2F2F2F] text-[18px] font-bold text-center relative top-[-6px]">
          {t("13")}
        </div>
        <div
          className="pt-[20px] mt-14"
          style={{ borderTop: "1px solid rgba(18, 18, 18, 0.10)" }}
        >
          <div className="mx-[20px]">
            <div className="mb-14 text-[#2F2F2F] text-[16px] font-bold">
              {t("358")}
            </div>
            <div className="flex">
              <div
                className={
                  playType === 0
                    ? "text-[#2F2F2F] text-[16px] font-bold flex items-center flex-1"
                    : "text-[#B8B8B8] text-[16px] font-bold flex items-center flex-1"
                }
                onClick={() => setPlayType(0)}
              >
                <svg
                  style={{ display: playType === 0 ? "block" : "none" }}
                  className="mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#B6F0E1" />
                  <circle cx="8" cy="8" r="5" fill="#51E04E" />
                </svg>
                <svg
                  style={{ display: playType !== 0 ? "block" : "none" }}
                  className="mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#D9D9D9" />
                  <circle cx="8" cy="8" r="5" fill="#B8B8B8" />
                </svg>
                USDT
              </div>
              <div
                className={
                  playType === 1
                    ? "text-[#2F2F2F] text-[16px] font-bold flex items-center flex-1 whitespace-nowrap"
                    : "text-[#B8B8B8] text-[16px] font-bold flex items-center flex-1 whitespace-nowrap"
                }
                onClick={() => setPlayType(1)}
              >
                <svg
                  style={{ display: playType === 1 ? "block" : "none" }}
                  className="mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#B6F0E1" />
                  <circle cx="8" cy="8" r="5" fill="#51E04E" />
                </svg>
                <svg
                  style={{ display: playType !== 1 ? "block" : "none" }}
                  className="mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#D9D9D9" />
                  <circle cx="8" cy="8" r="5" fill="#B8B8B8" />
                </svg>
                {t("14")}
              </div>
            </div>
            <div
              className="mt-[20px] bg-[#FFF] rounded-[8px] py-12 text-[#51E04E] text-[18px] font-bold text-center"
              style={{ boxShadow: "#0000003d 0px 5px 20px 0px" }}
            >
              {playType === 0 ? (
                <>
                  {t("17")}： {buyProduct.payUsdNum} U
                </>
              ) : (
                <>
                  {t("18")}：{buyProduct.payJhbNum} JHB+{buyProduct.payCpbNum}{" "}
                  TQB
                </>
              )}
            </div>
            <div
              className="h-1 mt-24 mb-20"
              style={{
                background:
                  "linear-gradient(90deg, rgba(81, 224, 78, 0.00) 0%, rgba(81, 224, 78, 0.50) 44.5%, rgba(81, 224, 78, 0.00) 100%)",
              }}
            ></div>
            <div className="mb-14 text-[#2F2F2F] text-[16px] font-bold">
              {t("359")}
            </div>
            <div className="flex">
              <div
                className={
                  coinName === "JHB"
                    ? "text-[#2F2F2F] text-[16px] font-bold flex items-center flex-1"
                    : "text-[#B8B8B8] text-[16px] font-bold flex items-center flex-1"
                }
                onClick={() => setCoinName("JHB")}
              >
                <svg
                  style={{ display: coinName === "JHB" ? "block" : "none" }}
                  className="mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#B6F0E1" />
                  <circle cx="8" cy="8" r="5" fill="#51E04E" />
                </svg>
                <svg
                  style={{ display: coinName === "CCM" ? "block" : "none" }}
                  className="mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#D9D9D9" />
                  <circle cx="8" cy="8" r="5" fill="#B8B8B8" />
                </svg>
                JHB
              </div>
              <div
                className={
                  coinName === "CCM"
                    ? "text-[#2F2F2F] text-[16px] font-bold flex items-center flex-1 whitespace-nowrap"
                    : "text-[#B8B8B8] text-[16px] font-bold flex items-center flex-1 whitespace-nowrap"
                }
                onClick={() => setCoinName("CCM")}
              >
                <svg
                  style={{ display: coinName === "CCM" ? "block" : "none" }}
                  className="mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#B6F0E1" />
                  <circle cx="8" cy="8" r="5" fill="#51E04E" />
                </svg>
                <svg
                  style={{ display: coinName === "JHB" ? "block" : "none" }}
                  className="mr-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle cx="8" cy="8" r="8" fill="#D9D9D9" />
                  <circle cx="8" cy="8" r="5" fill="#B8B8B8" />
                </svg>
                CCM
              </div>
            </div>
            <div className="text-[#848484] text-[12px] font-bold mt-10 mb-[30px]">
              *{t("15")}
            </div>
          </div>
          <div
            className="w-[160px] mx-auto text-[16px] bg-[#51E04E] text-[#fff] font-bold px-16 py-6 text-center rounded-lg whitespace-nowrap"
            onClick={handleBuy}
          >
            {t("16")}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ComponentName;
