import React, { useEffect, useState} from "react";
import { ethers } from 'ethers'

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
    // const balance = await contract.getBalance(contractAddress);
    const balance = await provider.getBalance("ethers.eth")
    return transactionContract;
}

export const TransactionProvider  = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo:'', amount: '', keyword: '', message: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(window.localStorage.getItem('transactionCount'));
    const [transactions, setTransactions] = useState([]);
    const [metaBalance, setMetabalance] = useState(0);


    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert("Pleasse install metamask");
            const transactionContract = getEthereumContract();
    
            const availableTransactions = await transactionContract.getAllTransactions();
    
            const structuredTransactions = availableTransactions.map((transaction) => ({
              addressTo: transaction.receiver,
              addressFrom: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              message: transaction.message,
              keyword: transaction.keyword,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
    
            console.log(structuredTransactions);
    
            setTransactions(structuredTransactions);
        } catch (error) {
          console.log(error);
        }
      };

    const checkIfWalletIsConnected = async () => {
       
        try {
            if(!ethereum) return alert("Pleasse install metamask");

            const accounts = await ethereum.request({ method: 'eth_accounts'});
            console.log(accounts)
            if(accounts.length) {
                setCurrentAccount(accounts[0]);
             
              
               getAllTransactions();
            }else{
                console.log("No account found")
            }
        } catch (error) {
            throw new Error("No ethereum object.")
        }
      
    }

    const checkIfTransactionsExists = async () => {
        try {
            if(!ethereum) return alert("Pleasse install metamask");
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
    
            window.localStorage.setItem("transactionCount", transactionCount);
          
        } catch (error) {
          console.log(error);
    
          throw new Error("No ethereum object");
        }
      };

      
    const connectWallet = async () => {
        const transactionContract = getEthereumContract();
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            const balance =  transactionContract.getBalance();
            const balanceConvert = ethers.utils.formatEther(balance)
            setMetabalance(balanceConvert);
            console.log(accounts);
        } catch (error) {
            console.log(error)
            throw new Error("No ethereum object.")
        }
    }

const sendTransaction = async () => {
    try {
        if(!ethereum) return alert("Pleasse install metamask");
        const { addressTo, amount, keyword, message } = formData;
        const transactionContract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({ 
            method: 'eth_sendTransaction',
            params: [{
                from: currentAccount,
                to: addressTo,
                gas: '0x5208', // 21000 GWEI
                value: parsedAmount._hex, // covert to hex value

            }]
        });

       const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        setIsLoading(false);
        console.log(`Success - ${ transactionHash.hash}`);

        const transactionCount  = await transactionContract.getTransactionCount();
        setTransactionCount(transactionCount.toNumber());
       window.reload();

    } catch (error) {
        console.log(error)
    }
}

    // when page loads, run the checkIfWalletIsConnected()
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    }, []);

   // Wrap these provider to the main.jsx so all components will have access to the connectWallet()
    return (
        <TransactionContext.Provider value={{ connectWallet, metaBalance, currentAccount, formData,setFormData, sendTransaction, handleChange, isLoading,transactions}}>
            { children }
        </TransactionContext.Provider>
    )
}