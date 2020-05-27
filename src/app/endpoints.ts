import { mockeable } from "./mockable.decorator";
import { Injectable } from "@angular/core";
import { cacheable } from "./cacheable.decorator";
import { notifiable } from "./notifiable.decorator";

const API_ENDPOINT = "//openlibrary.org";

@Injectable({
  providedIn: "root"
})
export class Endpoints {
  
  bookSearch(query) {
    return `${API_ENDPOINT}/search.json?q=${query}`;
  }
  
  topicSearch(topic) {
    return `${API_ENDPOINT}/subjects/${topic}.json`;
  }

  addBook() {
    return `${API_ENDPOINT}/books.json`;
  }
}
