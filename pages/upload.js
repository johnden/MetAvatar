import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { Button, Upload, message, Image } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import deepai from 'deepai'
import {setupNetwork} from '../utils/wallet'
// import fs from 'fs'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  useEffect(() => {
    deepai.setApiKey('e3dcddd2-bf7a-4e34-810f-c7b49151803f')
  }, [])

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    console.log(file)
    // var result = await deepai.callStandardApi("content-moderation", {
    //   image: document.getElementById(file.uid),
    // })
    try {
      (async function() {
        var resp = await deepai.callStandardApi("toonify", {
          image: document.getElementById('trig'),
          // image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        });
        console.log(resp)
        setFileUrl(resp.output_url)
      })()
    }catch (error) {
      console.log('Error uploading file: ', error)
    }
  
    return isJpgOrPng && isLt2M;
  }

  async function onChange(e) {
    const file = e.target.files[0]
    console.log(file)
    try {
      var result = await deepai.callStandardApi("content-moderation", {
        image: document.getElementById(file),
    });
      // (async function() {
      //   var resp = await deepai.callStandardApi("toonify", {
      //     image: file,
      //   });
      //   console.log(resp);
      // })()
      // const added = await client.add(
      //   file,
      //   {
      //     progress: (prog) => console.log(`received: ${prog}`)
      //   }
      // )
      // const url = `https://ipfs.infura.io/ipfs/${added.path}`
      // setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }
  async function createMarket() {
    if(!fileUrl){
      message.error(`请先选择图片`);
      return;
    }

    const hasSetup = await setupNetwork()

    router.push({
      pathname: '/gen-avatar',
      query: {
        url: fileUrl
      }
    })

    // const { name, description, price } = formInput
    // console.log(name,description,price,fileUrl)
    // if (!name || !description || !price || !fileUrl) return
    // /* first, upload to IPFS */
    // const data = JSON.stringify({
    //   name, description, image: fileUrl
    // })
    // try {
    //   const added = await client.add(data)
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //   /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
    //   createSale(url)
    // } catch (error) {
    //   console.log('Error uploading file: ', error)
    // }  
  }

  async function createSale(url) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    let event = tx.events[0]
    let value = event.args[2]
    let tokenId = value.toNumber()

    const price = ethers.utils.parseUnits(formInput.price, 'ether')
  
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    await transaction.wait()
    router.push('/')
  }

  function handleChange(info) {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl =>
      //   this.setState({
      //     imageUrl,
      //     loading: false,
      //   }),
      // );
      setLoading(false)
    }
  };

  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
      }}>
      <p style={{fontSize:'30px'}}>生成你的卡通头像NFT</p>
      <p >立刻拥有全世界独一无二，只属于你的头像NFT</p>
      <div style=
        {{
          display:'flex',
          flexDirection:'column',
          justifyContent: 'space-between',
          alignItems:'center'
        }}>
        {/* <input 
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
        /> */}
        {/* {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        } */}
        <Upload
          name="avatar"
          listType="picture-card"
          style={{width:'400px',height:'400px'}}
          showUploadList={false}
          // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          id='trig'
        >
          {fileUrl ? <Image src={fileUrl} alt="avatar" /> : uploadButton}
        </Upload>
        {/* <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        /> */}
        {/* <Button type="primary" shape="round" onChange={onChange}>
          Create Digital Asset
        </Button> */}
        
        <Button type="primary" shape="round" onClick={createMarket}>
          上传头像
        </Button>
      </div>
    </div>
  )
}