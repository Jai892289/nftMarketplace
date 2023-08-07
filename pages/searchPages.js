import React, { useContext, useEffect, useState } from "react";
//INTRNAL IMPORT
import Style from "../styles/searchPage.module.css";

import { NFTCardTwo, Banner } from "../collectionPage/collectionIndex";
import images from "../img";

// import { NFTMarketplaceContext } from "../Context/NFTMarketplacecontext";
// import { NFTMarketplaceContext } from "../Context/NFTMarketplacecontext";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const searchPages = () => {

    const {fetchNFTs} = useContext(NFTMarketplaceContext);
    const [nfts, setNfts]= useState([]);



useEffect(() => {
  fetchNFTs() .then((items) => {
      // console.log(items)
      if (!items) {
        console.log("No items returned from fetchNFTs()");
        return;
      }

      setNfts(items.reverse());
      // setNftsCopy(items);
      // console.log(nfts);
    })
    .catch((error) => {
      console.error("Error fetching NFTs:", error);
    });
}, []);


  

 
  return (
    <div className={Style.searchPage}>
      <Banner bannerImage={images.creatorbackground2} />
   
      <NFTCardTwo NFTData={nfts}/>
  
    </div>
   
  );
};

export default searchPages;