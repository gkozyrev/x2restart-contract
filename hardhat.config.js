
require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-ganache");
require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-etherscan");

const { mnemonic, ETHSCANAPIKEY, INFURAID } = require('./env.json');

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    testnet: {
      url: `https://rinkeby.infura.io/v3/${INFURAID}`,
      accounts: {mnemonic: mnemonic}
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURAID}`,
      accounts: {mnemonic: mnemonic}
    }
  },
  solidity: {
  version: "0.4.25",
  settings: {
    optimizer: {
      enabled: true
    }
   }
  },
  gasReporter: {
    currency: 'ETH',
    gasPrice: 20
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  },
  etherscan: {
    apiKey: ETHSCANAPIKEY
  },
};