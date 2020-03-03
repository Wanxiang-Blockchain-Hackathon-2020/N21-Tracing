import Web3 from "web3";
import metaCoinArtifact from "../../build/contracts/MetaCoin.json";

import FCCoinArtifact from "../../build/contracts/TokenERC20.json";
import chainTradeArtifact from "../../build/contracts/ChainTrade.json";


const App = {
  web3: null,
  account: null,
  fccoin: null,
  chainTrade: null,
  chainTradeAddress : "0xc4261B94227824203fd2ddf51FDb9a643dc8d7Cf",//溯源交易合约地址
  tokenaddress:"0x0e4a5f081842668d4e4107176dcb1a444c213596",//口罩token地址

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FCCoinArtifact.networks[networkId];
      this.fccoin = new web3.eth.Contract(
        FCCoinArtifact.abi,
        // deployedNetwork.address,
        this.tokenaddress
      );

      console.log(chainTradeArtifact.abi);

      
      this.chainTrade = new web3.eth.Contract(
        chainTradeArtifact.abi,
        this.chainTradeAddress
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refreshBalance();
    } catch (error) {
      console.error(error);
    }
  },

  refreshBalance: async function() {
    const { balanceOf } = this.fccoin.methods;
    const balance = await balanceOf(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;



    const { getTradeInfoTo } = this.chainTrade.methods;
    const tradeto = await getTradeInfoTo(document.getElementById("tradeno1").value).call();
    console.log(tradeto);

    const tradedetailtoElement = document.getElementsByClassName("tradedetailto")[0];
    tradedetailtoElement.innerHTML = tradeto;

    const { getTradeInfoAmount } = this.chainTrade.methods;
    const amount = await getTradeInfoAmount(document.getElementById("tradeno1").value).call();
    console.log(amount);

    const tradedetailamountElement = document.getElementsByClassName("tradedetailamount")[0];
    tradedetailamountElement.innerHTML = amount;


  },

  sendCoin: async function() {
    const amount = parseInt(document.getElementById("amount").value);
    const receiver = document.getElementById("receiver").value;
    const tradeNo = document.getElementById("tradeno1").value;

    this.setStatus("Initiating transaction... (please wait)");

    //授权给交易合约
    const { approve } = this.fccoin.methods;
    var rlt = await approve(this.chainTradeAddress, amount).send({ from: this.account });

    console.log("授权结果："+rlt);
    //生成交易记录
    const { sendTrade } = this.chainTrade.methods;
    var rlt = await sendTrade(receiver,amount,tradeNo).send({ from: this.account });

    console.log("交易记录结果："+rlt);

    this.setStatus("发货成功!");
    this.refreshBalance();
  },


  receiveCoin: async function() {

    const tradeNo = document.getElementById("tradeno2").value;

    this.setStatus("Initiating transaction... (please wait)");

    //生成交易记录
    const { confirmTrade } = this.chainTrade.methods;
    var rlt = await confirmTrade(tradeNo).send({ from: this.account });

    console.log("交易记录结果："+rlt);

    this.setStatus("收货成功!");
    this.refreshBalance();
  },



  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("https://mainrpc.elaeth.io"),
    );
  }

  App.start();
});
