require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
// const privateKey = fs.readFileSync(".secret").toString().trim() || "01234567890123456789";
// const infuraId = fs.readFileSync(".infuraid").toString().trim() || "";

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    
    mumbai: {
      // Infura
      // url: `https://polygon-mumbai.infura.io/v3/33befc5e7a8a4ab492f276d73341073c`,
      // url: "https://rpc-mumbai.matic.today",
      url: "https://polygon-mumbai.infura.io/v3/1e9d95996aee4373a25d8e350d3d9949",
      accounts: ['df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e']
    },
    matic: {
      // Infura
      // url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      url: "https://rpc-mainnet.maticvigil.com",
      accounts: ['df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e']
    }
    
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};

