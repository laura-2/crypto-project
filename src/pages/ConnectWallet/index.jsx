import detectEthereumProvider from "@metamask/detect-provider"
import { useEffect, useState } from "react"
import Translator from '../../components/I18n/translator'
import './styles.css'

export default function ConnectWallet(){
    const [hasProvider, setHasProvider] = useState(null);
    const inicialState = {accounts: [], balance: ''};
    const [wallet, setWallet] = useState(inicialState);
    //Formato do saldo valor
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
    //Implementando integração com wallet de acordo com a documentação MetaMask
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
        <p><strong><Translator path="provider.walletConnection"/></strong>: {wallet.accounts[0]}</p>
        <p><strong><Translator path="provider.balance"/></strong>: {wallet.balance} ETH</p>
        </div>}
        </div>
    )
}