import { Component, EventEmitter, Output } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ITodoItem } from '../../models/ITodoItem';

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

  newTaskIconActive() {
    this.newTaskIconStatus = !this.newTaskIconStatus;
  }

  @Output() todoCreated: EventEmitter<ITodoItem> = new EventEmitter();

  createNewTask() {
    if(this.newTaskText.length >= 5) {
      this.todoCreated.emit({
        id: Date.now() * 10 + Math.floor(Math.random() * 10),
        text: this.newTaskText,
        completed: false,
        important: this.newTaskIconStatus,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
      this.newTaskIconStatus = false;
    } else {
      this.errorMsg = "It's can be more then 5 symbols";
    }
  }

  clearError() {
    this.errorMsg = "";
  }
}