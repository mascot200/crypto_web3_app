// 

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten:{
      url: 'https://eth-ropsten.alchemyapi.io/v2/S-sfhE96lqjF4hnHqoNEQnJjPS2wKxNL',
      accounts:  ['a897e2bf837bcbaf373901b10bef476217adeb84b507a8f9b40299d894c480c6'] // address private key from metaMask
    }
  }
}
