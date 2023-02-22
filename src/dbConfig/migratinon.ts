import {Token,} from "../models/token.model";
import {User} from "../models/user.model";

export async function sequel() {
    for (const model of [User, Token]) {
        await model.sync({force: false})

    }
    process.exit(0)
}
