import React, { useState, useEffect } from "react";
import Image from "next/image";

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

//INTERNAL IMPORT
import Style from "./NFTDetailsImg.module.css";
import images from "../../img";
import { FaBullseye } from "react-icons/fa";

const NFTDetailsImg = ({nft}) => {
  const [description, setDescription] = useState(false);
  const [details, setDetails] = useState(false);

  const openDescription = () => {
    { (!description) ? setDescription(true) : setDescription(false) }
  }


  const openDetails = () => {
    { (!details) ? setDetails(true) : setDetails(false) }
  }
// console.log("totalNFT",nft)

  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>
          <div className={Style.NFTDetailsImg_box_NFT_like}>

          </div>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
         
            <Image
              className={Style.NFTDetailsImg_box_NFT_img_img}
              src={nft.image}

              alt="NFT image"
              width={700}
              height={800}
              objectFit="cover"
            />
          </div>
        </div>
        {/* <div
          className={Style.NFTDetailsImg_box_description}
          onClick={() => openDescription()}
        >
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>
             {nft.description}
            </p>
          </div>
        )} */}

        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            {/* <small>2000 x 2000 px.IMAGE(685KB)</small> */}
            <p>
              <small>Contract Address</small>
              <br></br>
              {nft.seller}
            </p>
            <p>
              <small>Token ID : </small>
              {nft.tokenId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTDetailsImg;

















// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

// //INTERNAL IMPORT
// import Style from "./NFTDetailsImg.module.css";
// import images from "../../img";

// const NFTDetailsImg = (nft) => {
//   const [description, setDescription] = useState(true);
//   const [details, setDetails] = useState(true);

//   const openDescription = () => {
//     { (!description) ? setDescription(true) : setDescription(false) }
//   }


//   const openDetails = () => {
//     { (!details) ? setDetails(true) : setDetails(false) }
//   }

// console.log("img", nft.image)

//   return (
//     <div className={Style.NFTDetailsImg}>
//       <div className={Style.NFTDetailsImg_box}>
//         <div className={Style.NFTDetailsImg_box_NFT}>
//           <div className={Style.NFTDetailsImg_box_NFT_like}>

//           </div>

//           <div className={Style.NFTDetailsImg_box_NFT_img}>
//             <Image
//               src={nft.image}
//               className={Style.NFTDetailsImg_box_NFT_img_img}
//               alt="NFT image"
//               width={700}
//               height={800}
//               objectFit="cover"
//             />
//           </div>
//         </div>

//         <div
//           className={Style.NFTDetailsImg_box_description}
//           onClick={() => openDescription()}
//         >
//           <p>Description</p>
//           {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
//         </div>

//         {description && (
//           <div className={Style.NFTDetailsImg_box_description_box}>
//             <p>
//               {nft.description}
//             </p>
//           </div>
//         )}

//         <div
//           className={Style.NFTDetailsImg_box_details}
//           onClick={() => openDetails()}
//         >
//           <p>Details</p>
//           {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
//         </div>

//         {details && (
//           <div className={Style.NFTDetailsImg_box_details_box}>
//             <small>2000 x 2000 px.IMAGE(685KB)</small>
//             <p>
//               <small>Contract Address</small>
//               <br></br>
//               {nft.seller}            </p>
//             <p>
//               <small>Token ID</small>
//               {nft.tokenId}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NFTDetailsImg;