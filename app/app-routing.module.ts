import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    // { path: "", redirectTo: "/scratch", pathMatch: "full" },
    { path: "", redirectTo: "/orders-list", pathMatch: "full" },
    { path: "orders-list", loadChildren: "./pages/orders-list/orders-list.module#OrdersListModule" },
    { path: "scratch", loadChildren: "./pages/scratch-comp/scratch.module#ScratchModule" },
    { path: "profile", loadChildren: "./pages/profile/profile.module#ProfileModule" }
];


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
