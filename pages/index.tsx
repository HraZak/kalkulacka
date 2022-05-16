import type { NextPage } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import styles from '../styles/Home.module.css';

const Layout = styled.div``;

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kalkulačka</title>
        <meta name='description' content='Kalkulačka' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

    </div>
  );
};

export default Home;
