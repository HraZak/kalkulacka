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

const tlacitkaOperatory = [
  {
    zobrazit: '/',
    pozice: 'deleno',
  },
  {
    zobrazit: '*',
    pozice: 'krat',
  },
  {
    zobrazit: '+',
    pozice: 'plus',
  },
  {
    zobrazit: '-',
    pozice: 'minus',
  },
];
const tlacitkaCisla = [
  {
    zobrazit: '0',
    pozice: 'nula',
  },
  {
    zobrazit: '1',
    pozice: 'jedna',
  },
  {
    zobrazit: '2',
    pozice: 'dva',
  },
  {
    zobrazit: '3',
    pozice: 'tri',
  },
  {
    zobrazit: '4',
    pozice: 'ctyri',
  },
  {
    zobrazit: '5',
    pozice: 'pet',
  },
  {
    zobrazit: '6',
    pozice: 'sest',
  },
  {
    zobrazit: '7',
    pozice: 'sedm',
  },
  {
    zobrazit: '8',
    pozice: 'osm',
  },
  {
    zobrazit: '9',
    pozice: 'devet',
  },
  {
    zobrazit: '.',
    pozice: 'tecka',
  },
];

const Home: NextPage = () => {
  const [zadano, setZadano] = useState('');
  const [cislo, setCislo] = useState('');
  const [operator, setOperator] = useState('');

  const pridatCislo = (x: string) => {
    switch (x) {
      case '.':
        if (!cislo.includes('.')) {
          if (cislo === '') setCislo('0.');
          else setCislo((pre) => pre + '.');
        }
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
    if (zadano && !cislo) setOperator(x);
    else if (!operator && !zadano && cislo) {
      setOperator(x);
      setZadano(cislo.endsWith('.') ? cislo.slice(0, -1) : cislo);
      setCislo('');
    } else if (operator && zadano && cislo) {
      setZadano(`${spocitat()}`);
      setCislo('');
      setOperator(x);
    }
  };

  const spocitat = () => {
    if (operator && zadano && cislo) {
      let temp = 0;
      let temp_zadano = parseFloat(zadano);
      let temp_cislo = parseFloat(cislo);

      switch (operator) {
        case '+':
          temp = temp_zadano + temp_cislo;
          break;
        case '-':
          temp = temp_zadano - temp_cislo;
          break;
        case '*':
          temp = temp_zadano * temp_cislo;
          break;
        case '/':
          temp = temp_zadano / temp_cislo;
          break;
      }

      reset();
      setCislo(`${temp}`);
      return temp;
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

        {tlacitkaOperatory.map(({ zobrazit, pozice }) => (
          <DivButton pozice={pozice} onClick={() => zmenitOperator(zobrazit)}>
            {zobrazit}
          </DivButton>
        ))}

        {tlacitkaCisla.map(({ zobrazit, pozice }) => (
          <DivButton pozice={pozice} onClick={() => pridatCislo(zobrazit)}>
            {zobrazit}
          </DivButton>
        ))}

        <DivButton pozice='ac' onClick={() => reset()}>
          AC
        </DivButton>
        <DivButton
          pozice='del'
          onClick={() => setCislo((pre) => pre.slice(0, -1))}
        >
          DEL
        </DivButton>
        <DivButton pozice='rovno' onClick={() => spocitat()}>
          =
        </DivButton>
      </DivGrid>
    </DivLayout>
  );
};

export default Home;
