import Decimal from 'decimal.js';
import { operatory } from '../constants/math_const';
import { isFloat, porovnatOperatory } from './functions';

const evalPostfix = (postfixInput: string[]) => {
  const postfix = [...postfixInput];
  const stack = [];

  for (const i of postfix) {
    switch (i) {
      case '+':
      case '-':
      case '*':
      case '/':
      case '^':
        let temp = new Decimal(0);
        const druhy = new Decimal(stack.pop());
        const prvni = new Decimal(stack.pop());

        switch (i) {
          case '+':
            temp = Decimal.sum(prvni, druhy);
            break;
          case '-':
            temp = Decimal.sub(prvni, druhy);
            break;
          case '*':
            temp = Decimal.mul(prvni, druhy);
            break;
          case '/':
            temp = Decimal.div(prvni, druhy);
            break;
          case '^':
            temp = Decimal.pow(prvni, druhy);
            break;
        }

        stack.push(temp.toFixed());
        break;
      default:
        stack.push(i);
        break;
    }
  }
  return stack.pop() ?? '';
};

const convertInfixToPostfix = (infixInput: string[]) => {
  const infix = [...infixInput];
  const stack: string[] = [];
  const postfix: string[] = [];

  for (const i of infix) {
    if (isFloat(i)) {
      postfix.push(i);
    } else if (operatory.includes(i)) {
      while (operatory.includes(stack[stack.length - 1])) {
        if (i === '^') {
          if (porovnatOperatory(i, stack[stack.length - 1]) < 0) {
            postfix.push(stack.pop());
          } else {
            break;
          }
        } else if (porovnatOperatory(i, stack[stack.length - 1]) <= 0) {
          postfix.push(stack.pop());
        } else {
          break;
        }
      }
      stack.push(i);
    } else if (i === '(') {
      stack.push(i);
    } else if (i === ')') {
      while (stack[stack.length - 1] !== '(') {
        postfix.push(stack.pop());
      }
      stack.pop();
    }
  }

  return [...postfix, ...stack.reverse()];
};

export const repairInfix = (infixInput: string[]) => {
  const infix = [...infixInput];

  if (operatory.includes(infix[infix.length - 1])) {
    infix.pop();
  }

  const pomerZavorek =
    infix.filter((e) => e == '(').length - infix.filter((e) => e == ')').length;

  if (pomerZavorek < 0) {
    for (let i = 0; i > pomerZavorek; i--) {
      infix.unshift('(');
    }
  } else if (pomerZavorek > 0) {
    for (let i = 0; i < pomerZavorek; i++) {
      infix.push(')');
    }
  }

  return infix;
};

export const vypocitej = (zadano: string[]) => {
  return evalPostfix(convertInfixToPostfix(repairInfix(zadano)));
};
