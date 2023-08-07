import React, { useState } from "react";
import Image from "next/image";
import { BsImage } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { MdVerified, MdTimer } from "react-icons/md";
import Link from "next/link";
//INTERNAL IMPORT
import Style from "./NFTCardTwo.module.css";

const NFTCardTwo = ({ NFTData }) => {
  // console.log("NFTData", NFTData)


  return (
   


    // <div className={Style.NFTCardTwo}>
    //    {Array.isArray(NFTData) && NFTData.length === 0 ? (
    //     <p>No NFT found</p>
    //   ) : (
    //     NFTData.map((els, i) => (
    //       <Link href={{ pathname: "/NFT-details", query: els }} key={i}>
    //                   {/* <Link href={{ pathname: "/NFT-details", query: els }} key={i}> */}

    //         <div className={Style.NFTCardTwo_box} key={i + 1}>
    //           <div className={Style.NFTCardTwo_box_like}>
    //             <div className={Style.NFTCardTwo_box_like_box}>
    //               <div className={Style.NFTCardTwo_box_like_box_box}>

    //               </div>
    //             </div>
    //           </div>

    //           <div className={Style.NFTCardTwo_box_img}>
    //             <Image
    //               src={els.image}
    //               alt="NFT"
    //               width={500}
    //               height={500}
    //               objectFit="cover"
    //               className={Style.NFTCardTwo_box_img_img}
    //             />
    //           </div>

    //           <div className={Style.NFTCardTwo_box_info}>
    //             <div className={Style.NFTCardTwo_box_info_left}>

    //               <p>{els.name}</p>

    //             </div>
    //           </div>

    //           <div className={Style.NFTCardTwo_box_price}>
    //             <div className={Style.NFTCardTwo_box_price_box}>
    //               <small>Current Bid</small>
    //               <p>{els.price} ETH</p>

    //             </div>

    //           </div>      </div>
    //       </Link>
    //     ))
    //   )}
    // </div>

<div className={Style.NFTCardTwo}>
{NFTData && NFTData.length > 0 ? (
  NFTData.map((els, i) => (
    <Link href={{ pathname: "/NFT-details", query: els }} key={i}>
      <div className={Style.NFTCardTwo_box} key={i + 1}>
              <div className={Style.NFTCardTwo_box_like}>
                <div className={Style.NFTCardTwo_box_like_box}>
                  <div className={Style.NFTCardTwo_box_like_box_box}>

                  </div>
                </div>
              </div>

              <div className={Style.NFTCardTwo_box_img}>
                <Image
                  src={els.image}
                  alt="NFT"
                  width={500}
                  height={500}
                  objectFit="cover"
                  className={Style.NFTCardTwo_box_img_img}
                />
              </div>

              <div className={Style.NFTCardTwo_box_info}>
                <div className={Style.NFTCardTwo_box_info_left}>

                  <p>{els.name}</p>

                </div>
              </div>

              <div className={Style.NFTCardTwo_box_price}>
                <div className={Style.NFTCardTwo_box_price_box}>
                  <small>Current Bid</small>
                  <p>{els.price} ETH</p>

                </div>

              </div>      </div>
    </Link>
  ))
) : (
  <p>No NFT found</p>
)}
</div>


  );
};

export default NFTCardTwo;


