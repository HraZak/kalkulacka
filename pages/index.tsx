import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  DivButton,
  DivDisplay,
  DivDisplayCislo,
  DivDisplayZadano,
  DivGrid,
  DivLayout,
} from '../components/componenty';
import { pridatZavorku, smazat } from '../components/functions';
import { repairInfix, vypocitej } from '../components/postfix';
import {
  operatory,
  tlacitkaCisla,
  tlacitkaOperatory,
} from '../constants/math_const';

const Home: NextPage = () => {
  const [zadano, setZadano] = useState<string[]>([]);
  const [vysledek, setVysledek] = useState('');

  const zadanoPosledni = zadano[zadano.length - 1] ?? '';

  const useReset = () => {
    setZadano([]);
    setVysledek('');
  };

  const useSmazat = () => {
    setZadano((pre) => smazat(pre));
  };

  const useVypocitat = () => {
    setZadano((pre) => repairInfix(pre));
    setVysledek(vypocitej(zadano));
  };

  const usePridatZavorku = (x: string) => {
    setZadano((pre) => pridatZavorku(pre, x));
  };

  const pridatCislo = (x: string) => {
    switch (zadanoPosledni) {
      case ')':
        break;
      case '':
      case '+':
      case '-':
      case '*':
      case '/':
      case '(':
        setZadano((pre) => [...pre, x]);
        break;
      default:
        setZadano((pre) => pre.map((e, i) => (i < pre.length - 1 ? e : e + x)));
        break;
    }

    // switch (x) {
    //   case '.':
    //     if (!cislo.includes('.')) {
    //       if (cislo === '') setCislo('0.');
    //       else setCislo((pre) => pre + '.');
    //     }
    //     break;
    //   case '0':
    //     if (cislo !== '0') setCislo((pre) => pre + '0');
    //     break;
    //   default:
    //     setCislo((pre) => (pre === '0' ? x : pre + x));
    //     break;
    // }
  };

  const zmenitOperator = (x: string) => {
    switch (zadanoPosledni) {
      case '':
      case '(':
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        setZadano((pre) => pre.map((e, i) => (i < pre.length - 1 ? e : x)));
        break;
      default:
        setZadano((pre) => [...pre, x]);
        break;
    }
  };

  const useKlavesnice = (e: KeyboardEvent) => {
    e.preventDefault();
    if (!e.repeat) {
      switch (e.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '.':
          pridatCislo(e.key);
          break;
        case '+':
        case '-':
        case '*':
        case '/':
          zmenitOperator(e.key);
          break;
        case 'Enter':
          useVypocitat();
          break;
        case 'Backspace':
          useSmazat();
          break;
        case 'Delete':
          useReset();
          break;
        case '(':
          usePridatZavorku('(');
          break;
        case ')':
          usePridatZavorku(')');
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', useKlavesnice);
    return () => window.removeEventListener('keydown', useKlavesnice);
  });

  return (
    <DivLayout>
      <Head>
        <title>Kalkulačka</title>
        <meta name='description' content='Kalkulačka' />
      </Head>

      <DivGrid>
        <DivDisplay>
          <DivDisplayZadano>{zadano.join('')}</DivDisplayZadano>
          <DivDisplayCislo>{vysledek}</DivDisplayCislo>
        </DivDisplay>

        {tlacitkaOperatory.map(({ zobrazit, pozice }, index) => (
          <DivButton
            key={index}
            pozice={pozice}
            onClick={() => zmenitOperator(zobrazit)}
          >
            {zobrazit}
          </DivButton>
        ))}

        {tlacitkaCisla.map(({ zobrazit, pozice }, index) => (
          <DivButton
            key={index}
            pozice={pozice}
            onClick={() => pridatCislo(zobrazit)}
          >
            {zobrazit}
          </DivButton>
        ))}

        <DivButton pozice='ac' onClick={() => useReset()}>
          AC
        </DivButton>
        <DivButton pozice='del' onClick={() => useSmazat()}>
          DEL
        </DivButton>
        <DivButton pozice='rovno' onClick={() => useVypocitat()}>
          =
        </DivButton>

        <DivButton pozice='oteviraci' onClick={() => usePridatZavorku('(')}>
          (
        </DivButton>
        <DivButton pozice='uzaviraci' onClick={() => usePridatZavorku(')')}>
          )
        </DivButton>
        <DivButton pozice='mocnina'>
          x<sup>y</sup>
        </DivButton>
        <DivButton pozice='odmocnina'>
          <sup>x</sup>√
        </DivButton>
      </DivGrid>
    </DivLayout>
  );
};

export default Home;
