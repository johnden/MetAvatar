export const setupNetwork = async () => {
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