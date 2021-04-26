import {Injectable} from "@angular/core";
import {LoadingIndicator} from "nativescript-loading-indicator";

@Injectable()
export class LoadingIndicatorService extends LoadingIndicator {

    private static liOptions = {
        message: 'Loading Orders...',
        progress: 0.70,
        android: {
            indeterminate: true,
            cancelable: true,
            // cancelListener: function(dialog) { console.log("Loading cancelled") },
            max: 100,
            progressNumberFormat: "%1d/%2d",
            progressPercentFormat: 0.53,
            progressStyle: 1,
            secondaryProgress: 1
        },
        ios: {
            // details: "Additional detail note!",
            margin: 15,
            dimBackground: true,
            color: "#70808f", // color of indicator and labels
            // background box around indicator
            // hideBezel will override this if true
            backgroundColor: "white",
            hideBezel: false, // default false, can hide the surrounding bezel
            // view: UIView, // Target view to show on top of (Defaults to entire window)
            // mode: // see iOS specific options below
        }
    };

    public constructor() {
        super();
    }

    public showLoading(message:string = 'Loading Orders') {
        LoadingIndicatorService.liOptions.message = message;
        console.log('###### showing loading indicator');
        super.show(LoadingIndicatorService.liOptions);
    }

    public hideLoading() {
        setTimeout(() => {
            console.log('waiting 2 seconds');
            console.log('###### closing loading indicator');
            super.hide();
        }, 2000);
    }
}
