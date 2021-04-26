import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import {ScratchRoutingModule} from "./scratch-routing.module";
import {ScratchCompComponent} from "./scratch-comp.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ScratchRoutingModule,
        SharedModule
    ],
    declarations: [
        ScratchCompComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ScratchModule { }
