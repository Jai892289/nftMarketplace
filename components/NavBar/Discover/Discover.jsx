import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Style from "./Discover.module.css";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";

const Discover = () => {
  const router = useRouter();
  const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Search",
      link: "searchPages",
    },
    {
      name: "Author Profile",
      link: "author",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
  ];


  return (
    <div>
      {discover.map ((el, i) => (
        <div key={i + 1} className={Style.discover}>
          {el.name === "Upload NFT" ? (
            <span style={{ cursor: "pointer" }} onClick={currentAccount ? () => router.push("/uploadNFT") : connectWallet}>
              {currentAccount ? "Upload NFT"  : "Connect"}
            </span>
          ) : (
            <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
          )}
        </div>
      ))}
    </div>


  



  );
};

export default Discover;






