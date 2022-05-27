const peekToken = (tokens: Array<string | number>) => {
  if (tokens.length > 0) {
    return tokens[0];
  } else {
    return undefined;
  }
};

const acceptToken = (
  tokens: Array<string | number>,
  expectedValue: string | undefined,
  expectedType: string | undefined,
) => {
  const token = peekToken(tokens);
  if (
    token &&
    (!expectedValue || token === expectedValue) &&
    (!expectedType || typeof token === expectedType)
  ) {
    const token = tokens.shift();

    return token;
  } else if (expectedValue) {
    throw new Error('Expected value: ' + expectedValue);
  } else if (expectedType) {
    throw new Error('Expected type: ' + expectedType);
  } else {
    throw new Error('Parser error');
  }
};

export const processExpression = (tokens: Array<string | number>) => {
  const left = processExpression1(tokens);

  let wasFound = true;
  let tree = left;

  while (wasFound) {
    switch (peekToken(tokens)) {
      case '+':
        acceptToken(tokens, '+', undefined);
        tree = { op: '+', left: tree, right: processExpression1(tokens) };
        break;
      case '-':
        acceptToken(tokens, '-', undefined);
        tree = { op: '-', left: tree, right: processExpression1(tokens) };
        break;
      default:
        wasFound = false;
    }
  }

  return tree;
};

const processExpression1 = (tokens: Array<string | number>) => {
  const left = processExpression2(tokens);

  let wasFound = true;
  let tree = left;

  while (wasFound) {
    switch (peekToken(tokens)) {
      case '*':
        acceptToken(tokens, '*', undefined);
        tree = { op: '*', left: tree, right: processExpression2(tokens) };
        break;
      case '/':
        acceptToken(tokens, '/', undefined);
        tree = { op: '/', left: tree, right: processExpression2(tokens) };
        break;
      default:
        wasFound = false;
    }
  }

  return tree;
};

const processExpression2 = (tokens: Array<string | number>) => {
  const token = peekToken(tokens);

  if (typeof token === 'number') {
    return acceptToken(tokens, undefined, 'number');
  } else if (token === '(') {
    acceptToken(tokens, '(', undefined);
    const expression = processExpression(tokens);
    acceptToken(tokens, ')', undefined);

    return expression;
  } else {
    throw new Error('Expected number or bracket');
  }
};

export const evaluate = (tree) => {
  if (typeof tree === 'number') {
    return tree;
  } else {
    switch (tree.op) {
      case '+':
        return evaluate(tree.left) + evaluate(tree.right);
      case '-':
        return evaluate(tree.left) - evaluate(tree.right);
      case '*':
        return evaluate(tree.left) * evaluate(tree.right);
      case '/':
        return evaluate(tree.left) / evaluate(tree.right);
    }
  }
};
