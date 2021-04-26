import {Component, OnInit} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular";
import {Page} from "tns-core-modules/ui/page";
import {DatePicker} from "tns-core-modules/ui/date-picker";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-datepick.component.html",
    styleUrls: ["./modal-datepick.component.css"]
})
export class ModalDatepickComponent implements OnInit {

    datePicker: DatePicker;
    initialDate: Date;
    minDate: Date;
    maxDate: Date;

    constructor(private params: ModalDialogParams, private page: Page) {
        this.initialDate = this.params.context["initialDate"];
        this.minDate = this.params.context["minDate"];
        this.maxDate = this.params.context["maxDate"];
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
        this.datePicker = <DatePicker>this.page.getViewById<DatePicker>("pickDeliverDatePicker");
        this.page.on("unloaded", () => {
            // using the unloaded event to close the modal when there is user interaction
            // e.g. user taps outside the modal page
            this.params.closeCallback();
        });

    }

    cancelTapped() {
        this.params.closeCallback();
    }

    okTapped() {
        let selDate: Date = new Date(this.params.context["initialDate"]);
        selDate.setFullYear(this.datePicker.date.getFullYear(), this.datePicker.date.getMonth(),
            this.datePicker.date.getDate())
        this.params.closeCallback(selDate);
    }

}
