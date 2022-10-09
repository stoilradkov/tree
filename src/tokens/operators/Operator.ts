import { Bracket } from "../brackets/Bracket";
import { Token } from "../Token";
import { Operand } from "../operands/Operand";

export abstract class Operator implements Token {
    public abstract getPriority(): number;
    public abstract get symbol(): string;
    public abstract execute(left: number, right: number): number;

    public isOperand(): this is Operand {
        return false;
    }

    public isBracket(): this is Bracket {
        return false;
    }

    public isOperator(): this is Operator {
        return true;
    }
}
