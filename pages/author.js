import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/author.module.css";
import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Title } from "../components/componentsindex";
import FollowerTabCard from "../components/FollowerTab/FollowerTabCard/FollowerTabCard";
// import { NFTMarketplaceContext } from "../Context/NFTMarketplacecontext";
import { NFTMarketplaceContext } from "../Context/NFTMarketplaceContext";

import images from "../img";
import {
  AuthorProfileCard,
  AuthorTaps,
  AuthorNFTCardBox,
} from "../authorPage/componentIndex";

const author = () => {
  const followerArray = [
    {
      background: images.creatorbackground1,
      user: images.user1,
    },
    {
      background: images.creatorbackground2,
      user: images.user2,
    },
    {
      background: images.creatorbackground3,
      user: images.user3,
    },
    {
      background: images.creatorbackground4,
      user: images.user4,
    },
    {
      background: images.creatorbackground5,
      user: images.user5,
    },
    {
      background: images.creatorbackground6,
      user: images.user6,
    },
  ];

  const [collectiables, setCollectiables] = useState(true);
  const [created, setCreated] = useState(false);
  const [like, setLike] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  const {fetchMyNFTSOrListedNFTs, currentAccount} = useContext(NFTMarketplaceContext)


  const[nfts, setNfts]= useState([]);
  const[myNFTs, setmyNFTs]= useState([]);


  // useEffect(()=>{
  //   fetchMyNFTSOrListedNFTs("fetchItemsListed").then((items)=>{
  //     setNfts(items);
      
  //   })
  // }, []);

  // useEffect(()=>{
  //   fetchMyNFTSOrListedNFTs("fetchMyNFTs").then((items)=>{
  //     setmyNFTs(items);

  //   })
  // }, []);



  useEffect(() => {
    console.log("Fetching nfts...");
    fetchMyNFTSOrListedNFTs("fetchItemsListed")
      .then((items) => {
        setNfts(items);
        // console.log("NFTs fetched successfully:", items);
      })
      .catch((error) => {
        // console.error("Error fetching nfts:", error);
      });
  }, []);
  
  useEffect(() => {
    console.log("Fetching myNFTs...");
    fetchMyNFTSOrListedNFTs("fetchMyNFTs")
      .then((items) => {
        setmyNFTs(items);
        // console.log("myNFTs fetched successfully:", items);
      })
      .catch((error) => {
        // console.error("Error fetching myNFTs:", error);
      });
  }, []);
  







  return (
    <div className={Style.author}>
      <Banner bannerImage={images.creatorbackground2} />
      <AuthorProfileCard currentAccount={currentAccount}/>
      <AuthorTaps
        setCollectiables={setCollectiables}
        setCreated={setCreated}
        setLike={setLike}
        setFollower={setFollower}
        setFollowing={setFollowing}
      />

      <AuthorNFTCardBox
        collectiables={collectiables}
        created={created}
        like={like}
        follower={follower}
        following={following}
        nfts={nfts}
        myNFTs={myNFTs}
      />



     
    </div>
  );
};

export default author;