import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Endpoints } from "./endpoints";

@Injectable({
  providedIn: "root"
})
export class BookService {
  constructor(private http: HttpClient, private endpoints: Endpoints) {}

  searchBook(query) {
    return this.http.get(this.endpoints.bookSearch(query));
  }

  searchTopic(topic) {
    return this.http.get(this.endpoints.topicSearch(topic));
  }

  addBook(book) {
    return this.http.post(this.endpoints.addBook(), book);
  }
}
