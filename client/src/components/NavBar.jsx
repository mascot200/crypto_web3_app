import React, {useContext} from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { TransactionContext } from "../context/TransactionContext";
import { shortenBalance } from "../utils/shortenBalance";

import logo from "../../images/WayaC.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const { connectWallet , currentAccount,metaBalance, sendTransaction, formData, handleChange, isLoading} = useContext(TransactionContext)
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center text-white font-semibold">
        wayaCoin
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        {!currentAccount && (
           <li    onClick={connectWallet} className="bg-[#3655ee] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
             Connect Wallet
         </li>
        )}

                {metaBalance != 0 && (
                     <p className="text-white font-semibold text-lg mt-1">
                     Balance : { shortenBalance(metaBalance) } ETH
                   </p>
                  )}

                  {metaBalance == 0 && (
                     <p className="text-white font-semibold text-lg mt-1">
                     Balance : { metaBalance } ETH
                   </p>
                  )}
       
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />,
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;