import {privateDecrypt} from "crypto"

interface Amount {
    numericAmount: number,
    unit: 'l' | 'g'
}

interface Money {
    numericAmount: number,
    currency: 'EUR'
}

export class Product {
    constructor(public readonly name: string,
                public readonly packagingType: string,
                public readonly amount: string,
                public readonly price: number) {
    }

    static withName(name: string) {
        return new Product(name, '', '', 0)
    }

    static withNameAndPrice(name: string, price: string) {
        let regexResult = /([0-9]*\.?[0-9]*) EUR/.exec(price)
        if (regexResult == null) {
            throw Error('wrong price format')
        }
        return new Product(name, '', '', Number(regexResult[1]))
    }

    static createWith(name: string, packagingType: string, amount: string, price: string) {
        let regexResult = /([0-9]*\.?[0-9]*) EUR/.exec(price)
        if (regexResult == null) {
            throw Error('wrong price format')
        }
        return new Product(name, packagingType, amount, Number(regexResult[1]))
    }
}
