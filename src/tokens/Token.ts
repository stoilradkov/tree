import { Bracket } from "./brackets/Bracket";
import { Operand } from "./operands/Operand";
import { Operator } from "./operators/Operator";

export interface Token {
    isOperand(): this is Operand;
    isBracket(): this is Bracket;
    isOperator(): this is Operator;

    get symbol(): string;
}

export interface TokenType {
    isOfType(symbol: string): boolean;
    build(symbol: string): Token;
}
