import Decimal from 'decimal.js';

export const evalPostfix = (postfix: Array<string> | string) => {
  if (typeof postfix === 'string') postfix = postfix.split(' ');
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
  return stack.pop();
};

export const convertInfixToPostfix = (infix: string) => {
  let infixArray = infix.split(' ');
  infixArray.push('end');
  let stack = [];
  let postfix = [];

  for (let i = 0; i < infixArray.length; ) {
    const temp = infixArray[i];
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
