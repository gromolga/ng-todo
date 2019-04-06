import { Injectable } from '@angular/core';
import { ITodoItem } from '../models/ITodoItem';
import { 
  faStar,
  faSort,
  faSortAlphaDown,
  faCalendarAlt,
  faCheck,
  IconDefinition
 } from '@fortawesome/free-solid-svg-icons';

export interface SortOption {
  id: String,
  name: String,
  faClass: IconDefinition
}

@Injectable({
  providedIn: 'root'
})
export class SortableService {

  public sortOption: Array<SortOption> = [
    {id: 'none', name: 'Sorting', faClass: faSort},
    {id: 'alphabet', name: 'alphabetically', faClass: faSortAlphaDown},
    {id: 'creationDate', name: 'by creation date', faClass: faCalendarAlt},
    {id: 'executionDate', name: 'by execution date', faClass: faCheck},
    {id: 'inImportance', name: 'in importance', faClass: faStar}
  ]

  public sorting(todoList: Array<ITodoItem>, sortId: String): Array<ITodoItem> {
    if (sortId === "alphabet") {
      return todoList.sort(
        (a, b) => {
          var textA = a.text.toLowerCase(), textB = b.text.toLowerCase()
          if (textA > textB) 
            return -1
          else if (textA < textB)
            return 1
          return 0 
          }
      );
    } else if (sortId === "creationDate") {
      return todoList.sort(
        (a, b) => {
          return b.createdAt - a.createdAt
        }
      )
    } else if (sortId === "executionDate") {
      return todoList.sort(
        (a, b) => {
          return b.updatedAt - a.updatedAt
        }
      )
    } else if (sortId === "inImportance") {
      return todoList.sort(
        (a, b) => {
          return +b.important - +a.important
        }
      )
    }
    return todoList;
  }

constructor() { }

}
