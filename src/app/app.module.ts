import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { MockInterceptor } from "./mock.interceptor";
import { CacheableInterceptor } from "./cacheable.interceptor";
import { CacheService } from "./cache.service";
import { NotifiableInterceptor } from "./notifiable.interceptor";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: NotifiableInterceptor
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: MockInterceptor
    },
    
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: CacheableInterceptor
    }
  ]
})
export class AppModule {}
