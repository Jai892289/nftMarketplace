/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    // domains:["nft-marketplaces.infura-ipfs.io", "infura-ipfs.io"]
    domains:["nft-marketplaces.infura-ipfs.io"],
    formats:["image/webp"],

  },
}

module.exports = nextConfig
