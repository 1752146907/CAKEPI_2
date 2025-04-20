import Token from "./ABI/ERC20Token.json";
import Stake from "./ABI/Stake.json";
import PassNft from "./ABI/PassNft.json";
import CC from "./ABI/Cc.json";
import NFTManage from "./ABI/NFTManage.json";
import CakeIdo from "./ABI/Cake.json";
import CakeNode from "./ABI/CakeNode.json";

export const LOCAL_KEY = "MBAS_LANG";
// 判断环境
export const isMain = false;
// 自己 /api
const windowHost = window.location.origin;
let pattern =
  /^(http:\/\/localhost|http:\/\/192\.168|https:\/\/localhost|https:\/\/192\.168|file:\/\/*)/i;
export let baseUrl: string = pattern.test(windowHost)
  ? "https://multiples.im/api"
  : // "http://13.231.81.65:28888"
  "https://multiples.im/api";

export let ContractUrl: string = isMain
  ? "https://bscscan.com/address/"
  : "https://testnet.bscscan.com/address/";
interface abiObjType {
  [propName: string]: any;
}
interface contractAddressType {
  [propName: string]: string;
}

export const abiObj: abiObjType = {
  USDT: Token,
  TOKEN: Token,
  Stake: Stake,
  PassNft: PassNft,
  CC: CC,
  NFTManage: NFTManage,
  CakeIdo: CakeIdo,
  CakeNode: CakeNode,
  Cake: Token
};

export const Main: contractAddressType = {
  USDT: "0x55d398326f99059fF775485246999027B3197955",
  TOKEN: "0xfAF18E53F52122085a8743e2bfb324c0577b98B5",
  Stake: "0x1F04eb30cf5e8e3B367ba5a1AbFbD928a917e4f7",
  PassNft: "0x8c386214CDc77b8c62066e31f0271afB1F0AE1a7",
  CC: "0x8D24756E688138F3f0F48762BCb9F804D818B826",
  NFTManage: "0x0B3937869D275815eDAA2c617cd8f378ABFF2D6b",

  Cake: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
  CakeNode: '0x1Ac0B106927B5454A2C2fB903a8B616A33Cc7A3a',
  CakeIdo: '0x50964613e358A46194668C9b631412DF83AeD8e2',
};

const Test = {
  USDT: "0x2b11640f31b84dc727841FE6B5a905D366A00e78",
  TOKEN: "0xEec2f5a9c17C70081Fed402B04b73B55e291e014",
  Stake: "0x71085fb90ADDF878F936589cF12B8772212e58c4",
  PassNft: "0xb6E7b0249becEc75D44843B7Ab62EFaA1E1D403D",
  CC: "0xE4ee9eE77f2b851f27Db3268E84CC5CB03759bB8",
  NFTManage: "0x0d0dAdCB0A01b56FA6362Db91E5cE6192e4Be61b",
  Cake: '0x1Ac0B106927B5454A2C2fB903a8B616A33Cc7A3a',
  CakeNode: '0x1Ac0B106927B5454A2C2fB903a8B616A33Cc7A3a',
  CakeIdo: '0x09Ce5DE3EF7aE5F0fA5fB226cf57844FC9D31154',
};

export const contractAddress: contractAddressType = isMain ? Main : Test;
// Test
