import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {environment} from "../../config/environment";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {TextField} from "tns-core-modules/ui/text-field";
import {ActionOptions} from "tns-core-modules/ui/dialogs";
import {isAndroid} from "tns-core-modules/platform";

// import * as elementRegistryModule from 'nativescript-angular/element-registry';

/*elementRegistryModule.registerElement("CardView",
    () => require("nativescript-cardview").CardView);
elementRegistryModule.registerElement("FilterSelect",
    () => require("nativescript-filter-select").FilterSelect);*/

@Component({
    selector: "ScratchComp",
    moduleId: module.id,
    templateUrl: "./scratch-comp.component.html",
    styleUrls: ["./scratch-comp.component.css"]
})
export class ScratchCompComponent implements OnInit {


    public emptyFilterProp = environment.SelectFilterProp;
    public selectedFilterProp = this.emptyFilterProp;
    public noFilterProp = environment.NoFilterProp;
    public filterOnProps = [];

    @ViewChild("filterTextField") filterTf: TextField;

    constructor() {
        console.log('Show list picker: ' + this.noFilterProp);
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
        this.filterOnProps = environment.filterOnProps;
        this.filterOnProps.unshift(this.noFilterProp);

    }

    getIconSource(icon: string, iosDir: string): string {
        return isAndroid ? "res://" + icon : "res://" + iosDir + "/" + icon;
    }

    public showFilterListPicker(args) {

        var options:ActionOptions = {
            message: "Select Filter",
            cancelButtonText: "Cancel",
            actions: this.filterOnProps
        };

        dialogs.action(options).then((result) => {
            console.log(result);
            if (result === 'Cancel' || result === this.noFilterProp)
                this.selectedFilterProp = this.emptyFilterProp;
            else {
                this.selectedFilterProp = result;
                this.filterTf.focus();
            }
        });
    }


}
