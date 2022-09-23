## 安装

yarn add anyinone-sdk
or
npm install anyinone-sdk --save

## 引入

import SDK from "anyinone-sdk";

## 使用
const ACSDK = new SDK();
ACSDK.init('appid');
const sendMsg = () => {
  ACSDK.sendAsync("getAppToken", "data").then(res=>{
    console.log('返回信息',res);
  });
};