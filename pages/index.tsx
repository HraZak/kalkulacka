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
  const [zadano, setZadano] = useState('24');
  const [cislo, setCislo] = useState('2');
  const [operator, setOperator] = useState('+');

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

  const reset = () => {
    setZadano('');
    setCislo('');
    setOperator('');
  };

  const zmenitOperator = (x: string) => {
    if (operator && zadano && !cislo) setOperator(x);
    else if (!operator && !zadano && cislo) {
      setOperator(x);
      setZadano(cislo);
      setCislo('');
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
          <DivDisplayZadano>
            {zadano} {operator}
          </DivDisplayZadano>
          <DivDisplayCislo>{cislo}</DivDisplayCislo>
        </DivDisplay>

        <DivButton pozice='ac' onClick={() => reset()}>
          AC
        </DivButton>
        <DivButton pozice='del' onClick={() => setCislo(cislo.slice(0, -1))}>
          DEL
        </DivButton>
        <DivButton pozice='deleno' onClick={() => zmenitOperator('/')}>
          /
        </DivButton>

        <DivButton pozice='sedm' onClick={() => pridatCislo('7')}>
          7
        </DivButton>
        <DivButton pozice='osm' onClick={() => pridatCislo('8')}>
          8
        </DivButton>
        <DivButton pozice='devet' onClick={() => pridatCislo('9')}>
          9
        </DivButton>
        <DivButton pozice='krat' onClick={() => zmenitOperator('*')}>
          *
        </DivButton>

        <DivButton pozice='ctyri' onClick={() => pridatCislo('4')}>
          4
        </DivButton>
        <DivButton pozice='pet' onClick={() => pridatCislo('5')}>
          5
        </DivButton>
        <DivButton pozice='sest' onClick={() => pridatCislo('6')}>
          6
        </DivButton>
        <DivButton pozice='plus' onClick={() => zmenitOperator('+')}>
          +
        </DivButton>

        <DivButton pozice='jedna' onClick={() => pridatCislo('1')}>
          1
        </DivButton>
        <DivButton pozice='dva' onClick={() => pridatCislo('2')}>
          2
        </DivButton>
        <DivButton pozice='tri' onClick={() => pridatCislo('3')}>
          3
        </DivButton>
        <DivButton pozice='minus' onClick={() => zmenitOperator('-')}>
          -
        </DivButton>

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
