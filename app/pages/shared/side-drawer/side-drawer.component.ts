import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ItemEventData } from "ui/list-view";

/* ***********************************************************
* Keep data that is displayed in your app drawer in the SideDrawer component class.
* Add new data objects that you want to display in the drawer here in the form of properties.
*************************************************************/
@Component({
    selector: "SideDrawer",
    moduleId: module.id,
    templateUrl: "./side-drawer.component.html",
    styleUrls: ["./side-drawer.component.css"]
})
export class SideDrawerComponent implements OnInit {
    /* ***********************************************************
    * The "selectedPage" is a component input property.
    * It is used to pass the current page title from the containing page component.
    * You can check how it is used in the "isPageSelected" function below.
    *************************************************************/
    @Input() selectedPage: string;

    private _navigationItems: Array<any>;

    constructor(private routerExtensions: RouterExtensions) {

    }

    /* ***********************************************************
    * Use the SideDrawerComponent "onInit" event handler to initialize the properties data values.
    * The navigationItems property is initialized here and is data bound to <ListView> in the MyDrawer view file.
    * Add, remove or edit navigationItems to change what is displayed in the app drawer list.
    *************************************************************/
    ngOnInit(): void {
        this._navigationItems = [
            {
                title: "Home",
                name: "home",
                route: "/orders-list",
                icon: "\uf015"
            },
            {
                title: "Profile",
                name: "profile",
                route: "/profile",
                icon: "\uf1ea"
            },
            {
                title: "Next 10 days Orders",
                name: "next 10 days orders",
                route: "/orders-list",
                icon: "\uf002"
            },
            {
                title: "Next 20 days Orders",
                name: "next 20 days orders",
                route: "/orders-list",
                icon: "\uf005"
            },
            {
                title: "Last 30 days Orders",
                name: "Last 30 days orders",
                route: "/orders-list",
                icon: "\uf005"
            }
        ];
    }

    get navigationItems(): Array<any> {
        return this._navigationItems;
    }

    /* ***********************************************************
    * Use the "itemTap" event handler of the <ListView> component for handling list item taps.
    * The "itemTap" event handler of the app drawer <ListView> is used to navigate the app
    * based on the tapped navigationItem's route.
    *************************************************************/
    onNavigationItemTap(args: ItemEventData): void {
        const navigationItemView = args.view;
        const navigationItemRoute = navigationItemView.bindingContext.route;

        this.routerExtensions.navigate([navigationItemRoute], {
            transition: {
                name: "slide"
            }
        });
    }

    /* ***********************************************************
    * The "isPageSelected" function is bound to every navigation item on the <ListView>.
    * It is used to determine whether the item should have the "selected" class.
    * The "selected" class changes the styles of the item, so that you know which page you are on.
    *************************************************************/
    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
