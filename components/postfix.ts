import Decimal from 'decimal.js';
import { operatory } from '../constants/math_const';

const evalPostfix = (postfixInput: string[]) => {
  const postfix = [...postfixInput];
  let stack = [];

  for (const i of postfix) {
    switch (i) {
      case '+':
      case '-':
      case '*':
      case '/':
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
  let stack = [];
  let postfix = [];

  infix.push('end');

  for (let i = 0; i < infix.length; ) {
    const temp = infix[i];
    switch (temp) {
      case 'end':
        if (stack.length === 0) i++;
        else postfix.push(stack.pop());
        break;
      case '+':
      case '-':
        if (stack.length === 0 || stack[stack.length - 1] === '(') {
          stack.push(temp);
          i++;
        } else postfix.push(stack.pop());
        break;
      case '*':
      case '/':
        if (
          stack.length === 0 ||
          stack[stack.length - 1] === '(' ||
          stack[stack.length - 1] === '+' ||
          stack[stack.length - 1] === '-'
        ) {
          stack.push(temp);
          i++;
        } else postfix.push(stack.pop());
        break;
      case '(':
        stack.push('(');
        i++;
        break;
      case ')':
        if (stack[stack.length - 1] === '(') {
          stack.pop();
          i++;
        } else postfix.push(stack.pop());
        break;
      default:
        postfix.push(temp);
        i++;
        break;
    }
  }
  return postfix;
};

export const repairInfix = (infixInput: string[]) => {
  const infix = [...infixInput];

  if (operatory.includes(infix[infix.length - 1])) infix.pop();

  const pomerZavorek =
    infix.filter((e) => e == '(').length - infix.filter((e) => e == ')').length;

  if (pomerZavorek < 0)
    for (let i = 0; i > pomerZavorek; i--) infix.unshift('(');
  else if (pomerZavorek > 0)
    for (let i = 0; i < pomerZavorek; i++) infix.push(')');

  return infix;
};

export const vypocitej = (zadano: string[]) => {
  return evalPostfix(convertInfixToPostfix(repairInfix(zadano)));
};
