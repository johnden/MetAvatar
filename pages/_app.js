import '../styles/globals.css'
import Link from 'next/link'
import Image from 'next/image'
import Web3 from 'web3'
import { ethers } from "ethers"
import { Layout, Row, Col, Button } from 'antd'
import Web3Modal from "web3modal"
import useWindowDimensions from '../utils/window'
import logo from '../public/Logo.png'
import title from '../public/Title.png'
import twitter_footer from '../public/twitter_footer.png'
import mail from '../public/mail.png'
import req from '../utils/req'
const { Header, Footer, Sider, Content } = Layout


function login(userid) {
  req.callApi('/api/user/login', 'post',{userid}).then(res=>{
    console.log(res)
  }).catch(error=>console.log(error))
}

async function checkMetaMask() {
  console.log('provider')
  const provider = window.ethereum
  if (provider) {
    const chainId = 80001
    try {
      // await provider.request({
      //   method: 'wallet_addEthereumChain',
      //   params: [
      //     {
      //       chainId: `0x${chainId.toString(16)}`,
      //       chainName: 'Fantom Opera Mainnet',
      //       nativeCurrency: {
      //         "name": "Polygon Mumbai Testnet",
      //         "symbol": "Matic",
      //         "decimals": 18
      //       },
      //       rpcUrls: ["https://rpc-mumbai.matic.today"],
      //       blockExplorerUrls: ["https://rpc-mumbai.matic.today"]
      //     },
      //   ],
      // })
      
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      console.log('provider')
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      login(address)
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the Polygon network on metamask because window.ethereum is undefined")
    return false
  }

}

function Marketplace({ Component, pageProps }) {
  return (
    <div>
        <Layout>
          <Header style={{backgroundColor:'white',height:'64px',zIndex:1}}>
            <Row gutter={[12, 12]} justify="space-between">
              <Col span={12} style={{display:'flex', alignItems:'center'}}>
              <Link href="/">
                <Image src={logo} alt="Picture of the author" />
              </Link>
              <Link href="/">
                <Image src={title} alt="Picture of the author" />
              </Link>
              </Col>
              <Col span={12} style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                <Link href="/dashboard">
                  <a className="mr-6 text-pink-500">
                    帮助
                  </a>
                </Link>
                <Button shape="round" style={{ }} onClick={checkMetaMask}>
                  登录
                </Button>
              </Col>
            </Row>
          
          </Header>
          <Content style={{ padding: '0px',height:'1200px'}}>
            <Component {...pageProps} />
          </Content>
          <Footer style={{ display:'flex', flexDirection:'row', justifyContent:'space-between',zIndex:1, backgroundColor:'white' }}>
            <div style={{width:'360px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <Image src={twitter_footer} alt="twitter_footer" />
              <div>@metavatar2021</div>
              <Image src={mail} alt="mail" />
              <div>metavatar@hotmail.com</div>
            </div>
            <div>
              © 2021 Team Sky
            </div>
            <div>
              请使用Chrome浏览器
            </div>
          </Footer>
        </Layout>
        
        
      {/* </nav> */}
      
    </div>
  )
}

export default Marketplace