import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Web3Modal from "web3modal"
import { Layout, Row, Col, Radio, Button, Carousel, Card ,Image } from 'antd'

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

function CardList(items){
  return(
    <div>
      {
        items.map(item=>{
          <Card style={{height:'200px',width:'100px',backgroundColor:'blue'}}>

          </Card>
        })
      }
      
    </div>
  )
}

export default function Home() {
  const [nfts, setNfts] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [radiovalue, setRadioValue] = useState(1);

  const contentStyle = {
    // height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  useEffect(() => {
    loadNFTs()
  }, [])
  async function loadNFTs() {    
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.matic.today")
    console.log(provider)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    console.log(tokenContract)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
    console.log(marketContract)
    const data = await marketContract.fetchMarketItems()
    
    const items = await Promise.all(data.map(async i => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description,
      }
      return item
    }))
    console.log('items:')
    console.log(items)
    setNfts(items)
    setLoadingState('loaded') 
  }
  async function buyNft(nft) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    const transaction = await contract.createMarketSale(nftaddress, nft.tokenId, {
      value: price
    })
    await transaction.wait()
    loadNFTs()
  }

  function changeRadio(e) {
    setRadioValue(e.target.value)
  }

  // if (loadingState === 'loaded' && !nfts.length) return (<h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <Row justify="center">
          <p className="font-bold text-3xl" >认识更多来自元宇宙的朋友们</p>
        </Row>
        <Row justify="center">
        <Radio.Group onChange={changeRadio} value={radiovalue}>
          <Radio value={1}>查看全部</Radio>
          <Radio value={2}>只看男生</Radio>
          <Radio value={3}>只看女生</Radio>
        </Radio.Group>
        </Row>
        <Row>
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden" style={{
                display:'flex', 
                flexDirection:'column',
                justifyContent:"space-between"}}>
                <Image src={nft.image} alt="NFTImage" width="400px" />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  {/* <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p> */}
                  <Button type="primary" className="w-full text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Detail</Button>
                </div>
              </div>
            ))
          }
        </Row>
        <Row justify="center">
          <Link href="/upload">
            <Button type="primary" shape="round" >创建属于你自己的头像NFT</Button>
          </Link>
        </Row>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-bold text-white">{nft.price} ETH</p>
                  <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div> */}
      </div>.
    </div>
  )
}