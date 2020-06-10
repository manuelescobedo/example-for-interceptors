import { mockeable } from "./mockable.decorator";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MockedEndpoints {
  bookSearch() {
    
    return { docs: [], numFound: 0, num_found: 0, start: 0 };
  }
  addBook() {
    throw new Error("Error");
  }
}
