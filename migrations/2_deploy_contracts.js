const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const FCCoin = artifacts.require("TokenERC20");
const ChainTrade = artifacts.require("ChainTrade");

module.exports = function(deployer) {

  // deployer.deploy(FCCoin);

  deployer.deploy(ChainTrade);

};
