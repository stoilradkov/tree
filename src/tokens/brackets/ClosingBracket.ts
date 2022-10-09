import { TokenType, Token } from "../Token";
import { Bracket } from "./Bracket";

export class ClosingBracket extends Bracket {
    #symbol: string;

    constructor(symbol: string) {
        super();
        this.#symbol = symbol;
    }

    public getPriority(): number {
        return 1;
    }

    public get symbol(): string {
        return this.#symbol;
    }
}

export class ClosingBracketType implements TokenType {
    public isOfType(symbol: string): boolean {
        return symbol === ")";
    }

    public build(symbol: string): Token {
        return new ClosingBracket(symbol);
    }
}

export default new ClosingBracketType();
