import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import {
  DivButton,
  DivDisplay,
  DivDisplayCislo,
  DivDisplayZadano,
  DivGrid,
  DivLayout,
} from '../components/componenty';

const Home: NextPage = () => {
  const [zadano, setZadano] = useState('24+5');
  const [cislo, setCislo] = useState('24');

  return (
    <DivLayout>
      <Head>
        <title>Kalkulačka</title>
        <meta name='description' content='Kalkulačka' />
      </Head>

      <DivGrid>
        <DivDisplay>
          <DivDisplayZadano>{zadano}</DivDisplayZadano>
          <DivDisplayCislo>{cislo}</DivDisplayCislo>
        </DivDisplay>

        <DivButton
          pozice='ac'
          onClick={() => {
            setZadano('');
            setCislo('');
          }}
        >
          AC
        </DivButton>
        <DivButton pozice='del' onClick={() => setCislo(cislo.slice(0, -1))}>
          DEL
        </DivButton>
        <DivButton pozice='deleno'>/</DivButton>

        <DivButton pozice='sedm' onClick={() => setCislo(cislo + '7')}>
          7
        </DivButton>
        <DivButton pozice='osm' onClick={() => setCislo(cislo + '8')}>
          8
        </DivButton>
        <DivButton pozice='devet' onClick={() => setCislo(cislo + '9')}>
          9
        </DivButton>
        <DivButton pozice='krat'>*</DivButton>

        <DivButton pozice='ctyri' onClick={() => setCislo(cislo + '4')}>
          4
        </DivButton>
        <DivButton pozice='pet' onClick={() => setCislo(cislo + '5')}>
          5
        </DivButton>
        <DivButton pozice='sest' onClick={() => setCislo(cislo + '6')}>
          6
        </DivButton>
        <DivButton pozice='plus'>+</DivButton>

        <DivButton pozice='jedna' onClick={() => setCislo(cislo + '1')}>
          1
        </DivButton>
        <DivButton pozice='dva' onClick={() => setCislo(cislo + '2')}>
          2
        </DivButton>
        <DivButton pozice='tri' onClick={() => setCislo(cislo + '3')}>
          3
        </DivButton>
        <DivButton pozice='minus'>-</DivButton>

        <DivButton
          pozice='tecka'
          onClick={() => {
            if (!cislo.includes('.') && cislo !== '') setCislo(cislo + '.');
          }}
        >
          .
        </DivButton>
        <DivButton pozice='nula' onClick={() => setCislo(cislo + '0')}>
          0
        </DivButton>
        <DivButton pozice='rovno'>=</DivButton>
      </DivGrid>
    </DivLayout>
  );
};

export default Home;
