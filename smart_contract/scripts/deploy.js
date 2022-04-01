const main = async() => {

  // We get the contract to deploy
  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();

  await transactions.deployed();

  console.log("Transaction deployed to:", transactions.address);
}


const runMain = async () => {
  try {
    await main(); // run the main() to deploy our contract if success process and exit
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runMain();