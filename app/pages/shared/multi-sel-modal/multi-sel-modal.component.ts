import {Component, OnInit} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular";
import {Page} from "tns-core-modules/ui/page";

@Component({
    moduleId: module.id,
    templateUrl: "./multi-sel-modal.component.html",
    styleUrls: ["./multi-sel-modal.component.css"]
})
export class MultiSelModalComponent implements OnInit {

    public selectedOpts: string[] = [];

    constructor(private params: ModalDialogParams, private page: Page) {
        console.log('In ModalOptionsComp constructor: ' + this.params.context["title"]);
        console.log('In ModalOptionsComp constructor: ' + this.params.context["listOptions"]);
        console.log('In ModalOptionsComp constructor: ' + this.params.context["selectedOptions"]);
        this.selectedOpts.push(...this.params.context["selectedOptions"]);
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
        this.page.on("unloaded", () => {
            this.params.closeCallback();
        });

    }

    cancelTapped() {
        this.params.closeCallback();
    }

    clearTapped() {
        this.params.closeCallback([]);
    }

    selectTapped() {
        this.params.closeCallback(this.selectedOpts);
    }

    matTypeTapped(opt: string) {

        console.log('Material type selected: ' + opt
            + '\nselectedOpts[opt].index: ' + this.selectedOpts.indexOf[opt]);

        // let selLabel: Label = <Label>this.page.getViewById<Label>(opt);

        if (this.selectedOpts.indexOf(opt) === -1) // element exists in array
            this.selectedOpts.push(opt);
        else
            this.selectedOpts.splice(this.selectedOpts.indexOf(opt), 1); // Remove one item at the index

        console.log('selected opts: ' + this.selectedOpts);
    }

}
