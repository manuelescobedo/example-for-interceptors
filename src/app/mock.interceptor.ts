import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Endpoints } from "./endpoints";
import { MockedEndpoints } from "./mock-endpoints";
import { of, throwError } from "rxjs";
import { MOCKEABLE } from "./mockable.decorator";

@Injectable({
  providedIn: "root"
})
export class MockInterceptor implements HttpInterceptor {
  constructor(
    private endpoints: Endpoints,
    private mockedEndpoints: MockedEndpoints
  ) {}

  intercept(req, next) {
    const mockedEndpoints = this.endpoints[MOCKEABLE];

    if (!!mockedEndpoints) {
      const options = Object.entries(mockedEndpoints);

      const mockedEndpoint = options.find(([method, url]) =>
        req.url.includes(url)
      );
      if (!!mockedEndpoint) {
        const [method] = mockedEndpoint;

        try {
          const body = this.mockedEndpoints[method](req);

          return of(
            new HttpResponse({
              body,
              status: 200
            })
          );
        } catch (e) {
          return throwError(
            new HttpErrorResponse({
              error: e,
              status: 500
            })
          );
        }
      }
    }

    return next.handle(req);
  }
}
