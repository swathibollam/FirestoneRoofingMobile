import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import {ScratchCompComponent} from "./scratch-comp.component";

const routes: Routes = [
    { path: "", component: ScratchCompComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ScratchRoutingModule { }
