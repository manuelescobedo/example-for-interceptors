import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  private _getMethod(context) {
    switch (context) {
      case "warning":
        return "warning";
      case "error":
        return "error";
    }
    return "log";
  }
  getSettings() {}
  prompt(args) {
    for (const key in args) {
      console[this._getMethod(args.context)](key, args[key]);
    }
  }
}