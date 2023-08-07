import React, { useState, useEffect } from "react";
import { ethers, providers } from 'ethers';
import axios from "axios";
// import 'dotenv/config';


// const { ethers } = require('ethers');
// const axios = require('axios');
// import { BrowserProvider } from "ethers";
// import Web3Modal from "web3modal";
// const Web3 = require("web3");



import { create as ipfsHttpClient } from "ipfs-http-client";

import { useRouter } from "next/router";



const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const projectSecretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`)
    .toString("base64")}`;


const subdomain = process.env.NEXT_PUBLIC_SUBDOMAIN;

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
})

import { NFTMarketplaceAddress, NFTMarketplaceABI } from "./constants";

const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );

// const connectingWithSmartContract = async () => {
//     try {
//         const Web3 = new Web3();
//         const connection = await Web3.connect();
//         const provider = new ethers.BrowserProvider(connection);
//         // const provider = new ethers.BrowserProvider(window.ethereum);
//         const signer = await provider.getSigner();
//         const contract = fetchContract(signer);
//         return contract;

//     }
//     catch (error) {
//         console.log("something went wrong");
//         throw error; 
//     }
// };


const connectingWithSmartContract = async () => {
    try {
        if (window.ethereum) {
            await window.ethereum.request({ method: "eth_requestAccounts" });
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Something went wrong");
        throw error;
    }
};

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {
    const titleData = "Discover, collect, and sell NFTs";
    const [currentAccount, setCurrentAccount] = useState("");
    const [isRequestingAccount, setIsRequestingAccount] = useState(false);

    const router = useRouter();


    const checkIfWalletConnected = async () => {
        try {
            if (!window.ethereum) return console.log("install metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("no account founds")
            }
        } catch (error) {
            console.log("something wrong")

        }

    };

    useEffect(() => {
        checkIfWalletConnected();
    }, []);


    const connectWallet = async () => {
        try {
            if (!window.ethereum) return console.log("install metamask");

            if (isRequestingAccount) return; // If request is already in progress, do not trigger another

            setIsRequestingAccount(true); // Set the flag to indicate that the request is in progress

            const requestAccounts = async () => {
                try {
                    const accounts = await ethereum.request({
                        method: "eth_requestAccounts",
                    });

                    setCurrentAccount(accounts[0]);
                      window.location.reload();
                    connectingWithSmartContract();
                } catch (error) {
                    console.log("error while connecting");

                    if (
                        error.code === -32002 &&
                        error.message === "Already processing eth_requestAccounts. Please wait."
                    ) {
                        setTimeout(requestAccounts, 1000); // Retry after 1 second
                    }
                } finally {
                    setIsRequestingAccount(false); // Reset the flag after the request is completed
                }
            };

            requestAccounts();
        } catch (error) {
            console.log("error while connecting");
        }
    };

    const uploadToIPFS = async (file) => {
        try {
            const added = await client.add({ content: file });
            const url = `${subdomain}/ipfs/${added.path}`;
            return url;
        } catch (error) {
            console.log("error uploading to IPFS", (error));

        }
    };


    const createNFT = async (name, price, image, description, router) => {
        // console.log("Name:", name);
        // console.log("Price:", price);
        // console.log("Image:", image);
        // console.log("Description:", description);

        if (!name || !description || !price || !image)
            return console.log("Data missing");



        const data = JSON.stringify({ name, description, image });

        try {
            const added = await client.add(data);
            const url = `https://infura-ipfs.io/ipfs/${added.path}`;

            await createSale(url, price);
            router.push('/searchPages')

        } catch (error) {
            console.log("Error:", error);
        }
    };


    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            // console.log("formInputPrice", formInputPrice);
            const price = ethers.parseUnits(formInputPrice, "ether");
            const contract = await connectingWithSmartContract(); 

            const listingPrice = await contract.getListingPrice();
            const transaction = !isReselling
                ? await contract.createToken(url, price, {
                    value: listingPrice.toString(),
                })
                : await contract.resellToken(id, price, {
                    value: listingPrice.toString(),
                });

            await transaction.wait();
            // router.push('/searchPages')

            // console.log(transaction);
        }
        catch (error) {
            console.log("Error while creating sale", error);
        }
    };


    const fetchNFTs = async () => {
        try {
        
            let url = process.env.NEXT_PUBLIC_ALCHEMY_URL;

                const provider = new ethers.JsonRpcProvider(url);

            const contract = fetchContract(provider);
            const data = await contract.fetchMarketItems();

            // console.log(data)
            // console.log(data.target)


            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, owner, price: unformattedPrice }) => {

                        const tokenURI = await contract.tokenURI(tokenId);
                        // console.log("log", tokenURI)

                        const {
                            data: { image, name, description },
                        } = await axios.get(tokenURI);
                        // console.log(tokenURI)

                        // console.log( image)
                        const price = ethers.formatUnits(
                            unformattedPrice.toString(),
                            "ether"

                        );
                        // console.log(price)

                        // console.log("tokenIdssss", tokenId)
                        return {
                            price,
                                tokenId: tokenId.toString(),
                                seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI,
                        };
                    })

            );
            // console.log("items", items);

            return items;

        }
        catch (error) {
            console.log("error while fetching NFTssss", error)
        }
    };


    // const fetchNFTs = async () => {
    //     try {
    //       const provider = new providers.JsonRpcProvider();
    //       const contract = fetchContract(provider);
    //       const data = await contract.fetchMarketItem();

    //       console.log("Fetched data:", data);

    //       const items = await Promise.all(
    //         data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
    //           const tokenURI = await contract.tokenURI(tokenId);

    //           console.log("Token URI:", tokenURI);

    //           const { data: { image, name, description } } = await axios.get(tokenURI);
    //           const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

    //           return {
    //             price,
    //             tokenId: tokenId.toNumber(),
    //             seller,
    //             owner,
    //             image,
    //             name,
    //             description,
    //             tokenURI,
    //           };
    //         })
    //       );

    //       console.log("Processed items:", items);

    //       return items;
    //     } catch (error) {
    //       console.log("Error while fetching NFTs", error);
    //     }
    //   };

    // const fetchNFTs = async () => {
    //     try {
    //       const provider = new providers.JsonRpcProvider();
    //       const contract = fetchContract(provider);
    //       const data = await contract.fetchMarketItem();

    //       console.log("Fetched data:", data);

    //       if (!data || !Array.isArray(data)) {
    //         throw new Error("Invalid data format");
    //       }

    //       const items = await Promise.all(
    //         data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
    //           const tokenURI = await contract.tokenURI(tokenId);

    //           console.log("Token URI:", tokenURI);

    //           const { data: { image, name, description } } = await axios.get(tokenURI);
    //           const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

    //           return {
    //             price,
    //             tokenId: tokenId.toNumber(),
    //             seller,
    //             owner,
    //             image,
    //             name,
    //             description,
    //             tokenURI,
    //           };
    //         })
    //       );

    //       console.log("Processed items:", items);

    //       return items;
    //     } catch (error) {
    //       console.log("Error while fetching NFTs", error);
    //       return []; // Return an empty array to avoid undefined
    //     }
    //   };


    // const fetchNFTs = async () => {
    //     try {
    //     //   const provider = new providers.JsonRpcProvider("https://infura-ipfs.io/2SFFsa2iVIUszPqrep2WpN8HxR6");
    //     const provider = new ethers.BrowserProvider(window.ethereum);
    //       const contract =  fetchContract(provider);
    //       const data = await contract.fetchNFTs();
    //     //   const data = await contract.fetchMarketItem();

    //       console.log("Fetched data:", data);

    //       if (!data || !Array.isArray(data)) {
    //         throw new Error("Invalid data format");
    //       }

    //       const items = await Promise.all(
    //         data.map(async ({ tokenId, seller, owner, price: unformattedPrice }) => {
    //           const tokenURI = await contract.tokenURI(tokenId);

    //           console.log("Token URI:", tokenURI);

    //           const { data: { image, name, description } } = await axios.get(tokenURI);
    //           const price = ethers.utils.formatUnits(unformattedPrice.toString(), "ether");

    //           return {
    //             price,
    //             tokenId: tokenId.toNumber(),
    //             seller,
    //             owner,
    //             image,
    //             name,
    //             description,
    //             tokenURI,
    //           };
    //         })
    //       );

    //       console.log("Processed items:", items);

    //       return items;
    //     } catch (error) {
    //       console.log("Error while fetching NFTs", error);
    //       return []; // Return an empty array to avoid undefined
    //     }
    //   };




    // useEffect(() => {
    //     fetchNFTs();
    // }, []);

    const fetchMyNFTSOrListedNFTs = async (type) => {
        try {
            if (currentAccount) {
                const contract = await connectingWithSmartContract();
                const data =
                    type == "fetchItemsListed"
                        ? await contract.fetchItemsListed()
                        : await contract.fetchMyNFTs();

                const items = await Promise.all(
                    data.map(
                        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
                            const tokenURI = await contract.tokenURI(tokenId);
                            const {
                                data: { image, name, description },
                            } = await axios.get(tokenURI);
                            const price = ethers.formatUnits(
                                unformattedPrice.toString(),
                                "ether"
                            );
                            return {
                                price,
                                tokenId: tokenId.toString(),
                                seller,
                                owner,
                                image,
                                name,
                                description,
                                tokenURI,
                            };
                        })
                );
                return items;
            }
        } catch (error) {
            console.log("error while fetching NFTsss", error)
        }
    };

    // useEffect(() => {
    //     fetchMyNFTSOrListedNFTs();
    // }, []);


    const buyNFT = async (nft) => {
        try {
            const contract = await connectingWithSmartContract();
            const price = ethers.parseUnits(nft.price.toString(), "ether");
// console.log("price", price)
            const transaction = await contract.createMarketSale(nft.tokenId, {
                value: price,
            })
            // console.log("transaction", transaction)

            await transaction.wait();
            router.push("/author");
        } catch (error) {
            console.log("error while buying NFT", error);
        }
    }

    return (
        <NFTMarketplaceContext.Provider
            value={{
                checkIfWalletConnected,
                connectWallet,
                uploadToIPFS,
                createNFT,
                fetchNFTs,
                fetchMyNFTSOrListedNFTs,
                buyNFT,
                createSale,
                currentAccount,
                titleData,
            }}>
            {children}
        </NFTMarketplaceContext.Provider>

    );
}
