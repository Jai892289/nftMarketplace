import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./HeroSection.module.css";
// import { Button } from "../componentsindex";
import images from "../../img";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
import { useRouter } from "next/router";

const HeroSection = () => {
  // const {titleData}= useContext(NFTMarketplaceContext);
  const router = useRouter();
  
  const clickBtn =()=>{
    router.push("/uploadNFT")
  }



  return (
    <div className={Style.heroSection}>
      <div className={Style.heroSection_box}>
        <div className={Style.heroSection_box_left}>
        {/* <h1>{titleData} 🖼️</h1> */}

          <h1>Discover, collect, and sell NFTs 🖼️</h1>
          <p>
            Discover the most outstanding NTFs in all topics of life. Creative
            your NTFs and sell them
          </p>
          {/* <Button btnName="Start your search" onClick={clickBtn} /> */}
          <button  onClick={clickBtn} className={Style.btn_click}>Start your search</button>
        </div>
        <div className={Style.heroSection_box_right}>
          <Image
            src={images.hero}
            alt="Hero section"
            width={600}
            height={600}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;