import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Web3Modal from "web3modal"
import background from '../img/Background.png'
import like from '../public/like.png'
import unlike from '../public/unlike.png'
import tiktok from '../public/tiktok.png'
import twitter from '../public/twitter.png'
import ins from '../public/ins.png'
import fb from '../public/fb.png'
import left_button from '../public/left_button.png'
import right_button from '../public/right_button.png'
import Img from 'next/image'
import req from '../utils/req'
import { Layout, Row, Col, Radio, Button, Carousel, Card, Image} from 'antd'

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
  const [radiovalue, setRadioValue] = useState(1)
  const [pageNum, setPageNum] = useState(1)

  const contentStyle = {
    // height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };
  useEffect(() => {
    // loadNFTs()
    getHomeData(

    )
  }, [])

  function login(userid) {
    req.callApi('/api/user/login', 'post',{userid}).then(res=>{
      console.log(res)
    }).catch(error=>console.log(error))
  }

  async function getHomeData() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    req.callApi('/api/avatar/queryavatarlist', 'post', {pageindex: pageNum, pagesize:5 }).then(async res=>{
      
      console.log(res.data.data.avatarList)
      const homedata = res.data.data.avatarList
      setNfts(homedata)
      const items = await Promise.all(homedata.map(async (i, index) => {
        
        const tokenUri = await tokenContract.tokenURI(i.tokenid)
        console.log(tokenUri)
        const meta = await axios.get(tokenUri)
        console.log(meta.data)
        // let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
        let item = {
          avatarname: i.avatarname,
          sex: i.sex,
          avatarurl: meta.data,
          facebooklink: i.owner,
          twitterlink: i.twitterlink,
          weibolink: i.weibolink,
          liketime: i.liketime,
          tokenid: i.tokenid,
          avatarabstract: i.avatarabstract,
        }
        
        return item
      }))
      setNfts(items)
    })
    // .catch(error=>console.log(error))
  }

  async function loadNFTs() {    
    const url = "https://rpc-mumbai.matic.today"
    // let connection = {
    //   headers: { "X-Requested-With": "XMLHttpRequest", "Access-Control-Allow-Origin": "*"},
    //   url: url
    // }
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    console.log('provider')
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    login(address)
    console.log(address)
    // const provider = new ethers.providers.JsonRpcProvider(url)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
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
    <div style={{}}>
      
      <div style={{ }}>
        
        <Img src={background} alt="background" quality={100}
        // sizes="
        // (max-width: 500px) 100px,
        // (max-width: 1000px) 200px,
        // (max-width: 1500px) 300px,
        // 400px
        // "

        // height={1200}
        layout="fill"
        // height={600}
        // width={1440}
        // objectFit="contain"
        style={{
          position:'absolute',
          top:'0',
          right:'0',
          left:'0',
          // width: '100vw',
          // height: '600px',
          
          zIndex:0,
          backgroundSize: 'cover',
          backgroundposition: 'center',
        }}
          
        />
        <Row justify="center" style={{marginTop:'200px'}}>
          <p className="font-bold text-3xl" style={{ marginBottom:'50px', zIndex:1}} >认识更多来自元宇宙的朋友们</p>
        </Row>
        <Row justify="center">
        <Radio.Group onChange={changeRadio} value={radiovalue} style={{
          marginBottom:'30px'}}>
          <Radio value={1} >查看全部</Radio>
          <Radio value={2}>只看男生</Radio>
          <Radio value={3}>只看女生</Radio>
        </Radio.Group>
        
        </Row>
        <Row style={{minHeight:'300px', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Img src={left_button} alt="button" width="40px" height="40px" style={{borderRadius:'15px', marginRight:'10px'}} onClick={()=>{
            if(pageNum===1) return
            setPageNum(pageNum-1)
            console.log(pageNum)
          }}/>
          {/* <button style={{width:'40px', height:'40px',backgroundImage:left_button}}/> */}
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden" style={{
                display:'flex', 
                width: '200px',
                height: '300px',
                marginRight: '10px',
                flexDirection:'column',
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '15px',
                zIndex:1,
                backgroundImage: "url('../public/Background.png')",
                justifyContent:"space-between"}}>
                <Image src={nft.avatarurl} alt="NFTImage" width="180px" height="180px" style={{borderRadius:'15px'}}/>
                <div style={{}}>
                  <p style={{ fontSize: '16px', font:'Roboto',color:'#000000',fontWeight: '600' }}>{nft.avatarname}</p>
                  <div  style={{ overflow: 'hidden' }}>
                    <p style={{ fontSize: '14px', font:'Roboto',color:'#666666' }}>{nft.avatarabstract}</p>
                  </div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div style={{display:'flex'}}>
                    <Img src={fb} alt="facebook" width="20px" height="20px"/>
                    <Img src={ins} alt="ins" width="20px" height="20px"/>
                    <Img src={twitter} alt="twitter" width="20px" height="20px"/>
                    <Img src={tiktok} alt="tiktok" width="20px" height="20px"/>
                  </div>
                  <div style={{display:'flex'}}>
                    <Img src={like} alt="unlike" style={{width:'13px', height:'11px'}}/>
                    <div>{nft.liketime}</div>
                  </div>
                </div>
              </div>
            ))
          }
          <Img src={right_button} alt="button" width="40px" height="40px" style={{borderRadius:'15px'}} onClick={()=>{
            setPageNum(pageNum+1)
            console.log(pageNum)
          }}/>
        </Row>
        <Row justify="center"  style={{flexDirection:'column', alignItems:'center'}}>
          <p className="font-bold text-3xl" style={{marginTop:'77px', marginBottom:'50px', textAlign:'center', zIndex:1}} >创建属于你自己的Metavatar NFT</p>
          <Link href="/upload">
            <Button type="primary" style={{
              backgroundColor:'#9254DE',
              border:'0',
              width:'330px',
              height:'60px',
              borderRadius:'10px',
              // marginBottom: '100px'
              }}>立即创建</Button>
          </Link>
          {/* <div style={{height:'100px'}}/> */}
        </Row>
        
      </div>
    </div>
  )
}