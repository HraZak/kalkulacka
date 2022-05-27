import { operatory, operatoryPriority } from '../constants/math_const';

export const isFloat = (x: string) => {
  return parseFloat(x).toString() === x ? true : false;
};

export const porovnatOperatory = (prvni: string, druhy: string) => {
  const prvni_vaha = operatoryPriority[prvni];
  const druhy_vaha = operatoryPriority[druhy];

  return prvni_vaha > druhy_vaha ? 1 : prvni_vaha === druhy_vaha ? 0 : -1;
};

const arrayPosledni = (array: string[]) => {
  return array[array.length - 1] ?? '';
};

export const smazat = (array: string[]) => {
  const array_temp = [...array];

  if (arrayPosledni(array_temp).length > 1) {
    return array_temp.map((e, i) =>
      i < array_temp.length - 1 ? e : e.slice(0, -1),
    );
  } else {
    return array_temp.filter((e, i) => i < array_temp.length - 1);
  }
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
      ) {
        return [...array_temp, x];
      }
      break;
    case ')':
      if (
        !operatory.includes(zadanoPosledni) &&
        zadanoPosledni !== '(' &&
        zadanoPosledni !== ''
      ) {
        return [...array_temp, x];
      }
      break;
  }

  return array_temp;
};

export const zmenitOperator = (array: string[], x: string) => {
  const array_temp = [...array];
  const zadanoPosledni = arrayPosledni(array_temp);

  if (zadanoPosledni === '' || zadanoPosledni === '') {
    return array_temp;
  } else if (operatory.includes(zadanoPosledni)) {
    return array_temp.map((e, i) => (i < array_temp.length - 1 ? e : x));
  } else {
    return [...array_temp, x];
  }
};

export const pridatCislo = (array: string[], x: string) => {
  const array_temp = [...array];
  const zadanoPosledni = arrayPosledni(array_temp);

  switch (zadanoPosledni) {
    case ')':
      break;
    case '':
    case '+':
    case '-':
    case '*':
    case '/':
    case '^':
    case '(':
      if (x === '.') {
        return [...array_temp, '0.'];
      } else {
        return [...array_temp, x];
      }
    default:
      if (x === '.') {
        if (!zadanoPosledni.includes('.')) {
          return array_temp.map((e, i) =>
            i < array_temp.length - 1 ? e : e + x,
          );
        }
      } else if (x === '0') {
        if (zadanoPosledni !== '0') {
          return array_temp.map((e, i) =>
            i < array_temp.length - 1 ? e : e + x,
          );
        }
      } else {
        if (zadanoPosledni === '0') {
          return array_temp.map((e, i) => (i < array_temp.length - 1 ? e : x));
        } else {
          return array_temp.map((e, i) =>
            i < array_temp.length - 1 ? e : e + x,
          );
        }
      }
  }

  return array_temp;
};

export const pridatOdmocninu = (array: string[]) => {
  let array_temp = [...array];

  array_temp = zmenitOperator(array_temp, '^');
  if (array_temp[array_temp.length - 1] === '^') {
    array_temp.push('0.5');
  }

  return array_temp;
};
