import CW from '@chicagomaroon/react-crossword';
import dayjs from 'dayjs';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import React from 'react';
import styled from 'styled-components';
import { Col, Grid, Row } from 'react-styled-flexboxgrid';
import { InnerContainer } from '../styles';
import { withRouter } from 'next/router';


interface Props {
  data: any;
  router: any;
};

const HeaderContainer = styled.div`
  padding-top: 4rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.brightness_80};
  margin-bottom: 1.5rem;

  @media (max-width: 800px) {
    margin-bottom: 0;
  }
`;
const Title = styled.h1`
  display: inline;
  @media (max-width: 800px) {
    display: block;
    margin-bottom: 0;
    margin-top: 0;
  }
`;
const Timestamp = styled.h2`
  font-weight: normal;
  font-size: 1.3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0;
`;
const Byline = styled.h2`
  display: inline;
  font-weight: normal;
  font-size: 1rem;
  margin-top: 24px;
  margin-bottom: 0;
  float: right;
  @media (max-width: 800px) {
    display: inline-block;
    float: left;
    margin-top: 0;
  }
`;
const Person = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;

function createByline(ls: string): JSX.Element[] {
  let bylineItems: JSX.Element[] = [];
  bylineItems.push(<>By</>);
  for (let i = 0; i < ls.length; i++) {
    if (i === ls.length - 1) {
      bylineItems.push(<Person> {ls[i]}</Person>);
      continue
    }

    let suffix = "";
    if (ls.length > 2) {
      suffix += ",";
    }
    if (i === ls.length - 2) {
      suffix += " and ";
    }

    bylineItems.push(
      <>
        <Person> {ls[i]}</Person>
        {suffix}
      </>
    );
  }

  return bylineItems;
}
const Crossword = withRouter((props: Props) => (
  <>
    <Navbar />

    <HeaderContainer>
      <InnerContainer>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Timestamp>{dayjs(props.data.date).format('MMM. D, YYYY')}</Timestamp>
              <Title>{props.data.name}</Title>
              <Byline>{createByline(props.data.byline)}</Byline>
            </Col>
          </Row>
        </Grid>
      </InnerContainer>
    </HeaderContainer>
    <InnerContainer>
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <CW data={props.data} />
          </Col>
        </Row>
      </Grid>
    </InnerContainer>
    <Footer />
  </>
));

Crossword.getInitialProps = async function ({ req, query }) {
  const cwFiles = await import('../data.json');
  const data = await import(`../crosswords/${cwFiles[query.id]}`);

  return { data: data };
}

export default Crossword;