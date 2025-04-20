import { Contract } from "web3-eth-contract";
import { provider } from "web3-core";
import Web3 from "web3";
import { abiObj, contractAddress, isMain } from "./config";
declare let window: any;
interface contractType {
  [propName: string]: Contract;
}
export const ChainId = {
  // BSC: "0x61",
  BSC: isMain ? "0x38" : "0x61",
};
//切换链
const SCAN_ADDRESS = {
  [ChainId.BSC]: "https://bscscan.com",
};
//配置连接链的信息
export const networkConf = {
  [ChainId.BSC]: {
    // chainId: '0x61',
    chainId: isMain ? "0x38" : "0x61",
    chainName: "BSC",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: isMain
      ? ["https://bsc-dataseed.binance.org/"]
      : ["https://bsc-testnet.public.blastapi.io"],
    blockExplorerUrls: [SCAN_ADDRESS[ChainId.BSC]],
  },
};

// 一个随机数
const mathRandom = (Math.random() * (0.0009 - 0.0005) + 0.0005).toFixed(8);

//切换链
export const changeNetwork = (chainId: number) => {
  return new Promise<void>((reslove) => {
    const { ethereum } = window;
    if (ethereum && ethereum.isMetaMask && networkConf[chainId]) {
      ethereum
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              ...networkConf[chainId],
            },
          ],
        })
        .then(() => {
          setTimeout(reslove, 500);
        });
    } else {
      reslove();
    }
  });
};

export class Contracts {
  //单例
  static example: Contracts;
  web3: Web3;
  contract: contractType = {};
  constructor(library: provider) {
    this.web3 = new Web3(library);
    //保存实例到静态属性
    Contracts.example = this;
  }
  //判断合约是否实例化
  verification(contractName: string) {
    if (!this.contract[contractName]) {
      this.contract[contractName] = new this.web3.eth.Contract(
        abiObj[contractName],
        contractAddress[contractName]
      );
    }
  }
  //合约的方法

  //查询BNB余额
  getBalance(addr: string) {
    return this.web3.eth.getBalance(addr);
  }
  totalSupply(addr: string) {
    this.verification("BKBK");
    return this.contract.BKBK?.methods.totalSupply().call({ from: addr });
  }
  //查询余额
  balanceOf(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.balanceOf(addr).call({ from: addr });
  }
  symbol(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.symbol().call({ from: addr });
  }
  //查询授权
  Tokenapprove(addr: string, toaddr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.allowance(addr, toaddr).call({ from: addr });
  }
  //授权1
  approve(addr: string, toaddr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    // var amount = Web3.utils.toBN("99999999999999999999999999999999")
    var amount = Web3.utils.toWei(Number.MAX_SAFE_INTEGER + "", "ether");
    return obj?.methods
      .approve(toaddr, amount)
      .send({ from: addr, gasPrice: "5000000000" });
  }

  //签名数据
  Sign(addr: string, msg: string) {
    return this.web3.eth.personal.sign(
      this.web3.utils.utf8ToHex(msg) as string,
      addr,
      "123"
    );
  }

  //授权所有NFT
  setApprovalForAll(addr: string, toAddr: string, isApprova: boolean) {
    this.verification("NFT");
    return this.contract.NFT?.methods
      .setApprovalForAll(toAddr, isApprova)
      .send({ from: addr, gasPrice: "5000000000" });
  }

  //判断NFT授权
  isApprovedForAll(addr: string, toAddr: string) {
    this.verification("NFT");
    return this.contract.NFT?.methods
      .isApprovedForAll(addr, toAddr)
      .call({ from: addr });
  }

  //查询绑定
  bound(addr: string) {
    this.verification("Entrance");
    return this.contract.Entrance?.methods.bound(addr).call({ from: addr });
  }
  //绑定
  boundReferer(addr: string, toAddr: string) {
    this.verification("Entrance");
    return this.contract.Entrance?.methods
      .boundReferer(toAddr)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  withdrawReward(addr: string, data: string, contractName: string = "Ido") {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.withdrawReward(data).send({
      from: addr,
      gasPrice: "5000000000",
      value: Web3.utils.toWei(mathRandom),
    });
  }
  withdrawReward1(addr: string, contractName: string) {
    this.verification(contractName);
    let obj = new this.web3.eth.Contract(
      abiObj[contractName],
      contractAddress[contractName]
    );
    return obj?.methods.withdraw().send({ from: addr, gasPrice: "5000000000" });
  }

  //撤回
  unStake(addr: string) {
    this.verification("Quantification");
    console.log(this.contract.Quantification);

    return this.contract.Quantification?.methods
      .unStake()
      .send({ from: addr, gasPrice: "5000000000" });
  }

  //质押
  stakeNFT(addr: string, id: any) {
    let Contract = new this.web3.eth.Contract(
      abiObj.Stake,
      contractAddress.Stake
    );
    console.log(id);

    return Contract.methods
      .stake(contractAddress.PassNft, id)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  //撤回
  unStakeNFT(addr: string, data: any) {
    let Contract = new this.web3.eth.Contract(
      abiObj.Stake,
      contractAddress.Stake
    );
    // console.log(contractAddress.Market,tokenId)
    return Contract?.methods
      .unstake(data)
      .send({ from: addr, gasPrice: "5000000000" });
  }

  approveMarket(addr: string, addr721: string) {
    let Contract = new this.web3.eth.Contract(abiObj.PassNft, addr721);
    // console.log(contractAddress.Market,tokenId)
    return Contract.methods
      .setApprovalForAll(contractAddress.Stake, true)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  //查询721授权
  getapproveMarket(addr: string, addr721: string) {
    let Contract = new this.web3.eth.Contract(abiObj.PassNft, addr721);
    return Contract.methods
      .isApprovedForAll(addr, contractAddress.Stake)
      .call({ from: addr });
  }


  maxIdoTokenNum(addr: string) {
    this.verification("Ido");
    console.log(this.contract.Ido);

    return this.contract.Ido?.methods.maxIdoTokenNum().call({ from: addr });
  }
  currentIdoTokenNum(addr: string) {
    this.verification("Ido");
    console.log(this.contract.Ido);

    return this.contract.Ido?.methods.currentIdoTokenNum().call({ from: addr });
  }

  buyIdo(addr: string, amount: string) {
    this.verification("Ido");
    console.log(this.contract.Ido);
    var amounted = Web3.utils.toWei(amount + "", "ether");

    return this.contract.Ido?.methods
      .buyIdo(amounted)
      .send({ from: addr, gasPrice: "5000000000" });
  }
  userinfos(addr: string) {
    this.verification("Ido");

    return this.contract.Ido?.methods?.userInfos(addr).call({ from: addr });
  }

  // 领取奖励
  ClaimIdoTokenBep(addr: string, contractName: string = "Ido") {
    this.verification(contractName);
    return this.contract.Ido?.methods.claimIdoToken().call();
  }
  // 购买CC产品
  buyCc(addr: any, data: any) {
    this.verification("CC");

    return this.contract.CC?.methods.buy(data).send({
      from: addr,
      gasPrice: "5000000000",
      value: Web3.utils.toWei(mathRandom),
    });
  }
  // 购买Nft
  buyNft(addr: any, data: any) {
    this.verification("NFTManage");

    return this.contract.NFTManage?.methods.mint(data).send({
      from: addr,
      // gasPrice: "5000000000",
      // value: Web3.utils.toWei(mathRandom),
    });
  }
  // 领取奖励
  drawAward(addr: any, data: any) {
    this.verification("NFTManage");

    return this.contract.NFTManage?.methods.withdrawReward(data).send({
      from: addr,
      // gasPrice: "5000000000",
      // value: Web3.utils.toWei(mathRandom),
    });
  }


  /*          分割线             */
  // 参与IDO
  subscription(addr: any, data: any) {
    this.verification("CakeIdo");
    return this.contract.CakeIdo?.methods.subscription(data).send({
      from: addr,
      // gasPrice: "5000000000",
      // value: Web3.utils.toWei(mathRandom),
    });
  }
  // 领取参与IDO的代币
  withdrawIdo(addr: any) {
    this.verification("CakeIdo");
    return this.contract.CakeIdo?.methods.withdraw().send({
      from: addr,
      // gasPrice: "5000000000",
      // value: Web3.utils.toWei(mathRandom),
    });
  }
  // 领取水龙头代币
  withdrawFaucet(addr: any) {
    this.verification("CakeIdo");
    return this.contract.CakeIdo?.methods.withdrawFaucet().send({
      from: addr,
      // gasPrice: "5000000000",
      // value: Web3.utils.toWei(mathRandom),
    });
  }
  // 查询IDO基本信息
  idoInfo(addr: string) {
    this.verification("CakeIdo");
    console.info(this.contract.CakeIdo);
    return this.contract.CakeIdo?.methods.viewIdoInfo().call({ from: addr });
  }
  // 查询IDO基本信息
  cakePiPrice(addr: string) {
    this.verification("CakeIdo");
    return this.contract.CakeIdo?.methods.cakePiPrice().call({ from: addr });
  }
  // 查询参与ido历史记录
  subscriptionHistory(addr: string) {
    this.verification("CakeIdo");
    return this.contract.CakeIdo?.methods.subscriptionHistory(addr).call({ from: addr });
  }
  // 查询奖励历史记录
  rewardHistory(addr: string) {
    this.verification("CakeIdo");
    return this.contract.CakeIdo?.methods.rewardHistory(addr).call({ from: addr });
  }


  // 绑定上级地址
  bindInvitation(addr: any, data: any) {
    this.verification("CakeNode");
    return this.contract.CakeNode?.methods.bind(data).send({
      from: addr,
      // gasPrice: "5000000000",
      // value: Web3.utils.toWei(mathRandom),
    });
  }
  // 查询是否绑定
  isBind(addr: string, data?: any) {
    this.verification("CakeNode");
    return this.contract.CakeNode?.methods.isBind(addr).call({ from: addr });
  } 
  // 查询是否是节点
  isNode(addr: string, data?: any) {
    this.verification("CakeNode");
    return this.contract.CakeNode?.methods.isNode(addr).call({ from: addr });
  }
  // 查询节点信息
  nodeInfo(addr: string, data?: any) {
    this.verification("CakeNode");
    return this.contract.CakeNode?.methods.nodeInfo(addr).call({ from: addr });
  }
  // 根据USDT数量查询对应Cake数量
  calCakeAmountByUsdtAmount(addr: string, data?: any) {
    this.verification("CakeNode");
    return this.contract.CakeNode?.methods.calCakeAmountByUsdtAmount(addr).call({ from: addr });
  }
  // 购买节点
  buyNode(addr: any, data: any) {
    this.verification("CakeNode");
    return this.contract.CakeNode?.methods.BuyNode(data).send({
      from: addr,
      // gasPrice: "5000000000",
      // value: Web3.utils.toWei(mathRandom),
    });
  }
}
