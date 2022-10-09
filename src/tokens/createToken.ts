import tokens from "./index";

export const createToken = (symbol: string) => {
    const token = tokens.find(token => token.isOfType(symbol));

    if (token === undefined) {
        throw new Error("Unknown token");
    }

    return token.build(symbol);
};
