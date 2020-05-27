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
import { NotificationService } from "./notification.service";



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
    const notifiableEndpoints = this.endpoints[NOTIFIABLE];
    if (notifiableEndpoints) return Object.entries(notifiableEndpoints);
    return null;
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
