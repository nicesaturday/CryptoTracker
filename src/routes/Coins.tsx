import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
      text-align: center;
      display: block;
`
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`


const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new:  boolean,
    is_active: boolean,
    type: string,
}

interface ICoinProps {
  toggleDark: () => void;
}


function Coins({toggleDark} : ICoinProps) {
  const {isLoading , data} = useQuery<ICoin[]>(["allCoins"], fetchCoins)
  return (
    <Container>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDark}>Toggle</button>
      </Header>
      {isLoading ? (<Loader>Loading...</Loader>) : (<CoinsList>
        {data?.slice(0,100).map((coin) => (
          <Coin key={coin.id}>
            <Link to={{
                pathname: `/${coin.id}`,
                state:{ name: coin.name, rank: coin.rank },
            }}> 
                <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                />
                {coin.name} &rarr; 
                </Link>
          </Coin>
        ))}
      </CoinsList>)}
    </Container>
  );
}
export default Coins;