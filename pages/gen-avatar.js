import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'
import req from '../utils/req'
import web3 from 'web3'
import { Button, message, Image as AntImage , Form, Radio, Input, Row, Col, Select} from 'antd'
const { Option } = Select;

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import {
  nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/Market.sol/NFTMarket.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const [radiovalue, setRadioValue] = useState(1)
  const [showHome, setShowHome] = useState(1)
  const [buttonLoading, setButtonLoading] = useState(false)
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
    setButtonLoading(true)
    const name = value.username
    const description = 'test'
    const price = 1

    console.log(value)
    // return
    
    if (!name || !description || !price || !fileUrl) return
    /* first, upload to IPFS */
    // const data = JSON.stringify({
    //   name, description, image: fileUrl
    // })
    // // console.log(name,description,price,fileUrl)
    // try {
    //   const added = await client.add(data)
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`
    //   console.log(url)
    //   /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
    //   createSale(url)
    // } catch (error) {
    //   console.log('Error uploading file: ', error)
    // } 
    try {
      const added = await client.add(fileUrl)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url, value)
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url,value)
    } catch (error) {
      console.log('Error uploading file: ', error)
    } 
    
    
  }

  function urlToBase64(url) {
    return new Promise ((resolve,reject) => {
        let image = new Image();
        image.setAttribute("crossOrigin",'anonymous');
        image.onload = function() {
            let canvas = document.createElement('canvas');
            canvas.width = this.naturalWidth;
            canvas.height = this.naturalHeight;
            // 将图片插入画布并开始绘制
            canvas.getContext('2d').drawImage(image, 0, 0);
            // result
            let result = canvas.toDataURL('image/png')
            resolve(result);
        };
        // CORS 策略，会存在跨域问题https://stackoverflow.com/questions/20424279/canvas-todataurl-securityerror
        
        image.src = url;
        // 图片加载失败的错误处理
        image.onerror = () => {
            reject(new Error('转换失败'));
        };
    });
}

  async function createSale(url, userData) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    let transaction = await contract.createToken(url)
    let tx = await transaction.wait()
    console.log('tx:')
    console.log(tx)

    /* 发送市场这步不要*/
    // let event = tx.events[0]
    // let value = event.args[2]
    // let tokenId = value.toNumber()


    // const price = ethers.utils.parseUnits('1', 'ether')
    // contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    // let listingPrice = await contract.getListingPrice()
    // listingPrice = listingPrice.toString()

    // transaction = await contract.createMarketItem(nftaddress, tokenId, price, { value: listingPrice })
    // console.log('createMarketItem')
    // await transaction.wait()
    let dict = {
      avatarname:userData.username,
      sex:radiovalue===1?'男':radiovalue===2?'女':'保密',
      avatarurl:url,
      avatarabstract:userData.desc,
      contractaddress:nftaddress,
      contentaddress:tx.transactionHash,
      showhome:showHome===1?1:0,
      facebooklink:userData.facebook||'',
      twitterlink:userData.twitter||'',
      weibolink:userData.weibo||'',
      tokenid: web3.utils.hexToNumber(tx.events[0].args.tokenId)
    }
    console.log(dict)
    req.callApi('/api/avatar/mintavatarnft','post',dict).then(res=>{
      console.log(res)
      setButtonLoading(false)
      router.push('/result')
    }).catch(error=>{
      console.log(error)
      setButtonLoading(false)
    })
    
  }

  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      margin:'10px',
      backgroundColor:'white',
      height:'800px',
      }}>
      <p style={{fontSize:'30px'}}>创建你的Metavatar</p>
      <p style={{marginTop:'15px', marginBottom:'60px'}}>立刻拥有全世界独一无二的，只属于你自己的Metavatar NFT</p>
      <div style={{display:'flex', justifyContent:'space-between', width:'900px'}}>

        <div >
        {/* <Image alt="avatar" width="300px" src={'https://api.deepai.org/job-view-file/362097bf-a787-468b-83d8-7fb4cb3c5da7/outputs/output.jpg'} /> */}
        {
          fileUrl && (
            <AntImage alt="avatar" width="300px" src={fileUrl} />
          )
        }
        {/* <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button> */}
        </div>
        <div style={{width:'600px'}}>
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
              extra="* 生成NFT后头像与名称不可修改, 其余信息可在站内修改"
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
              label="个人简介"
              name="desc"
              // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            {/* <Form.Item
              label="链接"
              name="link"
              // rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input.Group compact>
                <Form.Item
                  name={['address', 'province']}
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}
                >
                  <Select placeholder="社交链接">
                    <Option value="facebook">Facebook</Option>
                    <Option value="twitter">Twitter</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={['address', 'street']}
                  noStyle
                  rules={[{ required: true, message: 'Street is required' }]}
                >
                  <Input />
                </Form.Item>
              </Input.Group>
            </Form.Item> */}
            <Form.Item
              label="Facebook"
              name="facebook"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Twitter"
              name="twitter"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Weibo"
              name="weibo"
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
              <Button loading={buttonLoading}  htmlType="submit" onClick={createMarket} style={{marginRight:'40px',backgroundColor:'#9254DE', color:'white', width:'180px',height:'50px',borderRadius:'10px'}}>
                生成NFT
              </Button>
              <Button  onClick={()=>window.open("https://faucet.matic.network/")} style={{borderWidth:'1px',borderColor:'#9254DE', color:'#9254DE', width:'180px',height:'50px',borderRadius:'10px'}}>
                获取测试币
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}