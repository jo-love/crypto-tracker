import 'core-js';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { IPriceData, Overview } from './Coin';

interface PriceProps {
  isLoading: boolean;
  data?: IPriceData;
}
const Container = styled.div`
  width: 100%;
`;

const ExtendedOverview = styled(Overview)`
  height: 20px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 30px;
  }
`;
const Content = styled.span<{ isPositive: boolean }>`
  color: ${(props) => (props.isPositive ? props.theme.accentColor : 'red')};
`;

const Price = ({ isLoading, data }: PriceProps) => {
  return (
    <>
      {isLoading ? (
        'Loading...'
      ) : (
        <Container>
          <ExtendedOverview>
            <span>current price : </span>
            <Content
              isPositive={Math.sign(Number(data?.quotes.USD.price)) === 1}
            >{`$${data?.quotes?.USD.price?.toFixed(3)}`}</Content>
          </ExtendedOverview>
          <ExtendedOverview>
            <span>Percent Change 12 Hours : </span>
            <Content
              isPositive={
                Math.sign(Number(data?.quotes.USD.percent_change_12h)) === 1
              }
            >{`${data?.quotes.USD.percent_change_12h}%`}</Content>
          </ExtendedOverview>
          <ExtendedOverview>
            <span>Percent Change 24 Hourss : </span>
            <Content
              isPositive={
                Math.sign(Number(data?.quotes.USD.percent_change_24h)) === 1
              }
            >{`${data?.quotes.USD.percent_change_24h}%`}</Content>
          </ExtendedOverview>
          <ExtendedOverview>
            <span>Maximum Price : </span>
            <Content
              isPositive={Math.sign(Number(data?.quotes.USD.ath_price)) === 1}
            >{`$${data?.quotes.USD.ath_price.toFixed(3)}`}</Content>
          </ExtendedOverview>
          <ExtendedOverview>
            <span>Maximum Price Date : </span>
            <Content isPositive>
              {dayjs(data?.quotes.USD.ath_date).format('YYYY.MM.DD')}
            </Content>
          </ExtendedOverview>
        </Container>
      )}
    </>
  );
};

export default Price;
