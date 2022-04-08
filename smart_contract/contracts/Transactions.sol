// SSPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;
    
  

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

     struct TransferStruct{
         address sender;
         address receiver;
         uint amount;
         string message;
         uint256 timestamp;
         string keyword;
     }

     TransferStruct[] transactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message, string memory keyword  ) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword)); // these stores the transacton in blockchain
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword); // these tcall the transfer event to transfer the amount

    }    

    function getAllTransactions() public view returns (TransferStruct[] memory){
         return transactions;
    }

    function getTransactionCount() public view returns (uint256){
            return transactionCount;
    }

    function getBalance() public view returns(uint256){
        return msg.sender.balance;
    }

   
}