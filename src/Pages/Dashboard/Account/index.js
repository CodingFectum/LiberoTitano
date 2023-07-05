import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import AccountCard from "../../../components/AccountCard";
import DashboardCardBordered from "../../../components/DashboardCardBordered";
import DashboardCardSimple from "../../../components/DashboardCardSimple";
import Menu from "../../../components/DashboardMenu";
import NtError from "../../../components/ErroBook/ntErro";
var web3;
var deciConvert = 1e18;
var useAPY = "480,000"
const Account = () => {
    const [usebuttonText, setbuttonText] = useState('Connect Wallet');
    const [useLoader, setLoader] = useState(false);
    const [useError, setError] = useState(false);
    const [useErrorType, setErrorType] = useState('a');
    const [useMagnetoBalance, setMagnetoBalance] = useState('0');
    const [useMagnetoPrice, setMagnetoPrice] = useState('0');
    const [useNextRebase, setNextRebase] = useState('00:00:00');
    const [useRewardYield, setRewardYield] = useState('0');
    const [useRewardAmount, setRewardAmount] = useState('0');
    const [useRewardUSD, setRewardUSD] = useState('0');
    const [useDailyEarnings, setDailyEarnings] = useState('0');
    const [useRebaseBool, setRebaseBool] = useState(false);
    
    
    useEffect(() => {
        connectWallet();
        setTimeout(() => {
            setError(false)
        }, 8000)
    }, [useMagnetoBalance])
    /***************************************************
    *
    *    Handle web3 integration in DApp
    *    1=> amountFormate 
    *        a) set amount comma 
    *        b) set humber of digit after decimal
    *  
    *    2=> conciseWallet
    *        This function is used to hide half wallet address
    *        (i.e. 0xabc....zyx)
    * 
    *    3=> chainChanged
    *        This is ethereum function from web3, used to handle
    *        in changing NETWORK from metamask 
    * 
    *    4=> accountsChanged
    *        This is ethereum function from web3, used to handle
    *        in changing USER-WALLET-ADDRESS from metamask 
    *    
    *    5=> connectWallet
    *        This function is used to deal with contract(s)
    *        (i.e. getting/sending values from/in the contract(s)
    *        It will call when page reload and also on click
    * 
    *
    ****************************************************/

    // 1=> amountFormate
    const amountFormate = (x,digit) => {
        var parts = (+x).toFixed(digit).split(".");
        var num = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (+parts[1] ? "." + parts[1] : "");
        return num
    }

    // 2=> conciseWallet
    const conciseWallet = (value) => {
        const intvalue = value.toString();
        if( intvalue != ""){
            const start_char = value.toString().substring(0,6)+"***";
            const end_char = value.toString().substr(value.length - 4);
            return (start_char + end_char)
        }
    }
    try {
        // 3=> chainChanged
        window.ethereum.on('connect',  ( _connectInfo => {
            // BSC 0x38
            // BSCTestnet 0x61
            if ( _connectInfo.chainId != "0x38") {
                setErrorType('wrongNetwork')
                setError(true)
            }
        }));
        window.ethereum.on('chainChanged', (_chainId => {
            // BSC 0x38
            // BSCTestnet 0x61
            if ( _chainId == "0x38") {
                window.location.reload();
            }else{
                setLoader(true)
                setErrorType('wrongNetwork')
                setError(true)
            }
        }));

        // 4=> accountsChanged
        window.ethereum.on('accountsChanged', ( _mAddress => {
            if( _mAddress != "" ){
                setErrorType('walletChanged');
                setError(true);
                window.location.reload();
            }else{
                setbuttonText('Connect Wallet')
                setErrorType('walletNotConnected')
                setLoader(false)
                setError(true)
            }
        }));
    } catch (error) {
        console.log('Address: ', error)
    }

    // 5=> connectWallet
    const connectWallet = () => {
        if(typeof Web3 !== 'undefined'){
            try {

                web3 = new Web3(window.ethereum);
            
                // Treasury Contract 
                let treasuryAdd = "0x3d97F5eA5d8BF2996649259BCbaB8f67Ef2dE5ea";

                // LP Contract
                let lPAdd = "0xfc531c66c59504ef3d7ace07663d824c71f3efea"
                let lPAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
                let lPContract = new web3.eth.Contract( lPAbi , lPAdd );

                //LiberoTitano contract 
                let ltAdd = "0xd3DdbBf78C516aFB4eeA871BE43868659ac32Da2";
                let ltAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"epoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"LogRebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bnbReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"busdReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquifyBusd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"contractTokenBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToLiquify","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToRFV","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToTreasury","type":"uint256"}],"name":"SwapBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_FEE_RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_markerPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"autoRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"busdToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyFeeRFV","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"checkFeeExempt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkSwapThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"clearStuckBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesOnNormalTransfers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCirculatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"getLiquidityBacking","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialDistributionFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isLiquidityInBnb","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"isOverLiquified","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manualSync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxSellTransactionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextRebase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rebaseFrequency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"rescueToken","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardYieldDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"riskFreeValueReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IDEXRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellFeeRFVAdded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellFeeTreasuryAdded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_autoRebase","type":"bool"}],"name":"setAutoRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setFeeExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_liquidityReceiver","type":"address"},{"internalType":"address","name":"_treasuryReceiver","type":"address"},{"internalType":"address","name":"_riskFreeValueReceiver","type":"address"}],"name":"setFeeReceivers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_liquidityFee","type":"uint256"},{"internalType":"uint256","name":"_riskFreeValue","type":"uint256"},{"internalType":"uint256","name":"_treasuryFee","type":"uint256"},{"internalType":"uint256","name":"_sellFeeTreasuryAdded","type":"uint256"},{"internalType":"uint256","name":"_sellFeeRFVAdded","type":"uint256"},{"internalType":"uint256","name":"_feeDenominator","type":"uint256"}],"name":"setFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setFeesOnNormalTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_value","type":"bool"}],"name":"setInitialDistributionFinished","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_value","type":"bool"}],"name":"setIsLiquidityInBnb","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTxn","type":"uint256"}],"name":"setMaxSellTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nextRebase","type":"uint256"}],"name":"setNextRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rebaseFrequency","type":"uint256"}],"name":"setRebaseFrequency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardYield","type":"uint256"},{"internalType":"uint256","name":"_rewardYieldDenominator","type":"uint256"}],"name":"setRewardYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"},{"internalType":"uint256","name":"_num","type":"uint256"},{"internalType":"uint256","name":"_denom","type":"uint256"}],"name":"setSwapBackSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"setTargetLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBuyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSellFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
                let ltContract = new web3.eth.Contract( ltAbi , ltAdd );
                                
                ltContract.methods.nextRebase().call().then( result => { 
                    // let nR = "00:"+result/60+":00";
                    var countDownDate = new Date(result*1000).getTime()
                    var x = setInterval(function() {

                        // Get today's date and time
                        var now = new Date().getTime();
                          
                        // Find the distance between now and the count down date
                        var distance = countDownDate - now;
                          
                        // Time calculations for days, hours, minutes and seconds
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        let nR = "0:" + minutes + ":" + seconds;
                        // Output the result in an element with id="demo"
                        if( minutes >= 0 ){
                            setNextRebase(nR)
                            setRebaseBool(true)
                        } else {
                            setNextRebase("Waiting for contract call")
                            setRebaseBool(false)
                        }
                     }, 1000)
                })
                .catch (error => {
                    console.log( error )
                })

                // ltContract.methods.rewardYield().call().then( result => {
                //     setDailyEarnings(amountFormate((result/100000)*48,2))
                // })
                // .catch (error => {
                //     console.log( error )
                // })
            
                //get connected wallet address
            
                window.ethereum.request({ method: 'eth_requestAccounts'}).then( _account => {
                    // accountChangedHandler(_account.toString());
                    setbuttonText("Connected: " + conciseWallet(_account.toString()))
                    ltContract.methods.balanceOf(_account.toString()).call().then( result => {
                        let getBlance = result/deciConvert;
                        setMagnetoBalance(amountFormate(getBlance,2))

                        let percetage = (0.0419/100)*getBlance
                        setDailyEarnings(amountFormate(percetage*48,2))
                        setRewardAmount(amountFormate(percetage,2))

                        let equationValues = getBlance*(useAPY/100)**(1/365)
                        // console.log("test: ",percetage)
                        // setDailyEarnings(amountFormate((equationValues-getBlance)*48,2))
                        // fetch('https://api.coingecko.com/api/v3/coins/cardano').then(resultPrice => {
                        //     resultPrice.json().then(data => {
                        //         let mainPriceOfOS = data.market_data.current_price.usd
                        //         setMagnetoPrice(amountFormate(mainPriceOfOS,2))
                        //         let tokenPricefromCMC = amountFormate(data.market_data.current_price.usd,2)
                                                                
                        //         ltContract.methods.rewardYield().call().then( rYResult => {
                        //             let rYPercentage = rYResult/100000;
                        //             let rewarAmount = (rYPercentage/100)*(getBlance)
                        //             // setRewardYield(amountFormate(rYPercentage,2))0.0419
                        //             setRewardYield(0.0419)
                        //             // setRewardAmount(amountFormate(rewarAmount,2))
                        //             setRewardUSD(amountFormate(rewarAmount*mainPriceOfOS,2))
                                    
                        //         })
                        //         .catch (error => {
                        //             console.log( error )
                        //         })
                        //     })
                        // });

                        fetch('https://api.coingecko.com/api/v3/coins/binancecoin').then(resultPrice => {
                            resultPrice.json().then(data => {
                                let BNBinUSD = data.market_data.current_price.usd;

                                lPContract.methods.getReserves().call().then( lPContractResult => {
                                    let usdtOfBNB = (lPContractResult[0] / deciConvert) * BNBinUSD
                                    let tokenPrice = usdtOfBNB / (lPContractResult[1]/deciConvert)
                                    setMagnetoPrice(amountFormate(tokenPrice,6))
                                    // setMagnetoUSD(amountFormate((result/deciConvert)*tokenPrice,3))

                                    ltContract.methods.rewardYield().call().then( rYResult => {
                                        let rYPercentage = rYResult/100000;
                                        let rewarAmount = (rYPercentage/100)*(getBlance)
                                        // setRewardYield(amountFormate(rYPercentage,2))0.0419
                                        setRewardYield(0.0419)
                                        // setRewardAmount(amountFormate(rewarAmount,2))
                                        setRewardUSD(amountFormate(rewarAmount*tokenPrice,2))
                                        
                                    })
                                    .catch (error => {
                                        console.log( error )
                                    })
                                    
                                    
                                })
                                .catch (error => {
                                    console.log( error )
                                })
                                
                                
                            })
                        });
                    })
                    .catch (error => {
                        setErrorType('maybeWrongNetwork')
                        setError(true)
                    })
                })
                .catch (error => {
                    setbuttonText('Connect Wallet')
                    setErrorType('walletNotConnected')
                    setError(true)
                });
            } catch (error) {
                setErrorType('noMetamask')
                setError(true)
            }
        }else{
            console.log('Please install metamask to use this page.!')
        }
    }
    return(
        <div className="position-relative">
            {useError ?
                <NtError 
                    errorType = {useErrorType}
                />
            :
                <span />
            }
            <Grid
                container
                justifyContent="flex-start"
                className="AppDapp Dashboard position-relative"
            >
                <Menu />
                <Grid md={2} />
                <Grid 
                        container
                        xs={12}
                        md={10} 
                        className="LT--Dapp-Screen py-4 px-4"
                        alignContent="flex-start"
                        justifyContent="center"
                >
                    <Grid
                        xs={12}
                        className="text-center text-sm-right px-4"
                    >
                        <button className="btn2">{usebuttonText}</button>
                    </Grid>
                    <Grid
                        container
                        xs={12}
                        lg={8} 
                    >
                        <DashboardCardBordered 
                            title="APY"
                            // number="102,483.58%"
                            number={useAPY+"%"}
                            discription="Daily ROI"
                            customClass="pt-4 pr-md-2"
                        />
                        <DashboardCardBordered 
                            title="Your balance"
                            number={useMagnetoBalance}
                            discription="LiberoTitano"
                            customClass="pt-4 pl-sm-2"
                        />
                        { useRebaseBool ? 
                            <DashboardCardBordered 
                                title="Next Rebase:"
                                number={useNextRebase}
                                discription="Interest Coming In Your Wallet"
                                customClass="pt-4 pr-md-2"
                            />
                        :
                            <Grid
                                xs={12}
                                sm={6}
                                className="pt-4 pr-md-2"
                            >
                                <div className="LT---Features--card">
                                    <div className="p-4">
                                        <div className="d-flex justify-content-between"> 
                                            <p className="text-capitalize mb-1">Next Rebase:</p>
                                        </div>
                                        <p className="text-left text-light mt-1">{useNextRebase}</p>
                                        <p className="text-uppercase mb-0 text-left" style={{minHeight:"unset"}}>Interest Coming In Your Wallet</p>
                                    </div>
                                </div>
                            </Grid>
                        }
                        <DashboardCardBordered 
                            title="Your Earnings/Daily"
                            // number="TBA"
                            number={useDailyEarnings}
                            discription="LiberoTitano"
                            customClass="pt-4 pl-sm-2"
                        />
                    </Grid>
                    <Grid
                        container
                        xs={12}
                        lg={8} 
                        className="LT---Features--card mt-4"
                    >
                        <Grid
                            container
                            xs={12}
                            className="px-4 py-5"
                        >
                            <AccountCard
                                title="Current LiberoTitano Price"
                                // discription="TBA"
                                discription={"$" + useMagnetoPrice}
                                customclass="green"
                            />
                            <AccountCard
                                title="Next Reward Amount"
                                discription={useRewardAmount +" LiberoTitano"}
                            />
                            

                            {/* <AccountCard
                                title="Next Reward Amount USD"
                                discription={useRewardUSD + " USD"}
                                customclass="green"
                            /> */}
                            <AccountCard
                                title="Next Reward Yield"
                                discription={useRewardYield +"%"}
                            />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}
export default Account;