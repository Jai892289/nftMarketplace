import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router"
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { BiTransferAlt, BiDollar } from "react-icons/bi";
import Link from "next/link";
// import { NFTMarketplaceContext } from "../../Context/NFTMarketplacecontext";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";
//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/componentsindex.js";
// import { NFTTabs } from "../NFTDetailsIndex";

const NFTDescription = ({ nft }) => {
  const [social, setSocial] = useState(false);
  const [NFTMenu, setNFTMenu] = useState(false);

  const router = useRouter();

  const openSocial = () => {
    (!social) ? setSocial(true) : setSocial(false)

  }

  const openNFTMenu = () => {
    (!NFTMenu) ? setNFTMenu(true) : setNFTMenu(false)

  }

  const { buyNFT, currentAccount } = useContext(NFTMarketplaceContext);

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>
        {/* //Part ONE */}
        <div className={Style.NFTDescription_box_share}>
          <p>Virtual Assets</p>
          {/* <div className={Style.NFTDescription_box_share_box}>
            <MdCloudUpload
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openSocial()}
            />

            {social && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <TiSocialFacebook /> Facebooke
                </a>
                <a href="#">
                  <TiSocialInstagram /> Instragram
                </a>
                <a href="#">
                  <TiSocialLinkedin /> LinkedIn
                </a>
                <a href="#">
                  <TiSocialTwitter /> Twitter
                </a>
                <a href="#">
                  <TiSocialYoutube /> YouTube
                </a>
              </div>
            )}

            <BsThreeDots
              className={Style.NFTDescription_box_share_box_icon}
              onClick={() => openNFTMenu()}
            />

            {NFTMenu && (
              <div className={Style.NFTDescription_box_share_box_social}>
                <a href="#">
                  <BiDollar /> Change price
                </a>
                <a href="#">
                  <BiTransferAlt /> Transfer
                </a>
                <a href="#">
                  <MdReportProblem /> Report abouse
                </a>
                <a href="#">
                  <MdOutlineDeleteSweep /> Delete item
                </a>
              </div>
            )}
          </div> */}
        </div>


        {/* //Part TWO */}
        <div className={Style.NFTDescription_box_profile}>
          <h1>{nft.name} </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            <div className={Style.NFTDescription_box_profile_box_left} style={{cursor:"pointer"}}>
              <Image
                // src={images.user1}
                src={nft.image}

                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                <Link href={{ pathname: "/author", query: `${nft.seller}` }}>

                  <span>
                  My Account <MdVerified />
                  </span>
                </Link>
              </div>
            </div>


          </div>

          <div className={Style.NFTDescription_box_profile_biding}>

          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>
             {nft.description}
            </p>
          </div>

          


            {/* <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p>

            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>2</p>
                <span>Days</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>22</p>
                <span>hours</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>45</p>
                <span>mins</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>12</p>
                <span>secs</span>
              </div>
            </div> */}

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Bid</small>
                <p>
                  {nft.price} ETH
                </p>
              </div>

              {/* <span>[96 in stock]</span> */}
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
              {currentAccount == nft.seller.toLowerCase() ? (
                <p>you cannot buy your own nft</p>
              ) : currentAccount == nft.owner.toLowerCase() ? (
                <Button

                  btnName="List on Marketplace"
                  handleClick={() => router.push(`/reSellToken?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`)}
                  classStyle={Style.button}
                />
              ) : (
                <Button

                  btnName="Buy NFT"
                  handleClick={() => { buyNFT(nft) }}
                  classStyle={Style.button}
                />
              )
              }

              {/* <Button

                btnName="Make Offer"
                handleClick={() => { }}
                classStyle={Style.button}
              /> */}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;