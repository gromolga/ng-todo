import { Component, EventEmitter, Output } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ITodoItem } from '../../models/ITodoItem';
import { TodoStorageService } from '../../services/todo-storage.service';

@Component({
  selector: 'app-todo-create-form',
  templateUrl: './todo-create-form.component.html',
  styleUrls: ['./todo-create-form.component.scss']
})
export class TodoCreateFormComponent {

  public faCalendar = faCalendar;
  public faStar = faStar;
  public newTaskIconStatus:boolean = false;
  public newTaskText:string = "";
  public errorMsg = "";

  constructor(private todoStorage: TodoStorageService) {}

  newTaskIconActive() {
    this.newTaskIconStatus = !this.newTaskIconStatus;
  }

  @Output() todoCreated: EventEmitter<ITodoItem> = new EventEmitter();

  createNewTask() {
    if(this.newTaskText.length >= 5) {
      this.todoStorage.create(this.newTaskText)
      .subscribe(
        (todo: ITodoItem) => {
          this.todoCreated.emit(todo);
          this.errorMsg = "";
          this.newTaskText = "";
          this.newTaskIconStatus = false;
        },
        error => console.log(error)
      )
    } else {
      this.errorMsg = "It's can be more then 5 symbols";
    }
  }

  clearError() {
    this.errorMsg = "";
  }
}