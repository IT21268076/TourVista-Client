export class RoomType {
    roomTypeId: number;
    seasonId: number;
    seasonName: string;
    type: string;
    maxNooOfGuests: number;
    noOfAvailableRooms: number;
    price: number;
    markUpPercentage: any;
    supplementSet: Supplement[];
    discounts: Discount[];

    constructor(
        roomTypeId: number,
        seasonId: number,
        seasonName: string,
        type: string,
        maxNooOfGuests: number,
        noOfAvailableRooms: number,
        price: number,
        markUpPercentage: any,
        supplementSet: Supplement[],
        discountSet: Discount[]
    ) {
        this.roomTypeId = roomTypeId;
        this.seasonId = seasonId;
        this.seasonName = seasonName;
        this.type = type;
        this.maxNooOfGuests = maxNooOfGuests;
        this.noOfAvailableRooms = noOfAvailableRooms;
        this.markUpPercentage = markUpPercentage;
        this.price = price;
        this.supplementSet = supplementSet;
        this.discounts = discountSet
    }
}

export class Supplement {
    supplementId: number;
    name: string;
    price: number;
    description: string;
    supplementsSeasonPrices: any[]; // Add appropriate type

    constructor(
        supplementId: number,
        name: string,
        price: number,
        description: string,
        supplementsSeasonPrices: any[]
    ) {
        this.supplementId = supplementId;
        this.name = name;
        this.price = price;
        this.description = description;
        this.supplementsSeasonPrices = supplementsSeasonPrices;
    }
}

export class Discount {
    discountId: number;
    name: string;
    amount: number;
    description: string; 
    startDate: Date;
    endDate: Date;


    constructor(
        discountId: number,
        name: string,
        amount: number,
        description: string,
        startDate: Date,
        endDate: Date
    ) {
        this.discountId = discountId;
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
