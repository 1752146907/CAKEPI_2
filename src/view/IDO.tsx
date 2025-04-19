import "../assets/style/Invite.scss";
import { Modal, Pagination, Tooltip } from "antd";
import { useLayoutEffect, useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  GetUserAccountDetail,
  getAllAward,
  getIdoAccountInfo,
  getIdoBuyRecord,
} from "../API";
import {
  AddrHandle,
  NumSplic1,
  addMessage,
  dateFormat,
  showLoding,
} from "../utils/tool";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import copyFun from "copy-to-clipboard";
import styled from "styled-components";
import { FlexBox, FlexCCBox, FlexSCBox } from "../components/FlexBox";
import { Contracts } from "../web3";
import useUSDTGroup from "../hooks/useUSDTGroup";
import { contractAddress } from "../config";
import { decimalNum } from "../utils/decimalNum";
import { useGetReward } from "../hooks/useGetReward";
import { useReceiveBep } from "../hooks/useReceiveBep";
import ClaimRecord from "../components/ido/ClaimRecord";
interface Data {
  refereeCreditAll: number;
  refereeNum: number;
  refereePassNum: number;
}

const AllContainer = styled.div`
  /* width: 100%; */
  /* padding: 30px 0px; */
  margin: 30px 18px 0px 18px;
`;

const AllContainer_Title = styled.div`
  color: #fff;
  font-family: "Inter";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const BuyContainer = styled.div`
  position: relative;
  margin-top: 30px;
  width: 100%;
  padding: 20px 18px;
  border-radius: 16px;
  background: #23262c;
  box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
  z-index: 99;

  > img {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 144px;
    z-index: -1;
  }
`;
const BuyContainer_Info = styled.div`
  > div {
    color: #fff;
    font-family: "Inter";
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 16px;
    &:nth-child(3) {
      color: rgba(255, 255, 255, 0.8);
      font-family: "Inter";
      font-size: 12px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      margin-bottom: 32px;
    }
  }
`;

const ProcessContainer = styled(FlexCCBox)`
  width: 100%;
  color: rgba(255, 255, 255, 0.8);
  font-family: "Inter";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-bottom: 46px;
`;

const ProcessBox = styled(FlexBox)`
  width: 100%;
  border-radius: 10px;
  background: #31353f;
  height: fit-content;
  margin-right: 4px;
  > div {
    height: 12px;
    border-radius: 10px;
    background: linear-gradient(90deg, #06d7ee 0%, #0177fb 100%);
  }
`;

const Btn = styled(FlexCCBox)<{ active: Boolean }>`
  max-width: 130px;
  width: 100%;
  padding: 8px 14px;
  color: #000;
  font-family: "Inter";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 8px;
  background: ${({ active }) =>
    active
      ? `linear-gradient(90deg, #06d7ee 0%, #0177fb 100%)`
      : "linear-gradient(90deg, rgba(6, 215, 238, 0.50) 0%, rgba(1, 119, 251, 0.50) 100%)"};
`;

const BtnContainer = styled(FlexSCBox)`
  width: 100%;
  margin-bottom: 12px;
  > span {
    margin-left: 12px;
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.8);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;
const ToBtnContainer = styled(BtnContainer)``;

const AllModal = styled(Modal)`
  z-index: 10000;

  .ant-modal-content {
    overflow: hidden;
    border-radius: 16px;
    background: #23262c;
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.1);
    .ant-modal-body {
      border-radius: 20px;
      position: relative;
      min-height: 124px;
      padding: 24px 15px;
    }
  }
`;

const ModalContainer = styled(FlexBox)`
  /* position: relative; */
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: "Inter";
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  .home {
    width: 100%;
    .box2 {
      width: 100%;

      margin: 0px;
    }
    .box2-content {
      border-radius: 0px;
    }
  }
`;

const ModalContainer_Close = styled(FlexCCBox)`
  position: absolute;
  z-index: 100;
  top: 10px;
  right: 10px;
  z-index: 100;
`;

export const ModalContainer_Title_Container = styled(FlexBox)`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  > img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  > svg {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
`;

export const ModalContainer_Title = styled(FlexCCBox)`
  font-family: "PingFang SC";
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  text-transform: capitalize;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #ffffff;
`;

const ModalContainer_Content = styled.div`
  width: 100%;
  margin-top: 20px;
  font-family: "PingFang SC";
  font-size: 12px;
  font-weight: normal;
  line-height: normal;
  text-transform: capitalize;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #ffffff;
  padding: 15px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > input {
    margin: 7px 0px 15px;
    width: 100%;

    box-sizing: border-box;
    border: 1px solid rgba(213, 104, 25, 0.2);
    text-align: left;

    font-family: "PingFang SC";
    font-size: 12px;
    font-weight: normal;
    line-height: normal;
    letter-spacing: 0px;

    font-variation-settings: "opsz" auto;
    color: #999999;

    border-radius: 8px;
    padding: 8px 11px;
    background: #ffffff;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const ModalContainer_Content_Table = styled.div`
  width: 100%;
  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .content {
    /* border: 1px solid rgba(236, 234, 243, 0.1);
    background: #2f333b; */
    > div {
      padding: 20px 0px;
    }
  }
  .input-main {
    display: flex;
    align-items: center;
    padding: 16px;
    border-radius: 10px;
    background: #31353f;
    color: #fff;
    font-size: 14px;
    input {
      flex: 1;
      margin-right: 10px;
      background: none;
      border: none;
      font-weight: 700;
    }
    span {
      font-feature-settings: "clig" off, "liga" off;
      font-weight: 700;
    }
  }
  .tips {
    color: rgba(255, 255, 255, 0.5);
    font-feature-settings: "clig" off, "liga" off;
    font-family: Inter;
    font-size: 12px;
    font-weight: 700;
    padding: 8px 0px 30px 0px;
  }
`;

const Invite = () => {
  const { t, i18n } = useTranslation();
  const { account } = useWeb3React<any>();
  const token = useSelector<any>((state) => state.token);

  const spanRef = useRef<HTMLSpanElement>(null);

  const [type, setType] = useState(0);
  const [alldata, setAlldata] = useState({
    refereeCreditAll: 0,
    refereeNum: 0,
    refereePassNum: 0,
  });
  const [RecordModal, setRecordModal] = useState<any>(false);
  const [IdoInfo, setIdoInfo] = useState<any>({});
  const [IdoAccountInfo, setIdoAccountInfo] = useState<any>({});
  const [IdoBuyRecord, setIdoBuyRecord] = useState<any>({});
  const [winWidth, setWidth] = useState(window.innerWidth);
  const [lan, setLan] = useState<any>();
  const { getReward } = useGetReward();
  const { receiveBep } = useReceiveBep(); // 领取bep

  const { TOKENAllowance, TOKENBalance, handleTransaction, handleUSDTRefresh } =
    useUSDTGroup(contractAddress.Ido, "USDT");
  const getContractData = async () => {
    let res1 = await Contracts.example?.maxIdoTokenNum(account as string);
    let res2 = await Contracts.example?.currentIdoTokenNum(account as string);
    let userinfosData = await Contracts.example?.userinfos(account as string);
    console.log(userinfosData, "userinfosData");

    setIdoInfo({
      maxIdoTokenNum: res1,
      currentIdoTokenNum: res2,
      idoNum: userinfosData?.idoNum,
    });
  };
  const getData = () => {
    getIdoAccountInfo().then((res: any) => {
      setIdoAccountInfo(res?.data || {});
    });
    getIdoBuyRecord().then((res: any) => {
      setIdoBuyRecord(res?.data || {});
    });
  };

  const buyIdo = async () => {
    showLoding(true);
    let res;
    try {
      res = await Contracts.example?.buyIdo(account as string, buyNumber + "");
    } catch (error: any) {
      showLoding(false);
      return addMessage(t("50"));
    }
    showLoding(false);
    setBuyModal(false);
    if (!!res?.status) {
      getContractData();
      return addMessage(t("51"));
    } else {
      return addMessage(t("50"));
    }
  };

  const getRewardFun = (amount: any) => {
    if (Number(amount) <= 0) return addMessage(t("52"));
    getReward(1, getData, () => {}, "Ido");
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!token) return;
    getData();
  }, [token, RecordModal]);
  useEffect(() => {
    if (!account) return;
    getContractData();
  }, [account]);

  const [accounttype, setAccountType] = useState<any>(1);
  const handleGetUserAccountDetail = async (type: number) => {
    setAccountType(type);
  };
  useEffect(() => {
    if (token) {
      handleGetUserAccountDetail(1);
    }
  }, [token]);

  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [buyNumber, setBuyNumber] = useState<number>();

  return (
    <div className="home">
      <AllContainer>
        <AllContainer_Title>{t("2")}</AllContainer_Title>
        <BuyContainer>
          <BuyContainer_Info>
            <div>
              {t("23")}：100U=1{t("25")}
            </div>
            <div>
              {t("24")}：1000U=10{t("25")}
            </div>
            <div>*{t("26")}</div>
          </BuyContainer_Info>
          <ProcessContainer>
            <ProcessBox>
              <div
                style={{
                  width: `${
                    !!IdoInfo?.maxIdoTokenNum
                      ? NumSplic1(
                          Number(IdoInfo?.currentIdoTokenNum) /
                            Number(IdoInfo?.maxIdoTokenNum),
                          4
                        ) * 100
                      : 0
                  }`,
                }}
              ></div>
            </ProcessBox>
            {!!IdoInfo?.maxIdoTokenNum
              ? (
                  NumSplic1(
                    Number(IdoInfo?.currentIdoTokenNum) /
                      Number(IdoInfo?.maxIdoTokenNum),
                    4
                  ) * 100
                ).toFixed(2)
              : 0}
            %
          </ProcessContainer>
          {IdoInfo?.idoNum && Number(IdoInfo?.idoNum) > 0 ? (
            <>
              <ToBtnContainer>
                <Btn active={false}>{t("27")}</Btn>{" "}
                <span
                  onClick={() => {
                    setRecordModal(true);
                  }}
                >
                  {t("28")}
                </span>
              </ToBtnContainer>
              <Btn
                active={true}
                onClick={() => {
                  receiveBep(getData, "Ido");
                }}
              >
                {t("59")}
              </Btn>
            </>
          ) : (
            <>
              <ToBtnContainer>
                <Btn
                  active={true}
                  onClick={async (event: any) => {
                    event.stopPropagation();
                    // await handleTransaction(100 + "", async (call2) => {}).then(
                    //   () => {
                    //     handleUSDTRefresh();
                    //     buyIdo();
                    //   }
                    // );
                    setBuyModal(true);
                  }}
                >
                  {t("27")}
                </Btn>
              </ToBtnContainer>
            </>
          )}
        </BuyContainer>
      </AllContainer>
      <div className="box3">
        <div className="title1">{t("29")}</div>
        <div className="box3-main">
          {/* <div className="box3-main-li">
            <div className="box3-main-li-text">
              累计BEP60
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99999 7.79712C11.5283 7.79712 14.1889 6.63285 14.1889 5.08868C14.1889 3.54452 11.5283 2.38025 7.99999 2.38025C4.47165 2.38025 1.81104 3.54452 1.81104 5.08868C1.81104 6.63285 4.47165 7.79712 7.99999 7.79712ZM2.67085 5.08868C2.67085 4.31703 4.69845 3.24007 7.99999 3.24007C11.3015 3.24007 13.3291 4.31703 13.3291 5.08868C13.3291 5.86034 11.3015 6.9373 7.99999 6.9373C4.69845 6.9373 2.67085 5.86034 2.67085 5.08868Z"
                  fill="white"
                />
                <path
                  d="M13.6033 9.75801C13.5984 9.75406 13.5932 9.75056 13.5879 9.74748C13.5155 9.68825 13.4265 9.6558 13.3357 9.6558C13.1146 9.6558 12.9347 9.83566 12.9347 10.0568C12.9347 10.1616 12.9755 10.2599 13.0505 10.3358C13.054 10.3406 13.0575 10.345 13.0619 10.3494C13.237 10.5249 13.3457 10.7468 13.3457 10.928C13.3457 11.7067 11.312 12.7933 7.99993 12.7933C4.68786 12.7933 2.65412 11.7067 2.65412 10.928C2.65412 10.7319 2.7028 10.5582 2.94101 10.3485C2.94232 10.3472 2.95855 10.3318 2.95988 10.3305C2.96602 10.3244 2.97128 10.3174 2.97567 10.3099C3.03578 10.2371 3.06868 10.148 3.06868 10.0564C3.06868 9.83526 2.88882 9.6554 2.66772 9.6554C2.56945 9.6554 2.47646 9.69049 2.4032 9.75498C2.39618 9.75892 2.38959 9.76419 2.38345 9.76989C2.01452 10.1292 1.82764 10.5187 1.82764 10.928C1.82764 12.4625 4.48125 13.6198 7.99993 13.6198C11.5186 13.6198 14.1722 12.4625 14.1722 10.928C14.1722 10.5231 13.9871 10.1362 13.6261 9.78217C13.6239 9.77952 13.6055 9.76065 13.6033 9.75801Z"
                  fill="white"
                />
                <path
                  d="M13.5866 6.80039C13.5147 6.74117 13.4265 6.70914 13.3357 6.70914C13.1146 6.70914 12.9347 6.889 12.9347 7.1101C12.9347 7.21494 12.9755 7.31321 13.0505 7.38911C13.054 7.39394 13.0576 7.39832 13.0619 7.40272C13.237 7.5782 13.3458 7.80016 13.3458 7.98135C13.3458 8.76002 11.312 9.84663 7.99995 9.84663C4.68787 9.84663 2.65413 8.76001 2.65413 7.98135C2.65413 7.78526 2.70282 7.61154 2.94103 7.40185C2.94234 7.4001 2.95857 7.38475 2.95989 7.38343C2.9656 7.37773 2.97041 7.37159 2.97436 7.36457C3.03535 7.29175 3.06868 7.20181 3.06868 7.10925C3.06868 6.88815 2.88882 6.70874 2.66772 6.70874C2.56945 6.70874 2.47646 6.74384 2.4032 6.80832C2.39618 6.81227 2.38959 6.81753 2.38345 6.82324C2.01452 7.18251 1.82764 7.57207 1.82764 7.98137C1.82764 9.51588 4.48125 10.6731 7.99993 10.6731C11.5186 10.6731 14.1722 9.51589 14.1722 7.98137C14.1722 7.5769 13.9871 7.18953 13.6098 6.8171C13.6029 6.81005 13.5954 6.80477 13.5866 6.80039Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="box3-main-li-num">123456</div>
          </div> */}
          <div className="box3-main-li">
            <div className="box3-main-li-text">
              {t("30")}USDT
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99999 7.79712C11.5283 7.79712 14.1889 6.63285 14.1889 5.08868C14.1889 3.54452 11.5283 2.38025 7.99999 2.38025C4.47165 2.38025 1.81104 3.54452 1.81104 5.08868C1.81104 6.63285 4.47165 7.79712 7.99999 7.79712ZM2.67085 5.08868C2.67085 4.31703 4.69845 3.24007 7.99999 3.24007C11.3015 3.24007 13.3291 4.31703 13.3291 5.08868C13.3291 5.86034 11.3015 6.9373 7.99999 6.9373C4.69845 6.9373 2.67085 5.86034 2.67085 5.08868Z"
                  fill="white"
                />
                <path
                  d="M13.6033 9.75801C13.5984 9.75406 13.5932 9.75056 13.5879 9.74748C13.5155 9.68825 13.4265 9.6558 13.3357 9.6558C13.1146 9.6558 12.9347 9.83566 12.9347 10.0568C12.9347 10.1616 12.9755 10.2599 13.0505 10.3358C13.054 10.3406 13.0575 10.345 13.0619 10.3494C13.237 10.5249 13.3457 10.7468 13.3457 10.928C13.3457 11.7067 11.312 12.7933 7.99993 12.7933C4.68786 12.7933 2.65412 11.7067 2.65412 10.928C2.65412 10.7319 2.7028 10.5582 2.94101 10.3485C2.94232 10.3472 2.95855 10.3318 2.95988 10.3305C2.96602 10.3244 2.97128 10.3174 2.97567 10.3099C3.03578 10.2371 3.06868 10.148 3.06868 10.0564C3.06868 9.83526 2.88882 9.6554 2.66772 9.6554C2.56945 9.6554 2.47646 9.69049 2.4032 9.75498C2.39618 9.75892 2.38959 9.76419 2.38345 9.76989C2.01452 10.1292 1.82764 10.5187 1.82764 10.928C1.82764 12.4625 4.48125 13.6198 7.99993 13.6198C11.5186 13.6198 14.1722 12.4625 14.1722 10.928C14.1722 10.5231 13.9871 10.1362 13.6261 9.78217C13.6239 9.77952 13.6055 9.76065 13.6033 9.75801Z"
                  fill="white"
                />
                <path
                  d="M13.5866 6.80039C13.5147 6.74117 13.4265 6.70914 13.3357 6.70914C13.1146 6.70914 12.9347 6.889 12.9347 7.1101C12.9347 7.21494 12.9755 7.31321 13.0505 7.38911C13.054 7.39394 13.0576 7.39832 13.0619 7.40272C13.237 7.5782 13.3458 7.80016 13.3458 7.98135C13.3458 8.76002 11.312 9.84663 7.99995 9.84663C4.68787 9.84663 2.65413 8.76001 2.65413 7.98135C2.65413 7.78526 2.70282 7.61154 2.94103 7.40185C2.94234 7.4001 2.95857 7.38475 2.95989 7.38343C2.9656 7.37773 2.97041 7.37159 2.97436 7.36457C3.03535 7.29175 3.06868 7.20181 3.06868 7.10925C3.06868 6.88815 2.88882 6.70874 2.66772 6.70874C2.56945 6.70874 2.47646 6.74384 2.4032 6.80832C2.39618 6.81227 2.38959 6.81753 2.38345 6.82324C2.01452 7.18251 1.82764 7.57207 1.82764 7.98137C1.82764 9.51588 4.48125 10.6731 7.99993 10.6731C11.5186 10.6731 14.1722 9.51589 14.1722 7.98137C14.1722 7.5769 13.9871 7.18953 13.6098 6.8171C13.6029 6.81005 13.5954 6.80477 13.5866 6.80039Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="box3-main-li-num">
              {IdoAccountInfo?.amount ?? "0"}
            </div>
          </div>
        </div>
        <div
          className="box3-submit"
          onClick={() => {
            getRewardFun(IdoAccountInfo?.amount ?? "0");
          }}
        >
          {t("31")}
        </div>
      </div>

      <div className="box2">
        <div className="box2-title">
          <span
            onClick={() => {
              handleGetUserAccountDetail(1);
            }}
            className={accounttype === 1 ? "on" : ""}
          >
            {t("32")}
          </span>
          <span
            onClick={() => {
              handleGetUserAccountDetail(2);
            }}
            className={accounttype === 2 ? "on" : ""}
          >
            {t("33")}
          </span>
        </div>
        <div className="box2-content">
          <div className="box2-content-top">
            <div className="li">{t("34")}</div>
            <div className="li"></div>
            <div className="li">{t("35")}</div>
          </div>
          <div className="box2-content-bottom">
            <ClaimRecord accounttype={accounttype}></ClaimRecord>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <AllModal
        visible={RecordModal}
        className="Modal"
        centered
        width={"340px"}
        closable={false}
        footer={null}
        onCancel={() => {
          setRecordModal(false);
        }}
      >
        <ModalContainer>
          {/* <HomeContainerBox_Content_Bg3></HomeContainerBox_Content_Bg3> */}
          <ModalContainer_Close>
            {" "}
            <div
              onClick={() => {
                setRecordModal(false);
              }}
            />
          </ModalContainer_Close>
          {t("36")}
          <ModalContainer_Content>
            <ModalContainer_Content_Table>
              <div>
                <div className="li">{t("35")}</div>
                <div className="li">{t("34")}</div>
              </div>
              <div className="content">
                <div className="li">
                  {IdoBuyRecord?.createTime
                    ? dateFormat(
                        "YYYY-mm-dd",
                        new Date(IdoBuyRecord?.createTime)
                      )
                    : ""}
                </div>
                <div className="li">{IdoBuyRecord?.payAmount}</div>
              </div>
            </ModalContainer_Content_Table>
          </ModalContainer_Content>
        </ModalContainer>
      </AllModal>

      <AllModal
        visible={buyModal}
        className="Modal"
        centered
        width={"340px"}
        closable={false}
        footer={null}
        onCancel={() => {
          setBuyModal(false);
        }}
      >
        <ModalContainer>
          {/* <HomeContainerBox_Content_Bg3></HomeContainerBox_Content_Bg3> */}
          <ModalContainer_Close>
            {" "}
            <div
              onClick={() => {
                setBuyModal(false);
              }}
            />
          </ModalContainer_Close>
          {t("46")}
          <ModalContainer_Content>
            <ModalContainer_Content_Table>
              <div className="input-main">
                <input
                  type="text"
                  onChange={(e: any) => {
                    setBuyNumber(e.target.value);
                  }}
                  value={buyNumber}
                  placeholder={t("48") + "(100~1000)"}
                />
                <span
                  onClick={() => {
                    setBuyNumber(1000);
                  }}
                >
                  {t("24")}
                </span>
              </div>
              <div className="tips">*{t("47")}</div>
            </ModalContainer_Content_Table>
            <Btn
              active={true}
              onClick={async (event: any) => {
                event.stopPropagation();
                if (Number(buyNumber) < 100 || Number(buyNumber) > 1000) {
                  addMessage(t("50"));
                  return;
                }
                await handleTransaction(
                  buyNumber + "",
                  async (call2) => {}
                ).then(() => {
                  handleUSDTRefresh();
                  buyIdo();
                });
              }}
            >
              {t("46")}
            </Btn>
          </ModalContainer_Content>
        </ModalContainer>
      </AllModal>
    </div>
  );
};

export default Invite;
