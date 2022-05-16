import type { NextPage } from 'next';
import Head from 'next/head';
import { DivButton, DivDisplay, DivGrid, DivLayout } from '../components';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kalkulačka</title>
        <meta name='description' content='Kalkulačka' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <DivLayout>
        <DivGrid>
          <DivDisplay></DivDisplay>

          <DivButton pozice='ac'>AC</DivButton>
          <DivButton pozice='del'>DEL</DivButton>
          <DivButton pozice='deleno'>/</DivButton>

          <DivButton pozice='sedm'>7</DivButton>
          <DivButton pozice='osm'>8</DivButton>
          <DivButton pozice='devet'>9</DivButton>
          <DivButton pozice='krat'>*</DivButton>

          <DivButton pozice='ctyri'>4</DivButton>
          <DivButton pozice='pet'>5</DivButton>
          <DivButton pozice='sest'>6</DivButton>
          <DivButton pozice='plus'>+</DivButton>

          <DivButton pozice='jedna'>1</DivButton>
          <DivButton pozice='dva'>2</DivButton>
          <DivButton pozice='tri'>3</DivButton>
          <DivButton pozice='minus'>-</DivButton>

          <DivButton pozice='tecka'>.</DivButton>
          <DivButton pozice='nula'>0</DivButton>
          <DivButton pozice='rovno'>=</DivButton>
        </DivGrid>
      </DivLayout>
    </div>
  );
};

export default Home;
