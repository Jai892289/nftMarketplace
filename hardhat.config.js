require("@nomicfoundation/hardhat-toolbox");
// require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
const PRIVATE_KEY= process.env.NEXT_PUBLIC_PRIVATE_KEY


const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL
module.exports = {
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat:{
      chainId: 80001,
    },
    polygon_mumbai:{
      url: RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },

  solidity: {
    version: "0.8.9",
    settings:{
      optimizer:{
        enabled:true,
        runs:200,
      },
    },
  }

};


// module.exports = {
//   solidity: "0.8.18",
//   networks: {
//     localhost: {
//       url: "http://localhost:8545",
//       accounts: [
//         "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
//         "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a"
//       ],
//     },
//   },
// };