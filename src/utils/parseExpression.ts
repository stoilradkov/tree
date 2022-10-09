import { isStartOfNumber, extractNumber } from "./numbers";

const SEPARATOR = "|";

export const parseExpression = (expression: string) => {
    const tokens = [];
    let i = 0;
    const parsedExpression = expression.replace(/\s+/g, SEPARATOR);
    while (i < parsedExpression.length) {
        if (isSeparator(parsedExpression[i])) {
            i++;
        } else if (
            isStartOfNumber(
                isSeparator(parsedExpression[i - 1]) ? parsedExpression[i - 2] : parsedExpression[i - 1],
                parsedExpression[i]
            )
        ) {
            const result = extractNumber(parsedExpression, i);
            if (result === null) {
                tokens.push(parsedExpression[i]);
                i++;
            } else {
                tokens.push(result.number);
                i = result.endIndex;
            }
        } else {
            tokens.push(parsedExpression[i]);
            i++;
        }
    }

    return tokens;
};

const isSeparator = (token: string) => token === SEPARATOR;
