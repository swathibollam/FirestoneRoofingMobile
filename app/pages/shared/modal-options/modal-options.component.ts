import {Component, OnInit} from "@angular/core";
import {isAndroid} from "tns-core-modules/platform";
import {ModalDialogParams} from "nativescript-angular";
import {Page} from "tns-core-modules/ui/page";
import {DatePicker} from "tns-core-modules/ui/date-picker";
import {OrderingParams} from "./ordering-params";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-options.component.html",
    styleUrls: ["./modal-options.component.css"]
})
export class ModalOptionsComponent implements OnInit {


    ascOrder: string = "asc";
    descOrder: string = "desc";
    orderingParams:OrderingParams;

    constructor(private params: ModalDialogParams, private page: Page) {
        console.log('In ModalOptionsComp constructor: ' + this.params.context["title"]);
        console.log('In ModalOptionsComp constructor: ' + this.params.context["listOptions"]);
        console.log('In ModalOptionsComp constructor: ' + this.params.context["selectedOptions"]);
        this.orderingParams = this.params.context["selectedOptions"];
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
        this.page.on("unloaded", () => {
            // using the unloaded event to close the modal when there is user interaction
            // e.g. user taps outside the modal page
            this.params.closeCallback();
        });

    }

    public submit() {
        let datePicker: DatePicker = <DatePicker>this.page.getViewById<DatePicker>("datePicker");
        this.params.closeCallback(datePicker.date);
    }

    optionTapped(tappedOptStr:string, ordering:string) {
        console.log('$$$$$$$ Tapped option str: ' + tappedOptStr);
        console.log('$$$$$$$ Tapped option str: ' + ordering);
        this.params.closeCallback(new OrderingParams(tappedOptStr, (this.ascOrder === ordering) ? true : false));
    }

    cancelTapped() {
        this.params.closeCallback();
    }

    clearTapped() {
        this.params.closeCallback(new OrderingParams());
    }

}
