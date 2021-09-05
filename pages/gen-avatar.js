import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import { Button, message, Image, Form, Radio, Input, Row, Col} from 'antd'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const [radiovalue, setRadioValue] = useState(1);
  const [showHome, setShowHome] = useState(1);
  const router = useRouter()

  function onFinish(values){
    console.log('Success:', values);
    createMarket(values)
  }

  function onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }

  function changeRadio(e) {
    setRadioValue(e.target.value)
  }

  function changeShowHome(e) {
    setShowHome(e.target.value)
  }

  useEffect(() => {
    // if(!router.query.url){
    //   message.error('不存在图片,请返回首页')
    //   router.push('/')
    //   return
    // }

    console.log(router.query.url)
    setFileUrl(router.query.url)
  }, [])

  
  async function createMarket(value) {
    
    const name = value.username
    const description = 'test'
    const price = 1
    
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name, description, image: fileUrl
    })
    // console.log(name,description,price,fileUrl)
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url)
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
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

    const price = ethers.utils.parseUnits('1', 'ether')
    /* then list the item for sale on the marketplace */
    contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString()

    transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    console.log('createMarketItem')
    await transaction.wait()
    router.push('/')
  }

  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
      }}>
      <p style={{fontSize:'30px'}}>生成你的卡通头像NFT</p>
      <p >立刻拥有全世界独一无二，只属于你的头像NFT</p>
      <div style={{display:'flex'}}>

        <div >
        {/* <Image alt="avatar" width="300px" src={'https://api.deepai.org/job-view-file/362097bf-a787-468b-83d8-7fb4cb3c5da7/outputs/output.jpg'} /> */}
        {
          fileUrl && (
            <Image alt="avatar" width="300px" src={fileUrl} />
          )
        }
        {/* <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button> */}
        </div>
        <div >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="名称"
              name="username"
              rules={[{ required: true, message: '请输入你的姓名' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="性别" name="sex" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Radio.Group onChange={changeRadio} value={radiovalue}>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
                <Radio value={3}>保密</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="链接"
              name="link"
              // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="个人简介"
              name="desc"
              // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="首页展示" name="sex" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Radio.Group onChange={changeShowHome} value={showHome}>
                <Radio value={1}>是</Radio>
                <Radio value={2}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 24}} style={{ display: 'flex',justifyContent:'space-between'}}>
              {/* <Button type="primary" htmlType="submit">
                Submit
              </Button> */}
              <Button type="primary" htmlType="submit" shape="round" onClick={createMarket}>
                生成NFT
              </Button>
              <Button type="primary" shape="round" onClick={()=>window.open("https://faucet.matic.network/")}>
                获取测试币
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}