import { useState } from "react";
import { Wallet } from "../components/wallet";
import { MintAndTransfer } from "./MintAndTransfer";
import { useConnect } from "wagmi";
import styledMain from 'styled-components';
import { MetaMaskConnector } from "wagmi/connectors/metaMask";

const MainContainer = styledMain.div`
  width: 100vw; 
  min-height: 100vh; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center; 
  background-color: #f7f7f7;
  gap: 10px;
  background-image: url('https://cdn.vox-cdn.com/thumbor/QggmlgpTq7ZCI-V9EPCDJzzuADc=/0x0:1205x798/1400x1400/filters:focal(513x122:743x352):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/55474493/Screen_Shot_2017_06_27_at_1.05.21_PM.0.png');
  background-position: center;
  background-size: cover;
`;

export const Main = () => {
  const [account, setAccount] = useState("");

  return (
    <MainContainer>
      <WalletName />
      <Wallet account={account} setAccount={setAccount}></Wallet>
      <MintAndTransfer
        account={account}
        setAccount={setAccount}
      ></MintAndTransfer>
    </MainContainer>
  );
};


function WalletName() {
  //어떤 wallet에 연결되었는지를 보여줌.
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  return (
    <div>
      {connectors.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}


