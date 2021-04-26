import {Component, Input, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {Order} from "../../model/order";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {ItemEventData, ListView} from "tns-core-modules/ui/list-view";
import {environment} from "../../config/environment";
import {TextField} from "tns-core-modules/ui/text-field";
import {SegmentedBar, SegmentedBarItem} from "tns-core-modules/ui/segmented-bar";
import {DrawerTransitionBase, SlideInOnTopTransition} from "nativescript-pro-ui/sidedrawer";
import {RadSideDrawerComponent} from "nativescript-pro-ui/sidedrawer/angular";
import {isAndroid} from "tns-core-modules/platform";
import {OrdersListService} from "./orders-list.service";
import {OrderType} from "../../model/order-type";
import {ModalDialogOptions, ModalDialogService} from "nativescript-angular";
import {ModalOptionsComponent} from "../shared/modal-options/modal-options.component";
import {OrderingParams} from "../shared/modal-options/ordering-params";
import {MaterialType} from "../../model/material-type";
import {MultiSelModalComponent} from "../shared/multi-sel-modal/multi-sel-modal.component";
import {LoadingIndicatorService} from "../shared/loading-indicator.service";
import {Page} from "tns-core-modules/ui/page";
import {ModalDatetimepicker} from "nativescript-modal-datetimepicker";
import {ModalDatepickComponent} from "../shared/modal-datepick/modal-datepick.component";

@Component({
    selector: "OrdersList",
    moduleId: module.id,
    templateUrl: "./orders-list.component.html",
    styleUrls: ["./orders-list.component.css"]
})
export class OrdersListComponent implements OnInit {

    @Input() fromDate: Date;
    @Input() toDate: Date;
    public dummy7dayOrders: Array<Order> = [];
    public orders: Array<Order> = [];
    public ordersWithoutFilters: Array<Order> = [];
    public pendingOrders: Array<Order> = [];
    public finishedOrders: Array<Order> = [];
    public segBarItems: Array<SegmentedBarItem> = [];
    public title: string = "";
    public orderStr: string = " Orders";

    public emptyFilterProp = environment.SelectFilterProp;
    public selectedFilterProp = this.emptyFilterProp;
    public noFilterProp = environment.NoFilterProp;
    public filterOnProps = environment.filterOnProps;
    public envSortBtnText = environment.SortBtnText;
    public sortBtnText = environment.SortBtnText;

    @ViewChild("searchTextField") searchTextField: TextField;
    // @ViewChild("segBarRef") segBar: SegmentedBar;

    public emptySortProp = environment.SelectSortProp;
    public selectedSortProp = this.emptySortProp;
    public noSortProp = environment.NoSortProp;
    public sortOnProps = environment.SortOnProps;
    public selectedMatTypes: string[] = []; // selected material types

    public isSortSelected: boolean = false;
    public sortedAsc: boolean = false;
    private searchTextView: TextField;
    private ordersListView: ListView;
    private modalDatetimepicker: ModalDatetimepicker;
    // public activityIndicator:boolean = false;
    /* ***********************************************************
        * Use the @ViewChild decorator to get a reference to the drawer component.
        * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
        *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private olService: OrdersListService, private modalService: ModalDialogService,
                private liService: LoadingIndicatorService, private vcRef: ViewContainerRef, private page: Page) {
        console.log('$$$$$$$$  in constructor, to date: ' + this.orders);
    }

    private initSegBarItems() {

        const today = new SegmentedBarItem();
        today.title = "Today";
        this.segBarItems.push(today);
        this.title = today.title + this.orderStr;

        const tomorrow = new SegmentedBarItem();
        tomorrow.title = "Tomorrow";
        this.segBarItems.push(tomorrow);

        const next7days = new SegmentedBarItem();
        next7days.title = "7 Days";
        this.segBarItems.push(next7days);
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.initSegBarItems();
        this.searchTextView = <TextField>this.page.getViewById<TextField>("searchTxtFieldView");
        this.ordersListView = <ListView>this.page.getViewById<ListView>("ordersListView");
        this.modalDatetimepicker = new ModalDatetimepicker();
        /*this.olService.getOrders(null, new Date(), new Date()).then(ords => {
            this.dummy7dayOrders = ords;
            console.log('# orders in return: ' + ords.length + '\tassigned: ' + this.dummy7dayOrders.length);
        });*/
    }


    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    public searchSubmitted(): void {

        console.log('$$$$$$$$$ Search submitted: ' + this.searchTextView.text);
        this.filterOrdersOnSearchText();

    }

    public searchTapped(args) {

        console.log('Search button tapped: ' + args + '\t search text: ' + this.searchTextView.text);
        this.searchTextView.dismissSoftInput();
        this.filterOrdersOnSearchText();

    }

    private filterOrdersOnSearchText() {

        this.liService.showLoading('Searching orders');
        this.applyFilters()
        this.liService.hideLoading();
    }

    public onOrderTap(args: ItemEventData): void {
        console.log('$$$$$$$$$ Item tapped: ' + args);
    }

    getOrderStatus(order: Order): string {

        if (order.isPickedOrShipped) {
            return order.orderType === OrderType.Pickup ? environment.OrderPickedUp : environment.OrderDelivered;
        }
        else if (!order.orderPlaced)
            return environment.OrderNotOrdered;
        else if (order.orderConfirmations.length == 0 && order.orderPlaced)
            return environment.OrderOrdered;

        return "Confirmed " + order.orderConfirmations[0].priorDays +
            (order.orderConfirmations[0].priorDays > 1 ? " days" : " day") + " prior";

    };

    getOrderStatusColor(order: Order): string {

        let status = this.getOrderStatus(order);

        if (status === environment.OrderConfirmedb41day)
            return environment.skyColor;
        else if (status === environment.OrderConfirmedb44day)
            return "#d261f9";
        else if (status === environment.OrderPickedUp || status === environment.OrderDelivered)
            return "green";
        else if (status === environment.OrderNotOrdered)
            return "red";
        else if (status === environment.OrderOrdered)
            return "#ff8330";

        return "red";
    }

    getButtonStatus(order: Order): string {

        let status = this.getOrderStatus(order);

        if (status === environment.OrderPickedUp)
            return environment.OrderPickedUp;
        else if (status === environment.OrderDelivered)
            return environment.OrderDelivered;

        else {
            if (order.orderType === OrderType.Pickup)
                return environment.PickUp;
            else
                return environment.Deliver;
        }

    }

    getButtonBgColor(order: Order): string {

        if (order.isPickedOrShipped)
            return "#7cc17c";
        else
            return environment.lightenedSkyColor;

    }

    getCardViewRadius(): number {
        return isAndroid ? 35 : 10;
    }

    getIconSource(icon: string, iosDir: string): string {
        return isAndroid ? "res://" + icon : "res://" + iosDir + "/" + icon;
    }

    public filterItemChanged(args) {
        // todo: update showing orders
    }

    public confirmPickup(args) {
        let o: Order = args as Order;
        console.log('Job name: ' + o.jobName + "" +
            "\nDate string: " + new Date().toLocaleString("en-US"));

        dialogs.confirm({
            title: "Picking up Order",
            message: "\nI am picking up \"" + o.jobName + "-" + o.purchOrderNum
            + "\" order at " + new Date().toLocaleString(),
            okButtonText: "Yes",
            cancelButtonText: "No",

        }).then((result) => {
            console.log(result);
            if (result) {
                this.liService.showLoading('Moving Picked/Delivered Order to Bottom.');
                let idx = this.ordersWithoutFilters.indexOf(o);
                let owf = this.ordersWithoutFilters[idx];
                // update order finished
                o.isPickedOrShipped = true;
                owf.isPickedOrShipped = true;
                // remove and add order to end
                let remEleArr: Order[] = this.orders.splice(this.orders.indexOf(o), 1);
                this.orders.push(...remEleArr);
                // Apply sort
                this.applySort();
                this.liService.hideLoading();
            }
        });
    }

    /*pickDeliverDtChangeTap(order: Order) {

        console.log('Deliver date change tapped: ' + order.jobName);
        let ordIdx = this.orders.indexOf(order);
        console.log('Index of order: ' + this.orders.indexOf(order))

        this.searchTextView.dismissSoftInput();

        let minDt: Date = new Date();
        let maxDt: Date = new Date(order.pickupDate);
        maxDt.setDate(order.pickupDate.getDate() + 30);

        this.modalDatetimepicker.pickDate({
            title: "Change Pick/Deliver Date",
            theme: "dark blurry",
            maxDate: maxDt,
            minDate: minDt,
            is24HourView: true
        })
            .then((result: any) => {
                console.log("result: " + result);
                console.log("Result from modal: " + result.day + "-" + result.month + "-" + result.year);
                let selDate = new Date(order.pickupDate);
                selDate.setFullYear(result.year, result.month - 1, result.day);
                // let selDate = new Date(result.year, result.month - 1, result.day, order.pickupDate.getHours(), order.pickupDate.getMinutes(), 0, 0);
                order.pickupDate = new Date(selDate);
                console.log('order pickup date: ' + order.pickupDate);
            }).catch((error) => {
            console.error("Error choosing different pick/deliver date: " + error);
        });

    }*/

    pickDeliverDtChangeTap(order: Order) {

        console.log('Deliver date change tapped: ' + order.jobName);
        let ordIdx = this.orders.indexOf(order);
        console.log('Index of order: ' + this.orders.indexOf(order))

        this.searchTextView.dismissSoftInput();

        let minDt: Date = new Date();
        let maxDt: Date = new Date(order.pickupDate);
        maxDt.setDate(order.pickupDate.getDate() + 30);

        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: {
                "initialDate": order.pickupDate, "title": 'Change Pick/Deliver Date',
                "minDate": minDt, "maxDate": maxDt
            },
            fullscreen: false,
        };

        this.modalService.showModal(ModalDatepickComponent, options)
            .then((selDate: Date) => {
                console.log('came back from modal: ' + selDate);
                if (!!selDate) {
                    order.pickupDate = new Date(selDate);
                    // this.ordersListView.refresh();
                    // TODO: Call service to update order on server.
                }
            }).catch(error => this.handleError(error));

    }

    /*public segBarLoaded() {
        console.log('In segbar loaded');
        if(isAndroid) {
            let andTabView = (<any>this.segBar)._getAndroidTabView();
            for (var i = 0; i < this.segBar.items.length; i++) {
                andTabView.getTextViewForItemAt(i).setAllCaps(false);
            }
        }
    }*/

    public onSegBarSelectedIndexChange(args) {

        this.searchTextView.dismissSoftInput();

        let segmetedBar = <SegmentedBar>args.object;
        this.title = segmetedBar.items[segmetedBar.selectedIndex].title + this.orderStr;

        this.liService.showLoading('Loading ' + this.title);

        if (this.dummy7dayOrders.length === 0) { // happens 1st time.
            this.olService.getOrders(null, new Date(), new Date()).then(ords => {
                this.dummy7dayOrders = ords;
                console.log('# orders in return: ' + ords.length + '\tassigned: ' + this.dummy7dayOrders.length);
                this.segBarIndexChangeWork(segmetedBar);
                this.liService.hideLoading();
            });
        } else
            this.segBarIndexChangeWork(segmetedBar);

        this.liService.hideLoading();
    }

    private segBarIndexChangeWork(segBar: SegmentedBar) {


        console.log('Segmented bar selected index changed: ' + (segBar.selectedIndex) + "\nTitle: " + this.title);

        let dt: Date = new Date();

        if (segBar.selectedIndex === 0)
            this.preWorkForDisplayOrders(dt, dt);
        else if (segBar.selectedIndex === 1) {
            dt.setDate(dt.getDate() + 1)
            this.preWorkForDisplayOrders(dt, dt);
        }
        else {
            dt.setDate(dt.getDate() + 7)
            this.preWorkForDisplayOrders(new Date(), dt);
        }
        this.ordersWithoutFilters = this.orders;
        this.applyFilters();
    }

    onMainMenuTap(): void {
        console.log('$$$$$$$$$$$$$$ Main menu tapped.')
        this.drawerComponent.sideDrawer.showDrawer();
        /*this.routerExtensions.navigate(['main-menu'], {
            transition: {
                name: "slideTop"
            }
        });*/
    }

    public searchTextFieldTapped(args) {
        console.log('Search text field tapped');
        // this.searchTextField.focus();
    }

    public showMaterialTypeSelect(args) {

        console.log('show order type selector tapped: ' + Object.keys(MaterialType));
        this.searchTextView.dismissSoftInput();

        this.showModalOptions(Object.keys(MaterialType), this.selectedMatTypes, 'Select Types', MultiSelModalComponent, false)
            .then((result: string[]) => {
                console.log('came back from modl: ' + result);
                if (!!result) {
                    console.log('came back from modal: ' + result);
                    this.selectedMatTypes = result;
                    this.liService.showLoading("Filtering Orders");
                    this.applyFilters();
                    this.liService.hideLoading();
                }
            }).catch(error => this.handleError(error));
    }

    private applyFilters(): void {

        this.orders = [];

        this.applyMatTypeFilter();

        this.applySearchFilter();

        this.applySort();
    }

    private applyMatTypeFilter(): void {

        if (this.selectedMatTypes.length === 0) { // Means MaterialType filter is cleared. Show all material types.
            this.orders.push(...this.ordersWithoutFilters);
            return;
        }

        this.ordersWithoutFilters.forEach((ord) => {
            if (this.selectedMatTypes.indexOf(ord.materialType.toString()) > -1)
                this.orders.push(ord);
        });
    }

    private applySearchFilter(): void {

        if (this.searchTextView.text.trim().length === 0)
            return;

        let filteredOrds: Order[] = [];
        filteredOrds = this.orders.filter((ord) => {
            return (ord.jobName.toUpperCase() + ord.purchOrderNum).indexOf(this.searchTextView.text.toUpperCase()) > -1;
        });

        this.orders = filteredOrds;
    }

    private applySort(): void {

        if (!this.isSortSelected && this.sortBtnText === environment.SortBtnText)
            return;

        // find first index of order with isPickedOrDelivered true.
        let idx = this.orders.findIndex(ord => ord.isPickedOrShipped === true);

        // split into two arrays at that index
        let splicedFinishedOrders: Order[] = this.orders.splice(idx);

        // sort both arrays based on sortBtnText
        this.sortOrdersOnField(this.orders);
        this.sortOrdersOnField(splicedFinishedOrders);

        // join both arrays in to this.orders
        this.orders.push(...splicedFinishedOrders);
    }

    private sortOrdersOnField(ords: Order[]) {

        if (this.sortBtnText === environment.SortJobName) {

            if (this.sortedAsc) { // asc
                ords.sort((a, b) => {
                    let ajn = a.jobName.toUpperCase();
                    let bjn = b.jobName.toUpperCase();
                    return ajn < bjn ? -1 : ajn > bjn ? 1 : 0;
                });
            }
            else { // desc
                ords.sort((a, b) => {
                    let ajn = a.jobName.toUpperCase();
                    let bjn = b.jobName.toUpperCase();
                    return ajn > bjn ? -1 : ajn < bjn ? 1 : 0;
                });
            }
        }

        else if (this.sortBtnText === environment.SortCity) {

            if (this.sortedAsc) { // asc
                ords.sort((a, b) => {
                    let ac = a.city.toUpperCase();
                    let bc = b.city.toUpperCase();
                    return ac < bc ? -1 : ac > bc ? 1 : 0;
                });
            }
            else { // desc
                ords.sort((a, b) => {
                    let ac = a.city.toUpperCase();
                    let bc = b.city.toUpperCase();
                    return ac > bc ? -1 : ac < bc ? 1 : 0;
                });
            }
        }

        else if (this.sortBtnText === environment.SortPickupDate) {

            if (this.sortedAsc) { // asc
                ords.sort((a, b) => {
                    let aPickDt = a.pickupDate;
                    let bPickDt = b.pickupDate;
                    return aPickDt < bPickDt ? -1 : aPickDt > bPickDt ? 1 : 0;
                });
            }
            else { // desc
                ords.sort((a, b) => {
                    let aPickDt = a.pickupDate;
                    let bPickDt = b.pickupDate;
                    return aPickDt > bPickDt ? -1 : aPickDt < bPickDt ? 1 : 0;
                });
            }
        }

        else if (this.sortBtnText === environment.SortPurcOrdNum) {

            if (this.sortedAsc) { // asc
                ords.sort((a, b) => {
                    let aPurchOrdNum = a.purchOrderNum;
                    let bPurchOrdNum = b.purchOrderNum;
                    return aPurchOrdNum < bPurchOrdNum ? -1 : aPurchOrdNum > bPurchOrdNum ? 1 : 0;
                });
            }
            else { // desc
                ords.sort((a, b) => {
                    let aPurchOrdNum = a.purchOrderNum;
                    let bPurchOrdNum = b.purchOrderNum;
                    return aPurchOrdNum > bPurchOrdNum ? -1 : aPurchOrdNum < bPurchOrdNum ? 1 : 0;
                });
            }
        }

        else if (this.sortBtnText === environment.SortSalesOrdNum) {

            if (this.sortedAsc) { // asc
                ords.sort((a, b) => {
                    let aSalesOrdNum = a.salesOrderNum;
                    let bSalesOrdNum = b.salesOrderNum;
                    return aSalesOrdNum < bSalesOrdNum ? -1 : aSalesOrdNum > bSalesOrdNum ? 1 : 0;
                });
            }
            else { // desc
                ords.sort((a, b) => {
                    let aSalesOrdNum = a.salesOrderNum;
                    let bSalesOrdNum = b.salesOrderNum;
                    return aSalesOrdNum > bSalesOrdNum ? -1 : aSalesOrdNum < bSalesOrdNum ? 1 : 0;
                });
            }
        }


    }


    public showSortListPicker(args) {

        this.searchTextView.dismissSoftInput();

        this.showModalOptions(environment.SortOnProps,
            (this.isSortSelected ? new OrderingParams(this.sortBtnText, this.sortedAsc) : new OrderingParams()),
            "Sort On", ModalOptionsComponent, false)
            .then((result: OrderingParams) => {
                console.log('came back from modal: ' + result);
                if (!!result) {
                    if (!!result.paramName) { // sort param selected.
                        console.log('came back from modal param name: ' + result.paramName + '\nAsc: ' + result.ascOrder
                            + '\nDesc: ' + !result.ascOrder);
                        this.isSortSelected = true;
                        this.sortedAsc = result.ascOrder;
                        this.sortBtnText = result.paramName;
                        console.log('variables updated: isSortSelected: ' + this.isSortSelected
                            + "\nSortedAsc: " + this.sortedAsc
                            + "\nsortBtnText: " + this.sortBtnText
                            + "\nenvSortBtnText: " + this.envSortBtnText
                        );
                    }
                    else { // clear sort tapped.
                        this.isSortSelected = false;
                        this.sortBtnText = environment.SortBtnText;
                        this.sortedAsc = false;
                    }

                    this.liService.showLoading("Sorting Orders");
                    this.applyFilters();
                    this.liService.hideLoading();
                }
            }).catch(error => this.handleError(error));

    }

    private showModalOptions(listOptions: Array<string>, selectedOpts: any, title: string, comp: any, fullScreen: boolean): Promise<any> {
        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: {"listOptions": listOptions, "title": title, "selectedOptions": selectedOpts},
            fullscreen: fullScreen,
        };

        return this.modalService.showModal(comp, options);
    }

    private handleError(error: any) {
        // TODO: handle error
        console.log("\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Error: " + error);
    }

    private preWorkForDisplayOrders(start: Date, end: Date) {

        this.orders = this.getOrdersInDateRange(start, end);
        console.log('# orders: ' + this.orders.length + '\n# 7 day orders: ' + this.dummy7dayOrders.length);

        // Separate finished and pending orders.
        this.separateOrders();
        console.log('Separated # orders: ' + this.orders.length + '\n#Finished: ' + this.finishedOrders.length + '\n#Pending: ' + this.pendingOrders.length);

        // Sort finished and pending orders.
        this.sortOrders();
        console.log('Sorted # orders: ' + this.orders.length + '\n#Finished: ' + this.finishedOrders.length + '\n#Pending: ' + this.pendingOrders.length);

        // Update orders.
        this.orders = [];
        this.orders.push(...this.pendingOrders);
        this.orders.push(...this.finishedOrders);
        console.log('Updated # orders: ' + this.orders.length + '\n#Finished: ' + this.finishedOrders.length + '\n#Pending: ' + this.pendingOrders.length);
    }

    private getOrdersInDateRange(start: Date, end: Date): Order[] {

        let ors: Order[] = [];

        this.dummy7dayOrders.forEach((o) => {
            if (o.pickupDate.getDate() >= start.getDate() && o.pickupDate.getDate() <= end.getDate())
                ors.push(o);
        });

        return ors;
    }

    private separateOrders(): void {

        this.pendingOrders = [];
        this.finishedOrders = [];

        this.orders.forEach((o) => {
            if (o.isPickedOrShipped)
                this.finishedOrders.push(o);
            else
                this.pendingOrders.push(o);
        });
    }

    private sortOrders(): void {
        this.pendingOrders.sort((a, b) => {
            return (b.pickupDate) > (a.pickupDate) ? -1 : (b.pickupDate) < (a.pickupDate) ? 1 : 0;
        });

        this.finishedOrders.sort((a, b) => {
            return (b.pickupDate) > (a.pickupDate) ? -1 : (b.pickupDate) < (a.pickupDate) ? 1 : 0;
        });
    }

}
