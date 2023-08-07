const { ethers } = require("hardhat");
const { providers } = ethers;

async function main() {
  const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();

  await nftMarketplace.waitForDeployment();

  console.log(
    "deployed contract address" , await nftMarketplace.getAddress() );

  // const address = await nftMarketplace.getAddress();
  // console.log(`Contract Address: ${address}`);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



