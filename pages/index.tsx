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

  const pridatCislo = (x: string) => {
    switch (x) {
      case '.':
        if (!cislo.includes('.') && cislo !== '') setCislo((pre) => pre + '.');
        break;
      case '0':
        if (cislo !== '0') setCislo((pre) => pre + '0');
        break;
      default:
        setCislo((pre) => (pre === '0' ? x : pre + x));
        break;
    }
  };

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

        <DivButton pozice='sedm' onClick={() => pridatCislo('7')}>
          7
        </DivButton>
        <DivButton pozice='osm' onClick={() => pridatCislo('8')}>
          8
        </DivButton>
        <DivButton pozice='devet' onClick={() => pridatCislo('9')}>
          9
        </DivButton>
        <DivButton pozice='krat'>*</DivButton>

        <DivButton pozice='ctyri' onClick={() => pridatCislo('4')}>
          4
        </DivButton>
        <DivButton pozice='pet' onClick={() => pridatCislo('5')}>
          5
        </DivButton>
        <DivButton pozice='sest' onClick={() => pridatCislo('6')}>
          6
        </DivButton>
        <DivButton pozice='plus'>+</DivButton>

        <DivButton pozice='jedna' onClick={() => pridatCislo('1')}>
          1
        </DivButton>
        <DivButton pozice='dva' onClick={() => pridatCislo('2')}>
          2
        </DivButton>
        <DivButton pozice='tri' onClick={() => pridatCislo('3')}>
          3
        </DivButton>
        <DivButton pozice='minus'>-</DivButton>

        <DivButton pozice='tecka' onClick={() => pridatCislo('.')}>
          .
        </DivButton>
        <DivButton pozice='nula' onClick={() => pridatCislo('0')}>
          0
        </DivButton>
        <DivButton pozice='rovno'>=</DivButton>
      </DivGrid>
    </DivLayout>
  );
};

export default Home;
