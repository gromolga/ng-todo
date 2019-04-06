import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class TodoStorageService {

  public getTodoListObservable: Observable<any>

  constructor(private httpClient: HttpClient) {
    this.getTodoListObservable = this.httpClient
    .get("https://todo-api.grom-dev.kh.ua/api/todos/");
  }

}
