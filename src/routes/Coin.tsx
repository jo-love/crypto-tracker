import { useQuery } from 'react-query';
import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
} from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import Chart from './Chart';
import Price from './Price';

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  height: 35px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;
const Home = styled.div`
  text-align: right;
  margin-bottom: 10px;
  cursor: pointer;
  img {
    width: 30px;
    height: 30px;
  }
`;
interface RouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: object;
  parent: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_from_price_ath: number;
      price: number;
    };
  };
}
// ????????? fetch????????? ???????????? ??? ???, console ??????????????? ????????? ?????? ?????????, store object as global object ?????? -> key: Object.keys(temp1).join() value: ????????? ???????????? ?????? ?????? ??? ??? ????????? ??? ??? ??????. Object.values(temp1).map((v) => typeof(v)).join()

const Coin = () => {
  const { coinId } = useParams<{ coinId: string }>();
  const { state } = useLocation<RouteState>();
  // const [loading, setLoading] = useState(true);
  // const [infoData, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();
  //match?????? ?????? coindId/price url??? ????????? ????????? ??? ??????
  const priceMatch = useRouteMatch('/:coinId/price');
  const chartMatch = useRouteMatch('/:coinId/chart');
  const history = useHistory();
  // queryKey??? ????????? ?????? ?????????????????? ???????????? ?????? ????????? ????????? ?????? ????????????.
  // useQuery??? ???????????? ????????? ???????????? ??????????????? ?????? ?????? ????????? ????????? ???????????????.
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ['infoData', coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 5000,
    },
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ['tickers', coinId],
    () => fetchCoinTickers(coinId),
  );

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, [coinId]);
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        {/* helmet??? ????????? render?????? ????????? head??? ??? */}
        <title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? 'Loading...' : infoData?.name}
        </Title>
        {/* ????????? ???????????? ???????????? ?????? url??? ???????????? ?????? ?????????, ????????? ????????????. -> ???????????? ??????  ????????? ?????? Location-state??? ????????? ?????? ????????????.
        url??? ?????????????????? ?????? ???????????????, loading???????????? loading??? ???????????? ???????????? coin??? ????????? ????????? ?????????.  */}
      </Header>
      <Home>
        <img
          onClick={() => {
            history.push('/');
          }}
          src="/home.png"
          alt="home"
        />
      </Home>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span> {infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes?.USD?.price?.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/price`}>
              <Price tickersData={tickersData} />
            </Route>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
};
export default Coin;
