import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import TopBar from "../../components/topBar";
import FooterBar from "../../components/footerBar";
import { useWeb3React } from "@web3-react/core";
import useUSDTGroup from "../../hooks/useUSDTGroup";
import { contractAddress } from "../../config";
import logo from "../../assets/image/logo.jpg"; 
import icon2 from "../../assets/image/icon2.svg" 
import icon4 from "../../assets/image/icon4.png"
import icon5 from "../../assets/image/icon5.svg"
import _icon5 from "../../assets/image/icon5.png"
import _icon6 from "../../assets/image/icon6.png"
import icon7 from "../../assets/image/icon7.png"
import icon8 from "../../assets/image/icon8.png"
import { Modal, notification } from "antd";
import { Contracts } from "../../web3";
import { AddrHandle, showLoding } from "../../utils/tool";
import copy from "copy-to-clipboard";
import { t } from "i18next";
import { getQueryParam } from "../../utils/getUrlParamsLegacy";
import useConnectWallet from "../../hooks/useConnectWallet";
import { useSign } from "../../hooks/useSign";
import Web3 from "web3";
import { useTranslation } from "react-i18next";

const Account = () => {
  const token = useSelector((state: any) => state?.token);

  // usdt余额
  const { TOKENBalance: USDTBalance } = useUSDTGroup(
    contractAddress.CakeNode,
    "Cake"
  );

  const {
    handleTransaction,
    TOKENAllowance,
    handleApprove,
    handleUSDTRefresh,
  } = useUSDTGroup(contractAddress.CakeNode, "Cake");
  const { account } = useWeb3React<any>();


  const handleSubmit = async () => {
    console.log(TOKENAllowance); 
    if (!account) {
      connectWallet();
      return
    } 
    if(isNode) {
      return
    }
    showLoding(false);
    try {
      if (Number(TOKENAllowance) < (Number(nodeInfo?.price)  / 1e18)) {
        await handleApprove();
        await handleUSDTRefresh();
      }
      handleBuyNode()
    } catch (error) {
      console.log(error);
      showLoding(false);
    }
  };

  useEffect(() => {
    if (!account) {
      connectWallet();
      return
    };  
  }, [account]);

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  // 绑定上级地址 
  const exampleValue = getQueryParam("inviteCode") || ""; // 推荐地址
  const [bindAddress, setBindAddress]: any = useState(exampleValue);
  const handleBind = async () => {
    if (!account) return;
    showLoding(true); 
    try { 
      let _res = await Contracts.example?.isBind(account);
      if (_res) {
        showLoding(false);
        return
      }
      console.info('isBind');
      console.info(_res);
      let res
      res = await Contracts.example?.bindInvitation(account, getQueryParam("inviteCode")); 
      console.info('绑定上级地址结果');
      console.info(res);
      showLoding(false);
    } catch (error) {
      console.info(error);
      showLoding(false);
    }
  }
  useEffect(() => {
    if (!account) return;
    if (getQueryParam("inviteCode")) {
      setBindAddress(getQueryParam("inviteCode"))
      handleBind()
    } 
    handleIsNode()
    handleNodeInfo()
  }, [account]);

  // 查询节点信息
  const [nodeInfo, setNodeInfo] = useState<any>({})
  const handleNodeInfo = async () => {
    if (account) { 
      try {
        let res: any
        res = await Contracts.example?.nodeInfo(account);
        console.info('查询节点信息');
        console.info(res);
        setNodeInfo(res); 
      } catch (error) {
        console.info(error); 
      }
    }
  }

  // 查看是否是节点
  const [isNode, setIsNode] = useState(false)
  const handleIsNode = async () => {
    if (account) { 
      try {
        let res: any
        res = await Contracts.example?.isNode(account);
        console.info('查询是否是节点');
        console.info(res);
        setIsNode(res); 
      } catch (error) {
        console.info(error); 
      }
    }
  }

  // 根据USDT数量查询对应Cake数量
  const [cakeAmount, setCakeAmount] = useState(0)
  const handleCakeAmount = async () => {
    if (account) { 
      try {
        let res: any
        res = await Contracts.example?.calCakeAmountByUsdtAmount(USDTBalance);
        console.info('根据USDT数量查询对应Cake数量');
        console.info(res);
        setCakeAmount(res);
      } catch (error) {
        console.info(error); 
      }
    }
  }

  // 购买节点
  const handleBuyNode = async () => {
    if (!account) return;
    showLoding(true);
    try {
      let res
      res = await Contracts.example?.buyNode(account);
      console.info('购买节点');
      console.info(res); 
      showLoding(false);
    } catch (error) {
      console.info(error); 
      showLoding(false);
    }
  }

  const { connectWallet } = useConnectWallet();
  const { signFun } = useSign();
 
  // 查询奖励历史记录
  const [rewardHistory, setRewardHistory] = useState<any>([])
  const handleRewardHistory = async () => {
    if (account) {
      showLoding(true);
      try {
        let res: any
        res = await Contracts.example?.rewardHistory(account);
        console.info('查询奖励历史记录');
        console.info(res);
        let reward = res?.rewardTimes.map((time: any, index: any) => ({
          rewardTimes: time,
          rewardAmount: res?.rewardAmount[index],
          rewardType: res?.rewardType[index]
        }));
        setRewardHistory(reward);
        showLoding(false);
      } catch (error) {
        console.info(error);
        showLoding(false);
      }
    }
  }  

  const [idoHistory, setIdoHistory] = useState<any>([])

  // 时间转换
  const formatCountdown2 = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const formattedDate = date.getFullYear() + '/' +
      String(date.getMonth() + 1).padStart(2, '0') + '/' +
      String(date.getDate()).padStart(2, '0') + ' ' +
      String(date.getHours()).padStart(2, '0') + ':' +
      String(date.getMinutes()).padStart(2, '0')
    // String(date.getSeconds()).padStart(2, '0');
    return formattedDate;
  }

  const handleShar = () => {
    if (!account) return;
    const _url =
      window.origin + "?" + encodeURIComponent("inviteCode=" + account);
    copy(_url);
    notification.open({
      message: t("Copied successfully"),
    });
  };

  const truncateToTwoDecimals = (num: any) => {
    return Math.floor(num * 100) / 100;
  }
  let { t, i18n } = useTranslation();

  // 参与方式
  const [dalamType, setDalamType] = useState(1);

  return (
    <div className="w-full">
      <TopBar />
      {/* <div className="">
        <div className="text-[#fff] text-[26px] font-[700] text-center pb-[30px]">
          USDTBalance: {USDTBalance}
        </div>
        <div onClick={handleSubmit}>1111111: {TOKENAllowance}</div>
      </div> */}
      <div className="h-[358px]" style={{
        backgroundImage: `url(${icon5})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}>
        <div className="text-[#FFAE2E] text-[40px] font-[700] text-center pt-[156px] pb-2" style={{
          textShadow: "3px 4px #4d4c4cc7"
        }}>{t('9')}</div>

        <div className="text-[#fff] text-[16px] font-[700] text-center mx-2 leading-[20px]" style={{
          textShadow: "1px 2px #4d4c4cc7"
        }}> 
          {t('11')} 
        </div>
        <div className="text-[#fff] text-[16px] font-[700] text-center mx-20 leading-[20px]" style={{
          textShadow: "1px 2px #4d4c4cc7"
        }}> 
          {t('12')} </div>
          <div className="flex items-center justify-center pt-[28px]">
            <img src={_icon5} alt="" className="w-[30px] h-[30px] mr-[10px] " />
            <img src={_icon6} alt="" className="w-[30px] h-[30px] " />
          </div>
      </div>

      <div className="pt-6 mx-20 flex mb-10">
        <div className="text-[#fff] text-[16px] font-[600] flex-1">{t('16')}</div>
          <div className="text-[#fff] text-[14px] font-[600] flex justify-end items-center"
            onClick={() => { 
              setOpen2(true)
            }}>
            {t('17')}  
            <img src={icon8} className="w-[16px] ml-2" alt="" />
          </div>
      </div>

      {
        account ? <div className="bg-[rgba(255,255,255,0.2)] p-10 mx-20 rounded-[10px] flex items-center">
          <div className="text-[#fff] text-[14px] font-[600] flex-1">{
            AddrHandle(window.origin + "?" + encodeURIComponent("inviteCode=" + account),
              26,
              4
            )}</div>
          <img src={icon2} alt=""
            onClick={handleShar}
            className="w-[18px] h-[21px] ml-4" />
        </div> : <div className="bg-[rgba(255,255,255,0.2)] p-10 mx-20 rounded-[10px] flex items-center">
          <div className="text-[#fff] text-[14px] font-[600] flex-1">
            ---</div>
          <img src={icon2} alt=""
            onClick={handleShar}
            className="w-[18px] h-[21px] ml-4" />
        </div>
      }

      <div className="text-[#FFAE2E] text-[20px] text-center font-[600] mt-[50px] mb-[64px]">{t('37')}</div>

      <div className="bg-[#2D2D2D] rounded-[16px] mx-[18px] px-16 py-20 relative" style={{ border: '1px solid #FFAE2E' }}>
          <img src={icon7} className="absolute top-[-20px] right-[16px] translate-y-[-30%] w-[140px]" alt="" />
          <div className="text-[#FFAE2E] text-[18px] font-[600] pb-20">{t('38')}</div>
          <div className="flex items-center pb-[8px]">
            <div className="text-[#fff] text-[14px]">{t('39')}：</div>
            {
              nodeInfo?.soldNodeNum === nodeInfo?.nodeNum ?
                <div className="flex-1 text-[#EB111C] text-[16px] text-right">{t('42')}</div>
              : 
                <div className="flex-1 text-right">
                  {
                    nodeInfo?.status ?
                    <div className=" text-[#3AFF89] text-[16px]">{t('41')}</div>
                    :
                    <div className="  text-[#fff] text-[16px] ">{t('40')}</div>
                  }  
                </div> 
            }
          </div>
          <div className="flex items-center pb-[8px]">
            <div className="text-[#fff] text-[14px]">{t('43')}：</div>
            <div className="flex-1 text-[#fff] text-[16px] text-right">{nodeInfo?.soldNodeNum}/{nodeInfo?.nodeNum}</div>
          </div>
          <div className="flex items-center pb-[8px]">
            <div className="text-[#fff] text-[14px]">{t('44')}：</div>
            <div className="flex-1 flex items-center justify-end text-[#fff] text-[16px] text-right"> 
              {Number(nodeInfo?.price)  / 1e18} USDT
            </div>
          </div>
          <div className="flex items-center pb-[8px]">
            <div className="text-[#fff] text-[14px]">{t('45')}：</div>
            <div className="flex-1 text-[#fff] text-[16px] text-right">{( Number(nodeInfo?.soldNodeNum) / Number(nodeInfo?.nodeNum) ) * 100}%</div>
          </div>
          <div className="relative bg-[#404651] h-[10px] w-full rounded-[24px]">
            <div className="absolute top-0 left-0 h-[10px] rounded-[24px]" style={{
              width:( Number(nodeInfo?.soldNodeNum) / Number(nodeInfo?.nodeNum) ) * 100 + '%',
              background: "linear-gradient(90deg, #FFAE2E 0%, #FFAE2E 100%)"
            }}></div>
          </div>
          <div className="flex items-center pb-6 pt-[10px]">
            <div className="text-[#fff] text-[14px]">{t('55')}：</div> 
          </div>
          <div className="pb-[8px] flex items-center">  
            <div
            onClick={() => {setDalamType(1)}}
            className={`${dalamType === 1? 'text-[#FFAE2E]' : 'text-[#fff]'} flex-1  text-[16px] flex items-center`}>
              {dalamType === 1?
                  <div className="w-[16px] h-[16px] mr-6 bg-[#FFAE2E] rounded-full"></div>
                  :
                  <div className="w-[16px] h-[16px] mr-6 rounded-full"
              style={{border: '1px solid #fff'}}
              ></div> 
              }
              USDT
            </div> 
            <div
            onClick={() => {setDalamType(2)}}
            className={`${dalamType === 2? 'text-[#FFAE2E]' : 'text-[#fff]'} flex-1  text-[16px] flex items-center`}>
              {dalamType === 2?
                  <div className="w-[16px] h-[16px] mr-6 bg-[#FFAE2E] rounded-full"></div>
                  :
                  <div className="w-[16px] h-[16px] mr-6 rounded-full"
              style={{border: '1px solid #fff'}}
              ></div> 
              }
              CAKE
            </div> 
            <div
            onClick={() => {setDalamType(3)}}
            className={`${dalamType === 3? 'text-[#FFAE2E]' : 'text-[#fff]'} flex-1  text-[16px] flex items-center`}>
              {dalamType === 3?
                  <div className="w-[16px] h-[16px] mr-6 bg-[#FFAE2E] rounded-full"></div>
                  :
                  <div className="w-[16px] h-[16px] mr-6 rounded-full"
              style={{border: '1px solid #fff'}}
              ></div> 
              }
              CAKEPI
            </div> 
          </div>
          <div
            onClick={handleSubmit}
            style={{
              opacity: isNode ? 0.5 : 1,
            }}
            className="w-[188px] mx-auto bg-[#FFAE2E] mt-[40px] text-[#000] text-center py-[12px] rounded-[10px] text-[14px] font-[700]">
              {t('54')}
          </div> 
          <div className="pt-[18px] ml-20 "> 
            <div className="text-[#fff] text-[14px] font-[600] flex justify-end items-center"
              onClick={() => { 
                setOpen(true);
              }}>
              {t('36')}
              <img src={icon8} className="w-[16px] ml-2" alt="" />
            </div>
          </div>

        </div>
        
      <div className="px-20 pt-[50px] pb-16 text-[#fff] text-[20px] font-[600]">{t('30')}</div>
      <div className="px-20 pt-4 text-[#fff] text-[14px] font-[600]">{t('31')}</div>
      <div className="px-20 pt-4 text-[#fff] text-[14px] font-[600]">{t('32')}</div>
      <div className="px-20 pt-4 text-[#fff] text-[14px] font-[600]">{t('33')}</div>
      <div className="px-20 pt-4 text-[#fff] text-[14px] font-[600]">{t('34')}</div>
      <div className="px-20 pt-4 text-[#fff] text-[14px] font-[600]">{t('35')}</div>

      <div className="mt-20 mx-[20px]">
        <img src={icon4} alt="" className="w-[100%]" />
      </div>

      {/* 认购记录 */}
      <Modal
        width={350}
        open={open}

        onCancel={() => {
          setOpen(false);
        }}
        closable={false}
        footer={null}
        title={null}
        style={{
        }}
        destroyOnClose={true}
      >
        <div className="pb-16">
          <div className="relative">
            <div className="leading-[20px] text-[#fff] text-[18px] font-[600] px-16 py-14">
              {t('36')}
            </div>
          </div>
          <svg
            className="absolute top-[18px] right-[18px]"
            onClick={() => {
              setOpen(false);
            }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15.5228 15.5234C15.2494 15.7969 14.8021 15.7969 14.5287 15.5234L4.47595 5.4707C4.20251 5.19727 4.20251 4.75 4.47595 4.47656C4.74939 4.20312 5.19666 4.20312 5.47009 4.47656L15.5248 14.5312C15.7963 14.8027 15.7963 15.25 15.5228 15.5234Z" fill="#ffffff" />
            <path d="M15.5228 4.47681C15.7963 4.75024 15.7963 5.19751 15.5228 5.47095L5.47009 15.5237C5.19666 15.7971 4.74939 15.7971 4.47595 15.5237C4.20251 15.2502 4.20251 14.803 4.47595 14.5295L14.5306 4.47485C14.8021 4.20337 15.2494 4.20337 15.5228 4.47681Z" fill="#ffffff" />
          </svg>
          <div className="flex items-center px-16">
            <div className="text-[#A8A8A8] text-[16px] w-[132px]">{t('37')}</div>
            <div className="text-[#A8A8A8] text-[16px] flex-1">{t('46')}</div>
            <div className="text-[#A8A8A8] text-[16px] flex-1 text-right">{t('47')}</div>
          </div>
          <div className="w-full h-[1px] bg-[rgba(255,255,255,0.1)] mt-6 mb-12"></div>
          {
            idoHistory.length > 0 ?
              idoHistory?.map((item: any, index: number) => (
                <div className="flex items-center px-16" key={index}>
                  <div className="text-[#fff] text-[14px] w-[132px]">{formatCountdown2(item?.subscriptionTimes)}</div>
                  <div className="text-[#fff] text-[14px] flex-1 ">100 CACAKE</div >
                  <div className="text-[#fff] text-[14px] flex-1 text-right">{t('48')}</div >
                </div>
              ))
              :
              <div className="text-[#A8A8A8] text-[14px] text-center">{t('No Data')}</div>
          }
        </div>
      </Modal>

      {/* 邀请记录 */}
      <Modal
        width={350}
        open={open2}

        onCancel={() => {
          setOpen2(false);
        }}
        closable={false}
        footer={null}
        title={null}
        style={{
        }}
        destroyOnClose={true}
      >
        <div className="pb-16">
          <div className="relative">
            <div className="leading-[20px] text-[#fff] text-[18px] font-[600] px-16 py-14">
            {t('17')}
            </div>
          </div>
          <svg
            className="absolute top-[18px] right-[18px]"
            onClick={() => {
              setOpen2(false);
            }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15.5228 15.5234C15.2494 15.7969 14.8021 15.7969 14.5287 15.5234L4.47595 5.4707C4.20251 5.19727 4.20251 4.75 4.47595 4.47656C4.74939 4.20312 5.19666 4.20312 5.47009 4.47656L15.5248 14.5312C15.7963 14.8027 15.7963 15.25 15.5228 15.5234Z" fill="#ffffff" />
            <path d="M15.5228 4.47681C15.7963 4.75024 15.7963 5.19751 15.5228 5.47095L5.47009 15.5237C5.19666 15.7971 4.74939 15.7971 4.47595 15.5237C4.20251 15.2502 4.20251 14.803 4.47595 14.5295L14.5306 4.47485C14.8021 4.20337 15.2494 4.20337 15.5228 4.47681Z" fill="#ffffff" />
          </svg>
          <div className="flex items-center px-16">
            <div className="text-[#A8A8A8] text-[16px] w-[128px]">{t("51")}</div>
            <div className="text-[#A8A8A8] text-[16px] flex-1">{t("52")}</div>
            <div className="text-[#A8A8A8] text-[16px] flex-1 text-right">{t("53")}</div>
          </div>
          <div className="w-full h-[1px] bg-[rgba(255,255,255,0.1)] mt-6 mb-12"></div>
          {
            rewardHistory.length > 0 ?
              rewardHistory?.map((item: any, index: number) => (
                <div className="flex items-center px-16" key={index}>
                  <div className="text-[#fff] text-[14px] w-[128px]">{formatCountdown2(item?.rewardTimes)}</div>
                  <div className="text-[#fff] text-[14px] flex-1 flex items-center">
                  {
                  AddrHandle(item?.address,
                    6,
                    4
                  )}
                  <img src={icon7} className="w-[16px] h-[16px] ml-2" alt="" />
                  </div>
                  <div className="text-[#fff] text-[14px] flex-1 text-right">
                    8888
                  </div>
                </div>
              ))
              :
              <div className="text-[#A8A8A8] text-[14px] text-center">{t('No Data')}</div>
          }
        </div>
      </Modal>


      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default Account;
