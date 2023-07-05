import React, { useState, useEffect } from "react";
import Alert from '@mui/material/Alert';

const NtError = (props) => {
    const [useDisplay, setDisplay] = useState(props.testState);
    const styles = {
        width: '100%',
        maxWidth: 300,
        borderRadius: '4px',
        padding: '8px 30px',
        fontWeight: 600,
        textAlign: 'left',
        color: '#ffd0d0',
        zIndex: 9999,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
    useEffect(()=> {
        setTimeout(() => {
            setDisplay('d-none')
        }, 5000)
    },[useDisplay]);
    //error
    //info
    //warning
    //success
    switch (props.errorType) {
        case 'noMetamask':
            return( 
                <Alert variant="filled" className="Global_error" severity="error">
                    Error: Metamask not found. Please install Metamask or any other wallet.
                </Alert>
            )
            break; 
        case 'metamaskReject':
            return( 
                <Alert variant="filled" className="Global_error" severity="error">
                    Transaction rejected by user.
                </Alert>
            )
            break; 
        case 'metamaskReject-user-not-register':
            return( 
                <Alert variant="filled" className="Global_error" severity="error">
                    Transaction rejected. User is not registered. 
                </Alert>
            )
            break; 
        case 'someThingelse':
            return( 
                <Alert variant="filled" className="Global_error" severity="error">
                    Error: Something went wrong. Please check your console or TRX.
                </Alert>
            )
            break;
        case 'wrongNetwork':
            return( 
                <Alert variant="filled" className="Global_error" severity="error">
                    Error: Wrong Network selected. Please select Binance Smart Chain as your current network.
                </Alert>
            )
            break;
        case 'maybeWrongNetwork':
            return( 
                <Alert variant="filled" className="Global_error" severity="error">
                    Error: Your selected network might not be correct. Please select Binance Smart Chain as your network.
                </Alert>
            )
            break;
        case 'walletNotConnected':
            return( 
                <Alert variant="filled" className="Global_error" severity="error">
                    Error: Wallet not connected.
                </Alert>
            )
            break;
        case 'walletChanged':
            return( 
                <Alert variant="filled" className="Global_error s" severity="info">
                    Wallet address updated successfully.
                </Alert>
            )
            break;
        case 'insufficient-balance':
            return( 
                <Alert variant="filled" className="Global_error" severity="info">
                    Insufficient balance.
                </Alert>
            )
            break;
        case 'undefined':
            return( 
                <Alert variant="filled" className="Global_error" severity="error">
                    User does not exist!
                </Alert>
            )
            break;
        case 'duplicate-address':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    You are entering a duplicate wallet address.
                </Alert>
            )
            break;
        case 'verification-email-sent':
            return( 
                <Alert variant="filled" className="Global_form_error s" severity="success">
                    Verification e-mail sent, please check your e-mail.
                </Alert>
            )
            break;
        case 'email-address-not-found':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Email address not found.
                </Alert>
            )
            break;
        case 'duplicate-email':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    User already exists.
                </Alert>
            )
            break;
        case 'not-verified.':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    No verification found.
                </Alert>
            )
            break;
        case 'password-updated':
            return( 
                <Alert variant="filled" className="Global_form_error s" severity="success">
                    Password updated.
                </Alert>
            )
            break;
        case 'email-not-exist':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    The e-mail does not exist.
                </Alert>
            )
            break;
        case 'too-short-password':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Password too short. Your password needs atleast 6 characters.
                </Alert>
            )
            break;
        case 'missmatch-password':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                   Password does not match.
                </Alert>
            )
            break;
        case 'empty-password':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Password field empty.
                </Alert>
            )
            break;
        case 'empty-c-password':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Confirm password field empty.
                </Alert>
            )
            break;
        case 'invalid-email':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    The e-mail is invalid.
                </Alert>
            )
            break;
        case 'Invalid-email-or-password':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    The e-mail or password is invalid.
                </Alert>
            )
            break;
        case 'empty-email':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    E-mail field empty.
                </Alert>
            )
            break;
            
        case 'empty-user':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    E-mail/Wallet field empty.
                </Alert>
            )
            break;
            
        case 'Invalid-email-wallet-address-or-password':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Invalid credential.
                </Alert>
            )
            break;
        case 'email-not-found':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Email not found.
                </Alert>
            )
            break;
        case 'email-0r-wallet-address-not-found':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Email or wallet address not found.
                </Alert>
            )
            break;
        case 'invalid-address':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Invalid wallet address.
                </Alert>
            )
            break;
            
        case 'empty-address':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Wallet address cannot be empty.
                </Alert>
            )
            break;
        case 'Email-Send':
            return( 
                <Alert variant="filled" className="Global_form_error s" severity="success">
                    Email sent.
                </Alert>
            )
            break;
        case 'token-expired':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Token expired. Please try again.
                </Alert>
            )
            break;
        case 'too-short-address':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Wallet address should be 42 characters long.
                </Alert>
            )
            break;
        case 'password-required':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    Please enter a password.
                </Alert>
            )
            break;
	case 'invalid-user':
            return( 
                <Alert variant="filled" className="Global_form_error" severity="error">
                    You have entered an invalid ID or password.
                </Alert>
            )
            break;
    case 'login-success':
        return( 
            <Alert variant="filled" className="Global_form_error s" severity="success">
                Login successful, you will now be redirected to the dashboard.
            </Alert>
        )
        break;

    case 'invalid-token':
        return( 
            <Alert variant="filled" className="Global_form_error s" severity="success">
                Token invalid. Please try again.
            </Alert>
        )
        break;

    case 'password-updated':
        return( 
            <Alert variant="filled" className="Global_form_error s" severity="success">
                Password Updated.
            </Alert>
        )
        break;

    case 'already-verified':
        return( 
            <Alert variant="filled" className="Global_form_error s" severity="success">
                Your e-mail has already been verifed.
            </Alert>
        )
        break;

    case 'account-verified-Please-login':
        return( 
            <Alert variant="filled" className="Global_form_error s" severity="success">
               Account verified, please login.
            </Alert>
        )
        break;
        default:
            return <span />
            break;
    }    
}

export default NtError;