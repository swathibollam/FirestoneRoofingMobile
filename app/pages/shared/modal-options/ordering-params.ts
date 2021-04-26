export class OrderingParams {

    paramName: string;
    ascOrder: boolean;

    constructor(paramName?: string, asc?: boolean) {
        this.paramName = paramName;
        this.ascOrder = asc;
    }


}
