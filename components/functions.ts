import { operatory } from '../constants/math_const';

export const arrayPosledni = (array: string[]) => {
  return array[array.length - 1] ?? '';
};

export const smazat = (array: string[]) => {
  const array_temp = [...array];

  if (arrayPosledni(array_temp).length > 1)
    return array_temp.map((e, i) =>
      i < array_temp.length - 1 ? e : e.slice(0, -1),
    );
  else return array_temp.filter((e, i) => i < array_temp.length - 1);
};

export const pridatZavorku = (array: string[], x: string) => {
  const array_temp = [...array];
  const zadanoPosledni = arrayPosledni(array_temp);

  switch (x) {
    case '(':
      if (
        operatory.includes(zadanoPosledni) ||
        zadanoPosledni === '' ||
        zadanoPosledni === '('
      )
        return [...array_temp, x];
      break;
    case ')':
      if (
        !operatory.includes(zadanoPosledni) &&
        zadanoPosledni !== '(' &&
        zadanoPosledni !== ''
      )
        return [...array_temp, x];
      break;
  }

  return array_temp;
};

export const zmenitOperator = (array: string[], x: string) => {
  const array_temp = [...array];

  switch (arrayPosledni(array_temp)) {
    case '':
    case '(':
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      return array_temp.map((e, i) => (i < array_temp.length - 1 ? e : x));
    default:
      return [...array_temp, x];
  }

  return array_temp;
};

export const pridatCislo = (array: string[], x: string) => {
  const array_temp = [...array];

  switch (arrayPosledni(array_temp)) {
    case ')':
      break;
    case '':
    case '+':
    case '-':
    case '*':
    case '/':
    case '(':
      return [...array_temp, x];
    default:
      return array_temp.map((e, i) => (i < array_temp.length - 1 ? e : e + x));
  }

  return array_temp;

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
