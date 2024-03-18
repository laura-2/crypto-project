import detectEthereumProvider from "@metamask/detect-provider"
import { useEffect, useState } from "react"

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
        <div>
        <p> Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</p>
        {window.ethereum?.isMetaMask && !wallet.accounts.length > 0 && (
        <button onClick={handleConnect}>Connect MetaMask</button>
    )}
        {wallet.accounts.length > 0 &&
        <div>
        <p>Wallet Connected: {wallet.accounts[0]}</p>
        <p>Balance: {wallet.balance} ETH</p>
        </div>}
        </div>
    )
}