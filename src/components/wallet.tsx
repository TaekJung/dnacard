import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import styled1 from "styled-components"; //styled-component import

interface WalletProps {
  account: string;
  setAccount: (account: string) => void;
}

const Walletnamecontainer = styled1.div`
background: #1AAB8A;
color: #fff;
border: none;
height: 35px;
font-size: 1.6em;
padding: 0 2em;
cursor: pointer;
transition: background-color 0.8s;
border-radius: 5px; // 버튼 모서리 둥글게
outline: none;
margin: 10px 0; // 버튼 간 간격 추가
&:hover {
  background-color: #13876a;
`

export const Wallet = ({ account, setAccount }: WalletProps) => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  setAccount(address!);

  return (
    <Walletnamecontainer>
    <>
      {isConnected ? (
        <>
          <div>
            Connected to {address}
            <button onClick={() => disconnect()}>Disconnect</button>
          </div>
        </>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
    </>
    </Walletnamecontainer>
  );
};