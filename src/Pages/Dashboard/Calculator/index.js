import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { styled } from '@mui/material/styles';
import Slider from '@mui/material/Slider';
import AccountCard from "../../../components/AccountCard";
import DashboardCardBordered from "../../../components/DashboardCardBordered";
import DashboardCardSimple from "../../../components/DashboardCardSimple";
import Menu from "../../../components/DashboardMenu";
import NtError from "../../../components/ErroBook/ntErro";

var web3;
var deciConvert = 1e18;
let lPAdd;
let lPAbi;
let lPContract;

const PrettoSlider = styled(Slider)({
    color: '#FF5555',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundImage: 'linear-gradient(180deg, #E93C3C, #FF5555)',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });


const Calculator = () => {
    const [useDays, setDays] = useState(30);
    const [usebuttonText, setbuttonText] = useState('Connect Wallet');
    const [useLoader, setLoader] = useState(false);
    const [useError, setError] = useState(false);
    const [useErrorType, setErrorType] = useState('a');
    const [useMagnetoBalance, setMagnetoBalance] = useState('0');
    const [useMagnetoPrice, setMagnetoPrice] = useState('0');
    const [useCalBalance, setCalBalance] = useState('0');
    const [useCalPurchasePrice, setCalPurchasePrice] = useState('0');
    const [useCalExpectedPrice, setCalExpectedPrice] = useState('0');
    const [useAPY, setAPY] = useState('480000');
    const [useYourInitialInvestment, setYourInitialInvestment] = useState('0.00');
    const [useCurrentWealth, setCurrentWealth] = useState('0.00');
    const [useRewardsEstimation, setRewardsEstimation] = useState('0.00');
    const [usePotentialReturn, setPotentialReturn] = useState('0.00');
    const [usePotentialNumberOfSpaceTravels, setPotentialNumberOfSpaceTravels] = useState('0.00');    
    
    useEffect(() => {
        connectWallet();
        calculationFunc();
        setTimeout(() => {
            setError(false)
        }, 8000)
    }, [useMagnetoPrice,useMagnetoBalance])
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
                lPAdd = "0xfc531c66c59504ef3d7ace07663d824c71f3efea"
                lPAbi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount0In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1In","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount0Out","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount1Out","type":"uint256"},{"indexed":true,"internalType":"address","name":"to","type":"address"}],"name":"Swap","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint112","name":"reserve0","type":"uint112"},{"indexed":false,"internalType":"uint112","name":"reserve1","type":"uint112"}],"name":"Sync","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[],"name":"DOMAIN_SEPARATOR","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"MINIMUM_LIQUIDITY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"PERMIT_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"burn","outputs":[{"internalType":"uint256","name":"amount0","type":"uint256"},{"internalType":"uint256","name":"amount1","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReserves","outputs":[{"internalType":"uint112","name":"_reserve0","type":"uint112"},{"internalType":"uint112","name":"_reserve1","type":"uint112"},{"internalType":"uint32","name":"_blockTimestampLast","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_token0","type":"address"},{"internalType":"address","name":"_token1","type":"address"}],"name":"initialize","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"mint","outputs":[{"internalType":"uint256","name":"liquidity","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"permit","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"price0CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"price1CumulativeLast","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"}],"name":"skim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"amount0Out","type":"uint256"},{"internalType":"uint256","name":"amount1Out","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"swap","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"sync","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"token0","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"token1","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}];
                lPContract = new web3.eth.Contract( lPAbi , lPAdd );

                //LiberoTitano contract 
                let ltAdd = "0xd3DdbBf78C516aFB4eeA871BE43868659ac32Da2";
                let ltAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"epoch","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"totalSupply","type":"uint256"}],"name":"LogRebase","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"pair","type":"address"},{"indexed":true,"internalType":"bool","name":"value","type":"bool"}],"name":"SetAutomatedMarketMakerPair","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"bnbReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquify","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokensSwapped","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"busdReceived","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"tokensIntoLiqudity","type":"uint256"}],"name":"SwapAndLiquifyBusd","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"contractTokenBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToLiquify","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToRFV","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountToTreasury","type":"uint256"}],"name":"SwapBack","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_FEE_RATE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"_markerPairs","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner_","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"autoRebase","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"automatedMarketMakerPairs","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"who","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"busdToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buyFeeRFV","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"}],"name":"checkFeeExempt","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"checkSwapThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_receiver","type":"address"}],"name":"clearStuckBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"feesOnNormalTransfers","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCirculatingSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"getLiquidityBacking","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialDistributionFinished","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isLiquidityInBnb","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"isOverLiquified","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"liquidityReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"manualRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"manualSync","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"maxSellTransactionAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextRebase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pair","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rebaseFrequency","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"rescueToken","outputs":[{"internalType":"bool","name":"success","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardYield","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardYieldDenominator","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"riskFreeValueReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"router","outputs":[{"internalType":"contract IDEXRouter","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellFeeRFVAdded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"sellFeeTreasuryAdded","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bool","name":"_autoRebase","type":"bool"}],"name":"setAutoRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_pair","type":"address"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setAutomatedMarketMakerPair","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_addr","type":"address"},{"internalType":"bool","name":"_value","type":"bool"}],"name":"setFeeExempt","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_liquidityReceiver","type":"address"},{"internalType":"address","name":"_treasuryReceiver","type":"address"},{"internalType":"address","name":"_riskFreeValueReceiver","type":"address"}],"name":"setFeeReceivers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_liquidityFee","type":"uint256"},{"internalType":"uint256","name":"_riskFreeValue","type":"uint256"},{"internalType":"uint256","name":"_treasuryFee","type":"uint256"},{"internalType":"uint256","name":"_sellFeeTreasuryAdded","type":"uint256"},{"internalType":"uint256","name":"_sellFeeRFVAdded","type":"uint256"},{"internalType":"uint256","name":"_feeDenominator","type":"uint256"}],"name":"setFees","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"}],"name":"setFeesOnNormalTransfers","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_value","type":"bool"}],"name":"setInitialDistributionFinished","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_value","type":"bool"}],"name":"setIsLiquidityInBnb","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_maxTxn","type":"uint256"}],"name":"setMaxSellTransaction","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_nextRebase","type":"uint256"}],"name":"setNextRebase","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rebaseFrequency","type":"uint256"}],"name":"setRebaseFrequency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardYield","type":"uint256"},{"internalType":"uint256","name":"_rewardYieldDenominator","type":"uint256"}],"name":"setRewardYield","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_enabled","type":"bool"},{"internalType":"uint256","name":"_num","type":"uint256"},{"internalType":"uint256","name":"_denom","type":"uint256"}],"name":"setSwapBackSettings","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"uint256","name":"accuracy","type":"uint256"}],"name":"setTargetLiquidity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"swapEnabled","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalBuyFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSellFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasuryFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"treasuryReceiver","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}]
                let ltContract = new web3.eth.Contract( ltAbi , ltAdd );
                
                
                // ltContract.methods.balanceOf(treasuryAdd).call().then( result => {
                //     setBackingLiquidity(result)
                // })
                // .catch (error => { 
                //     console.log( error )
                // })


                
                //get connected wallet address
                
                window.ethereum.request({ method: 'eth_requestAccounts'}).then( _account => {
                    // accountChangedHandler(_account.toString());
                    setbuttonText("Connected: " + conciseWallet(_account.toString()))
                    ltContract.methods.balanceOf(_account.toString()).call().then( result => {
                        setMagnetoBalance(result/deciConvert)
                        setCalBalance(result/deciConvert)
                        fetch('https://api.coingecko.com/api/v3/coins/binancecoin').then(resultPrice => {
                            resultPrice.json().then(data => {
                                let BNBinUSD = data.market_data.current_price.usd;

                                lPContract.methods.getReserves().call().then( lPContractResult => {
                                    let usdtOfBNB = (lPContractResult[0] / deciConvert) * BNBinUSD
                                    let tokenPrice = usdtOfBNB / (lPContractResult[1]/deciConvert)
                                    setMagnetoPrice(amountFormate(tokenPrice,6))
                                    setCalPurchasePrice(amountFormate(tokenPrice,5))
                                    setCalExpectedPrice(amountFormate(tokenPrice,5))
                                })
                                .catch (error => {
                                    console.log( error )
                                })
                                
                                // BUSDContract.methods.balanceOf('0x7EddA35b8A5f08a6927A8EAc21cA4636cf2c5758').call().then( result => {
                                //     // setBackingLiquidity(result)
                                //     // console.log("RISK Free value : Balance in BUSD of: ", result/1e18)
                                //     setRiskFreeMarketVal(amountFormate(result/deciConvert,2))
                                //     web3.eth.getBalance('0x7EddA35b8A5f08a6927A8EAc21cA4636cf2c5758').then( result => {
                                //         // console.log("Market value of Treasury : Balance in BNB of :", result/1e18 )
                                //         let BNBLPVal = result/deciConvert;
                                //         setBNBKLPValue(amountFormate(BNBLPVal,2))
                                //         setMarketValueOfTreasuryAssets(amountFormate(parseFloat(BNBLPVal)*parseFloat(BNBinUSD),2))
                                //     })
                                // })
                                // .catch (error => {
                                //     console.log( error )
                                // })
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

    const calculationFunc = (e) => {
        if (e) {
            const inputId = e.target.id;
            const inputValue = e.target.value;
            if( inputId == "calBalance" ){
                setCalBalance(inputValue)
                setCurrentWealth(inputValue*useMagnetoPrice)
                setYourInitialInvestment(amountFormate(useCalPurchasePrice*inputValue,3))
                let equationValues = inputValue*(useAPY/100)**(useDays/365)
                setRewardsEstimation(amountFormate(equationValues,2))
                setPotentialReturn(amountFormate(equationValues*useCalExpectedPrice,3))
            }else if( inputId == "calPurchasePrice" ){
                setCalPurchasePrice(inputValue)
                setYourInitialInvestment(amountFormate(useCalBalance*inputValue,3))
            }else if( inputId == "calExpectedPrice" ){
                setCalExpectedPrice(inputValue)
                let equationValues = useCalBalance*(useAPY/100)**(useDays/365)
                setRewardsEstimation(amountFormate(equationValues,2))
                setPotentialReturn(amountFormate(equationValues*inputValue,3))
            }else if( inputId == "btnCalBalance" ){
                setCalBalance(useMagnetoBalance)
                setCurrentWealth(useMagnetoBalance*useMagnetoPrice)
                setYourInitialInvestment(amountFormate(useCalPurchasePrice*useMagnetoBalance,3))
                let equationValues = useMagnetoBalance*(useAPY/100)**(useDays/365)
                setRewardsEstimation(amountFormate(equationValues,2))
                setPotentialReturn(amountFormate(equationValues*useCalExpectedPrice,3))
            }else if( inputId == "btnCalPurchasePrice" || inputId == "btnCalExpectedPrice" ) {
                // fetch('https://api.coingecko.com/api/v3/coins/titano').then(resultPrice => {
                //     resultPrice.json().then(data => {
                //         let mainPriceOfOS = data.market_data.current_price.usd
                //         if ( inputId == "btnCalPurchasePrice" ) {
                //             setCalPurchasePrice(mainPriceOfOS)
                //             setYourInitialInvestment(amountFormate(useCalBalance*mainPriceOfOS,3))
                //         } else if( inputId == "btnCalExpectedPrice" ) {
                //             setCalExpectedPrice(mainPriceOfOS)
                //             let equationValues = useCalBalance*(useAPY/100)**(useDays/365)
                //             setRewardsEstimation(amountFormate(equationValues,2))
                //             setPotentialReturn(amountFormate(equationValues*mainPriceOfOS,3))                            
                //         }
                //     })
                // });
                fetch('https://api.coingecko.com/api/v3/coins/binancecoin').then(resultPrice => {
                    resultPrice.json().then(data => {
                        let BNBinUSD = data.market_data.current_price.usd;

                        lPContract.methods.getReserves().call().then( lPContractResult => {
                            let usdtOfBNB = (lPContractResult[0] / deciConvert) * BNBinUSD
                            let tokenPrice = usdtOfBNB / (lPContractResult[1]/deciConvert)
                            if ( inputId == "btnCalPurchasePrice" ) {
                                setCalPurchasePrice(amountFormate(tokenPrice,5))
                                setYourInitialInvestment(amountFormate(useCalBalance*tokenPrice,3))
                            } else if( inputId == "btnCalExpectedPrice" ) {
                                setCalExpectedPrice(amountFormate(tokenPrice,5))
                                let equationValues = useCalBalance*(useAPY/100)**(useDays/365)
                                setRewardsEstimation(amountFormate(equationValues,2))
                                setPotentialReturn(amountFormate(equationValues*tokenPrice,3))                            
                            }

                            
                            
                        })
                        .catch (error => {
                            console.log( error )
                        })
                        
                    })
                });
            }

            // btnCalBalance
            // btnCalAPY
        } else {
            setCurrentWealth(useCalBalance*useMagnetoPrice)
            setYourInitialInvestment(amountFormate(useMagnetoPrice*useCalBalance,3))
            let equationValues = useCalBalance*(useAPY/100)**(useDays/365)
            setRewardsEstimation(amountFormate(equationValues,2))
            setPotentialReturn(amountFormate(equationValues*useCalExpectedPrice,3))         
        }
        
    }
    
    const valuetext = (value) => {
        let slideValue = `${value}`;
        setDays(slideValue);
        let equationValues = useCalBalance*(useAPY/100)**(slideValue/365)
        setRewardsEstimation(amountFormate(equationValues,2))
        setPotentialReturn(amountFormate(equationValues*useCalExpectedPrice,3))
        return slideValue;
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
                        className="LT---Features--card mt-4"
                    >
                        <Grid
                            container
                            xs={12}
                            className="p-4 p-xl-5"
                        >
                            <Grid
                                xs={12}
                                className="text-left"
                            >
                                <h3 className="mb-0">Calculator</h3>
                                <p className="mb-1">Estimate your returns</p>
                            </Grid>
                            <DashboardCardSimple
                                title="LiberoTitano Price"
                                // number="TBA"
                                number={"$"+useMagnetoPrice}
                            />
                            <DashboardCardSimple
                                title="APY"
                                // number="102,483.58%"
                                number={amountFormate(useAPY,0)+"%"}
                            />
                            <DashboardCardSimple
                                title="Your LiberoTitano Balance"
                                number={amountFormate(useMagnetoBalance,2)}
                            />
                            <Grid
                                xs={12}
                            ></Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                className="text-left pb-4 pl-sm-4 pr-sm-3"
                            >
                                <p className="text-uppercase mb-1">LiberoTitano Amount</p>
                                <div className="MAG---input">
                                    <input 
                                        type="number"
                                        onChange={calculationFunc}
                                        value={useCalBalance}
                                        id="calBalance"
                                        placeholder="0.00"
                                        min="0.0000000000001"
                                    />
                                    <button
                                        className="btn text-center"
                                        onClick={calculationFunc}
                                        id="btnCalBalance"
                                    >
                                        Max
                                    </button>
                                </div>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                className="text-left pb-4 pl-sm-3 pr-sm-4"
                            >
                                <p className="text-uppercase mb-1">APY (%)</p>
                                <div className="MAG---input">
                                    <input type="text" value={useAPY+"%"} readonly="readonly" placeholder="0.00" />
                                    <button
                                        className="btn text-center"
                                        onClick={calculationFunc}
                                        id="btnCalAPY"
                                    >
                                        CURRENT
                                    </button>
                                </div>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                className="text-left pb-4 pl-sm-4 pr-sm-3"
                            >
                                <p className="text-uppercase mb-1">LiberoTitano price at purchase ($)</p>
                                <div className="MAG---input">
                                    <input
                                        type="number"
                                        onChange={calculationFunc}
                                        value={useCalPurchasePrice} 
                                        id="calPurchasePrice"
                                        placeholder="0.00"
                                        min="0.0000000000001"
                                    />
                                    <button
                                        className="btn text-center"
                                        onClick={calculationFunc}
                                        id="btnCalPurchasePrice"
                                    >
                                        CURRENT
                                    </button>
                                </div>
                            </Grid>
                            <Grid
                                xs={12}
                                sm={6}
                                className="text-left pb-4 pl-sm-3 pr-sm-4"
                            >
                                <p className="text-uppercase mb-1">Future LiberoTitano price ($)</p>
                                <div className="MAG---input">
                                    <input 
                                        type="number"
                                        onChange={calculationFunc}
                                        value={useCalExpectedPrice} 
                                        id="calExpectedPrice"
                                        min="0.0000000000001"
                                        placeholder="0.00"
                                    />
                                    <button
                                        className="btn text-center"
                                        onClick={calculationFunc}
                                        id="btnCalExpectedPrice"
                                    >
                                        CURRENT
                                    </button>
                                </div>
                            </Grid>
                            <Grid
                                xs={12}
                                className="text-left pb-4 px-sm-4"
                            >
                                <p className="text-uppercase mb-2">{useDays} Days</p>
                                <PrettoSlider
                                    aria-label="Small steps"
                                    defaultValue={30}
                                    getAriaValueText={valuetext}
                                    step={1}
                                    min={1}
                                    max={365}
                                    valueLabelDisplay="auto"
                                    color="secondary"
                                />
                            </Grid>
                            <AccountCard
                                title="Your Initial Investment"
                                discription={"$"+useYourInitialInvestment}
                                customclass="text-light"
                            />
                            <AccountCard
                                title="Current Wealth"
                                discription={"$"+useCurrentWealth}
                                customclass="text-light"
                            />
                            <AccountCard
                                title="Total Estimated LiberoTitano Return"
                                discription={useRewardsEstimation}
                                customclass="text-light"
                            />
                            <AccountCard
                                title="Potential Return"
                                discription={"$"+usePotentialReturn}
                                customclass="text-light"
                            />
                            {/* <AccountCard
                                title="Potential Number Of Space Travels"
                                discription={usePotentialNumberOfSpaceTravels}
                                customclass="text-light"
                            /> */}
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}
export default Calculator;