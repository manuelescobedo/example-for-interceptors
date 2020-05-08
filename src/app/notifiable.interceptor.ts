import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Endpoints } from "./endpoints";
import { MockedEndpoints } from "./mock-endpoints";
import { of } from "rxjs";
import { CACHEABLE } from "./cacheable.decorator";
import { CacheService } from "./cache.service";
import { tap } from "rxjs/operators";
import { NOTIFIABLE } from "./notifiable.decorator";

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

@Injectable({
  providedIn: "root"
})
export class NotifiableInterceptor implements HttpInterceptor {
  constructor(
    private endpoints: Endpoints,
    private notificationService: NotificationService
  ) {}

  private _promptNotification = ({ req, context = "success" }) => res => {
    if (this.notifiableEndpoints && this.notifiableEndpoints.length > 0) {
      let endpoint = this.notifiableEndpoints.find(
        ([_, { context, url, method }]) => {
          return req.url.includes(url) && req.method === method;
        }
      );

      if (!!endpoint) {
        this.notificationService.prompt({ ...endpoint[1], context });
      }
    }
  };

  get notifiableEndpoints() {
    return Object.entries(this.endpoints[NOTIFIABLE]);
  }

  intercept(req, next) {
    return next
      .handle(req)
      .pipe(
        tap(
          this._promptNotification({ req, context: "success" }),
          this._promptNotification({ req, context: "error" })
        )
      );
  }
}
