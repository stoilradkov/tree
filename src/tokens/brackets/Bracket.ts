import { Token } from "../Token";
import { Operand } from "../operands/Operand";
import { Operator } from "../operators/Operator";

export abstract class Bracket implements Token {
    public abstract getPriority(): number;
    public abstract get symbol(): string;

    public isOperand(): this is Operand {
        return false;
    }

    public isBracket(): this is Bracket {
        return true;
    }

    public isOperator(): this is Operator {
        return false;
    }
}
