import {body} from "express-validator";


export function validRegistrValue() {
    return [
        body('email').isEmail().normalizeEmail().withMessage('Invalid Email'),
        body('password')
            .isLength({min: 6})
            .withMessage('password must be at least 6 chars long')
            .isLength({max: 30})
            .withMessage('password must be at max 30 chars long')
            .matches(/\d/)
            .withMessage('password must contain a number')


    ]

}
