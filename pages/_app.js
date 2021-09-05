import '../styles/globals.css'
import Link from 'next/link'
import Web3 from 'web3'
import { Layout, Row, Col, Button } from 'antd'
import Web3Modal from "web3modal"
import useWindowDimensions from '../utils/window'
const { Header, Footer, Sider, Content } = Layout

async function checkMetaMask() {
  const provider = window.ethereum
  if (provider) {
    const chainId = 80001
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: 'Fantom Opera Mainnet',
            nativeCurrency: {
              "name": "Polygon Mumbai Testnet",
              "symbol": "Matic",
              "decimals": 18
            },
            rpcUrls: ["https://rpc-mumbai.matic.today"],
            blockExplorerUrls: ["https://rpc-mumbai.matic.today"]
          },
        ],
      })
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
      {/* <nav className="border-b p-6"> */}
        <Layout>
          <Header style={{backgroundColor:'white'}}>
            <Row gutter={[12, 12]} justify="space-between">
              <Col span={12}>
              <Link href="/">
                <a className="font-bold">MetaAvatar</a>
              </Link>
              </Col>
              <Col span={12} style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                <Link href="/dashboard">
                  <a className="mr-6 text-pink-500">
                    Profile
                  </a>
                </Link>
                <Button onClick={checkMetaMask}>
                  钱包
                </Button>
              </Col>
            </Row>
          
          </Header>
          <Content style={{ padding: '0 50px',minHeight:'800px'}}>
            <Component {...pageProps} />
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            <Row>
              <Col span={24}>
                Team Sky 2021
              </Col>
            </Row>
          </Footer>
        </Layout>
        
        
      {/* </nav> */}
      
    </div>
  )
}

export default Marketplace