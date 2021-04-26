import {NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA} from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import {OrdersListRoutingModule} from "./orders-list-routing.module";
import {OrdersListComponent} from "./orders-list.component";
import {SharedModule} from "../shared/shared.module";
import {OrdersListService} from "./orders-list.service";
import {HttpModule} from "@angular/http";
import {ModalDialogService, NSModuleFactoryLoader} from "nativescript-angular";

@NgModule({
    imports: [
        NativeScriptModule,
        OrdersListRoutingModule,
        HttpModule,
        SharedModule
    ],
    declarations: [
        OrdersListComponent
    ],
    providers: [
        OrdersListService,
        ModalDialogService,
        // { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OrdersListModule { }
