import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

import NFTDetailsPage from "../NFTDetailsPage/NFTTabs/NFTDetailsPage";
// import { NFTMarketplaceContext } from "../Context/NFTMarketplacecontext";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

const NFTDetails = () => {
  const { currentAccount } = useContext(NFTMarketplaceContext)
  const [nft, setNft] = useState({
    image: "",
    price: "",
    tokenId: "",
    seller: "",
    owner: "",
    name: "",

  });

  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    setNft(router.query);
    // console.log("data", router.query)
  }, [router.isReady]);
  // console.log("data", router.isReady);
  // console.log("tokenIddetails", nft)


  return (
    <div>
      <NFTDetailsPage nft={nft} />
      {/* <NFTDetailsPage /> */}


    </div>
  );
};

export default NFTDetails;