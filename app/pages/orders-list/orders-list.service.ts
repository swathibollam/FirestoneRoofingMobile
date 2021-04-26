import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Order} from "../../model/order";
import {User} from "../../model/user";
import {MaterialType} from "../../model/material-type";
import {OrderType} from "../../model/order-type";

@Injectable()
export class OrdersListService {

    private headers = new Headers({'Content-Type': 'application/json'});

    public orders: Array<Order> = [];

    constructor(private http: Http) {
    }

    getOrders(user: User, startTime: Date, endTime: Date): Promise<Order[]> {

        this.dummyOrderInitialize();
        console.log('service orders: ' + this.orders.length);
        return Promise.resolve(this.orders);

    }

    private getRandomDate(): Date {

        let dt: Date = new Date();
        dt.setDate(new Date().getDate() + (Math.floor(Math.random() * (7 - 0 )) + 0));
        console.log('dt: ' + dt);
        return dt;
    }

    private dummyOrderInitialize() {


        this.orders.push({
            purchOrderNum: 12345, salesOrderNum: 2789, licenseNum: 2,
            jobName: 'Wal-mart', materialType: MaterialType.insulation, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
            orderConfirmations: [], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 12346, salesOrderNum: 3789, licenseNum: 2,
            jobName: 'Amazon', materialType: MaterialType.membrane, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
            orderConfirmations: [{confirmed: true, priorDays: 1, confirmedAt: new Date()},
                {confirmed: true, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
            ,note: 'Some items are not available. Screws, Nails are not in the confirmed order yet.'
        });
        this.orders.push({
            purchOrderNum: 12347,
            salesOrderNum: 4789,
            licenseNum: 2,
            jobName: 'Albertsons',
            materialType: MaterialType.skylites,
            orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(),
            city: 'Salt lake',
            orderPlaced: false,
            orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
            isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 12348, salesOrderNum: 5789, licenseNum: 2,
            jobName: 'Target', materialType: MaterialType.metal, orderType: OrderType.Pickup, orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
            orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
                {confirmed: true, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 12349, salesOrderNum: 6789, licenseNum: 2,
            jobName: 'Fred mayers', materialType: MaterialType.membrane, orderType: OrderType.Pickup, orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
            orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 22345, salesOrderNum: 7789, licenseNum: 2,
            jobName: 'Smiths', materialType: MaterialType.metal, orderType: OrderType.Delivery, orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: true,
            orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
                {confirmed: true, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 22345,
            salesOrderNum: 8789,
            licenseNum: 2,
            jobName: 'Family dollar',
            materialType: MaterialType.skylites,
            orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(),
            city: 'Salt lake',
            orderPlaced: true,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
            isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 22345,
            salesOrderNum: 9789,
            licenseNum: 2,
            jobName: 'Cricket wireless',
            materialType: MaterialType.insulation,
            orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(),
            city: 'Salt lake',
            orderPlaced: true,
            orderConfirmations: [{confirmed: true, priorDays: 4, confirmedAt: new Date()},
                {confirmed: true, priorDays: 1, confirmedAt: new Date()}],
            isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 22345,
            salesOrderNum: 10789,
            licenseNum: 2,
            jobName: 'Bridgeport retail',
            materialType: MaterialType.insulation,
            orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(),
            city: 'Salt lake',
            orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
            isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 32345, salesOrderNum: 100789, licenseNum: 2,
            jobName: 'Sams club', materialType: MaterialType.metal, orderType: OrderType.Pickup, orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 42345,
            salesOrderNum: 110789,
            licenseNum: 2,
            jobName: 'Costco',
            materialType: MaterialType.membrane,
            orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(),
            city: 'Salt lake',
            orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
            isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Opsgear', materialType: MaterialType.skylites, orderType: OrderType.Pickup, orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 62345,
            salesOrderNum: 130789,
            licenseNum: 2,
            jobName: 'Lees',
            materialType: MaterialType.insulation,
            orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(),
            city: 'Salt lake',
            orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
            isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Dicks sporting', materialType: MaterialType.skylites, orderType: OrderType.Pickup, orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345,
            salesOrderNum: 120789,
            licenseNum: 2,
            jobName: 'Macys',
            materialType: MaterialType.skylites,
            orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(),
            city: 'Salt lake',
            orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}],
            isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'JCPenney', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Belgium chocolates', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Disney', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Johney Rockets', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Great Steak', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Osakiwa', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'McDonalds', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Subway sandwich', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Olive Garden', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'TGI Fridays', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Texas de Brazil', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Verizon Wireless', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'AT & T', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'T-Mobile', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'At Home', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'TJ Maxx', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Home Goods', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Taffy Coffee', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Tillys', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Level 9 Sports', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Interstate Battery', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Handi Quilter', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Apple Station', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Microsoft', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Quallcomm', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Cool Storage', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Rio Grande', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Buca de beppo', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'PF Changs', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Copper Onion', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Cheesecake Factory', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Brio Italian', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Village Bakery', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Goldman sacchs', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'JPMorgan Chase', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Wells Fargo', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Zions bank', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Dixie Waters', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'St George Hospital', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Intermountain Snow', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Brighton resorts', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Alta View Hospital', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Hip & Humble', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Athleta', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Air National Guard', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Southwest', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Jet Fliers', materialType: MaterialType.skylites, orderType: OrderType.Pickup,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Yahoo fish', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Walgreens', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Office Deport', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: true
        });
        this.orders.push({
            purchOrderNum: 52345, salesOrderNum: 120789, licenseNum: 2,
            jobName: 'Lowes', materialType: MaterialType.skylites, orderType: OrderType.Delivery,
            orderDate: new Date(),
            pickupDate: this.getRandomDate(), city: 'Salt lake', orderPlaced: false,
            orderConfirmations: [{confirmed: false, priorDays: 4, confirmedAt: new Date()},
                {confirmed: false, priorDays: 1, confirmedAt: new Date()}], isPickedOrShipped: false
        });
    }
}
