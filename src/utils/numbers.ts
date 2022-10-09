export const isNumber = (symbol: string) => !isNaN(+symbol) && !isNaN(parseFloat(symbol));

export const isStartOfNumber = (previousCharacter: string, character: string) =>
    isNumber(character) ||
    ((character === "+" || character === "-" || character === ".") &&
        (previousCharacter === undefined || !/[0-9]/.test(previousCharacter)));

export const extractNumber = (expression: string, start: number) => {
    let end = start + 1;

    while (isExpressionNumber(start, end, expression)) {
        end++;
    }

    if (isExpressionNotANumber(start, end, expression)) {
        return null;
    }

    return { number: expression.substring(start, end), endIndex: end };
};

const isExpressionNumber = (start: number, end: number, expression: string) =>
    end < expression.length &&
    (isNumber(expression.substring(start, end + 1)) ||
        (expression[end] === "." && (expression[end - 1] === "-" || expression[end - 1] === "+")));

const isExpressionNotANumber = (start: number, end: number, expression: string) =>
    (end === start + 1 && !/[0-9]/.test(expression[start])) ||
    expression.substring(start, end) === "-." ||
    expression.substring(start, end) === "+.";
