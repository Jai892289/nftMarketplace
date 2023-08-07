import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { NFTMarketplaceContext } from "../../../Context/NFTMarketplaceContext";
import { useRouter } from "next/router";

import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
  TiArrowSortedUp,
} from "react-icons/ti";
// const {currentAccount, connectWallet} = useContext(NFTMarketplaceContext)

// import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "./SideBar.module.css";
import images from "../../../img";
import Button from "../../Button/Button";

const SideBar = ({ setOpenSideMenu }) => {
  //------USESTATE
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);
  //--------DISCOVER NAVIGATION MENU
  const discover = [

    // {
    //   name: "Search",
    //   link: "search",
    // },
    {
      name: "Author Profile",
      link: "author",
    },
    {
      name: "NFT Details",
      link: "NFT-details",
    },
    
  ];
  //------HELP CNTEER
  const helpCenter = [
    {
      name: "About",
      link: "about",
    },
    {
      name: "Contact Us",
      link: "contact-us",
    },
    {
      name: "Sign Up",
      link: "sign-up",
    },
    {
      name: "Sign In",
      link: "sign-in",
    },
    
  ];

  const openDiscoverMenu = () => {
    if (!openDiscover) {
      setOpenDiscover(true);
    } else {
      setOpenDiscover(false);
    }
  };

  const openHelpMenu = () => {
    if (!openHelp) {
      setOpenHelp(true);
    } else {
      setOpenHelp(false);
    }
  };

  const closeSideBar = () => {
    setOpenSideMenu(false);
  };




  const handleConnectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          router.push("/uploadNFT");
        } else {
          console.log("User denied account access");
        }
      } catch (error) {
        console.error("Error requesting account access:", error);
      }
    } else {
      console.log("MetaMask not found");
    }
  };


  const {currentAccount, connectWallet} = useContext(NFTMarketplaceContext)

  const router = useRouter();

  return (
    <div className={Style.sideBar}>
      <GrClose
        className={Style.sideBar_closeBtn}
        onClick={() => closeSideBar()}
      />

      <div className={Style.sideBar_box}>
        <Image onClick={()=> router.push("/")} style={{pointer:"cursor"}}
        src={images.logo} alt="logo" width={150} height={150} />
        <p>
          Discovers the most outstanding articles on all topices of NFT & write
          your own stories and share them
        </p>
        {/* <div className={Style.sideBar_social}>
          <a href="#">
            <TiSocialFacebook />
          </a>
          <a href="#">
            <TiSocialLinkedin />
          </a>
          <a href="#">
            <TiSocialTwitter />
          </a>
          <a href="#">
            <TiSocialYoutube />
          </a>
          <a href="#">
            <TiSocialInstagram />
          </a>
        </div> */}
      </div>

      <div className={Style.sideBar_menu}>
        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openDiscoverMenu()}
          >
            <p>Discover</p>
            {/* <TiArrowSortedDown /> */}
          </div>

          {/* {openDiscover && (
            <div className={Style.sideBar_discover}>
              {discover.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )} */}
        </div>

        <div>
          <div
            className={Style.sideBar_menu_box}
            onClick={() => openHelpMenu()}
          >
            <p>Help Center</p>
            {/* <TiArrowSortedDown /> */}
          </div>

          {/* {openHelp && (
            <div className={Style.sideBar_discover}>
              {helpCenter.map((el, i) => (
                <p key={i + 1}>
                  <Link href={{ pathname: `${el.link}` }}>{el.name}</Link>
                </p>
              ))}
            </div>
          )} */}
        </div>
      </div>

      <div className={Style.sideBar_button}>
      

      


      </div>


      <div className={Style.sideBar_button}>
            {currentAccount =="" ? (
            <Button btnName="connect" handleClick={()=> connectWallet()} />
            ):(
            
                            <Button btnName="upload NFT"  handleClick={()=> router.push("/uploadNFT")}/>

            )           
}
          </div>



     
    </div>
  );
};

export default SideBar;
