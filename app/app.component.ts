import * as elementRegistryModule from 'nativescript-angular/element-registry';
import { Component } from "@angular/core";

elementRegistryModule.registerElement("CardView",
    () => require("nativescript-cardview").CardView);
elementRegistryModule.registerElement("FilterSelect",
    () => require("nativescript-filter-select").FilterSelect);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent { }
