import detectEthereumProvider from "@metamask/detect-provider"
import { useEffect, useState } from "react"
import Translator from '../I18n/translator'
import './wallet.css'

export default function ConnectWallet(){
    const [hasProvider, setHasProvider] = useState(null);
    const inicialState = {accounts: [], balance: ''};
    const [wallet, setWallet] = useState(inicialState);

    const formatBalance = (rawBalance) => {
        const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
        return balance;
    };

    useEffect(()=>{
        const refreshAccounts = (account)=> {
            if(account.length > 0){
                updateWallet(account)
            } else {
                setWallet(inicialState)
            }
        }
        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));
            if(provider){
                    const accounts = await window.ethereum.request(
                        {method: 'eth_accounts'}
                    );
                    refreshAccounts(accounts)
                    window.ethereum.on(
                        "accountsChanged",
                        refreshAccounts
                    )
            }
        }
        getProvider();
        return ()=>{
            window.ethereum?.removeListener("accountsChanged", refreshAccounts)
        }
    }, [])

    const updateWallet = async (accounts) => {
        const balance = formatBalance(
            await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"]
            })
        )
        setWallet({ accounts, balance });
    };
    
    const handleConnect = async () => {
        let accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            })
            updateWallet(accounts)
    }
    return(
        <div> { /* Conectando a metaMask */ }
        <p className="textProvider">{hasProvider ? <Translator path="provider.yes"/> : <Translator path="provider.no"/>}</p>
        {window.ethereum?.isMetaMask && !wallet.accounts.length > 0 && (
        <button onClick={handleConnect} className="button-connect"><Translator path="provider.button"/></button>
    )}
        {wallet.accounts.length > 0 &&
        <div className="info-connection"> { /* Informações da conta e saldo da wallet */ }
        <p><Translator path="provider.walletConnection"/>: {wallet.accounts[0]}</p>
        <p><Translator path="provider.balance"/>: {wallet.balance} ETH</p>
        </div>}
        </div>
    )
}