import React, { useContext, useState, useEffect } from "react";
import Style from "../components/HeroSection/HeroSection.module.css";
import { HeroSection, Service, BigNFTSilder, Subscribe, Title, Category, Filter, NFTCard } from "../components/componentsindex";

// import { NFTMarketplaceContext, NFTMarketplaceProvider } from "../Context/NFTMarketplacecontext";
import { NFTMarketplaceContext, NFTMarketplaceProvider } from "../Context/NFTMarketplaceContext";

const Home = () => {
  const {checkIfWalletConnected} = useContext(NFTMarketplaceContext);
  // const { checkContract } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    checkIfWalletConnected;
  }, []);

  const {fetchNFTs} = useContext(NFTMarketplaceContext);
  const [nfts, setNfts]= useState([]);
  const [nftsCopy, setNftsCopy]= useState([]);

useEffect(() => {
fetchNFTs() .then((items) => {
    // console.log(items)
    if (!items) {
      console.log("No items returned from fetchNFTs()");
      return;
    }

    setNfts(items.reverse());
    setNftsCopy(items);
    // console.log(nfts);
  })
  .catch((error) => {
    console.error("Error fetching NFTs:", error);
  });
}, []);

  // useEffect(() => {
  //   if (typeof checkContract === "function") {
  //     checkContract();
  //   }
  // }, []);

  
  // useEffect(() => {
  //   if (typeof checkIfWalletConnected === "function") {
  //     checkIfWalletConnected();
  //   }
  // }, []);

  return (
    <div className={Style.homePage}>

      <HeroSection />
      <Service />
      {/* <BigNFTSilder />
      <Title
        heading="Browse by category"
        paragraph="Explore the NFTs in the most featured categories."
      /> */}
      {/* <Category /> */}
      <Title
        heading="Featured NFTs"
        paragraph="Discover the most outstanding NFTs in all topics of life."
      />
      {/* <Filter /> */}
      <NFTCard NFTData={nfts}/>
      <Subscribe />

    </div>
  )
};

export default Home;
