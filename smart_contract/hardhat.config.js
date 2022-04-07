// 

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten:{
      url: 'https://eth-ropsten.alchemyapi.io/v2/SB6EMw_PVArOxKUPvJEtqtwqCKtk0ta2',
      accounts:  ['226e5149b7ff20d34d2eba28796bebf4996e8e09c6fd3cf4d8592b7ff212ef46']
    }
  }
}
