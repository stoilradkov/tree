import { Bracket } from "../brackets/Bracket";
import { Token } from "../Token";
import { Operator } from "../operators/Operator";

export abstract class Operand implements Token {
    public abstract get value(): number;
    public abstract get symbol(): string;

    public isOperand(): this is Operand {
        return true;
    }

    public isBracket(): this is Bracket {
        return false;
    }

    public isOperator(): this is Operator {
        return false;
    }
}
