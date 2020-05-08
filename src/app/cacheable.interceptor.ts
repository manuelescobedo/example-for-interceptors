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

@Injectable({
  providedIn: "root"
})
export class CacheableInterceptor implements HttpInterceptor {
  constructor(
    private endpoints: Endpoints,
    private cacheService: CacheService
  ) {}

  intercept(req, next) {
    const cachedEndpoints = this.endpoints[CACHEABLE];
    let endpoint = null;
    const time = Date.now();

    if (cachedEndpoints && cachedEndpoints.length > 0) {
      endpoint = cachedEndpoints.find(({ url }) => req.url.includes(url));

      if (endpoint) {
        const data = this.cacheService.get(endpoint.url);

        if (data !== null) {
          return of(new HttpResponse({ body: data, status: 200 }));
        }
      }
    }

    return next.handle(req).pipe(
      tap(res => {
        if (res instanceof HttpResponse && endpoint) {
          this.cacheService.save(endpoint.url, {
            data: res.body,
            expireIn: endpoint.expireIn
          });
        }
      })
    );
  }
}
