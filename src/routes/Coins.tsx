import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { DarkModeToggle } from 'react-dark-mode-toggle-2';

import { fetchCoins } from '../api';
import { isDarkAtom } from '../atoms';

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  max-width: 480px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  border: 1px solid white;
  background-color: ${(props) => props.theme.componentColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
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

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoin[]>('allConins', fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleMode = () => {
    setDarkAtom((val) => !val);
  };
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        {/* <button onClick={toggleMode}>change mode</button> */}
        <DarkModeToggle onChange={toggleMode} isDarkMode={isDark} size={65} />
      </Header>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <Img
                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt="coin"
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;

// 한 화면에서 다른 화면으로 state 같은 정보를 보낼 수 있다.(Link)
