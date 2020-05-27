import { Component, OnInit } from "@angular/core";
import { BookService } from "./book.service";
import { of, forkJoin } from "rxjs";
import { map, concatMap, tap, delay } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  results$ = of(null);

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService
      .searchBook('Human')

      .subscribe(console.log);
  }
}
