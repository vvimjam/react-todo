import { makeAutoObservable } from "mobx";
import Todo from "Models/Todo";
import ReorderTodos from "UseCases/ReorderTodos";

export default class TodoStore {
  isSorted = false;
  todos: Todo[] = [
    new Todo(1, "Delete todos.", true),
    new Todo(2, "Group actions [delete all, mark/unmark all]."),
    new Todo(3, "Add todo 'Enter' key action.", true),
    new Todo(4, "App logo/banner."),
    new Todo(5, "Support for due date."),
    new Todo(6, "Todo list filter by completed, incomplete"),
    new Todo(7, "Mobx store.", true),
  ];

  constructor() {
    makeAutoObservable(this);
  }

  ToggleCompletion = (id: number) => {
    const currentTodos = this.todos;
    this.todos = ReorderTodos.Execute(currentTodos, id);
  };

  ReOrderTodos = () => {
    if (this.isSorted) return;

    const currentTodos = this.todos;
    this.todos = ReorderTodos.Execute(currentTodos);
    this.isSorted = true;
  };

  AddTodo = (todo: Todo) => {
    const currentTodos = this.todos;
    if (currentTodos) {
      currentTodos.unshift(todo);
      return currentTodos;
    } else return [todo];
  };

  DeleteTodo = (id: number) => {
    this.todos = this.todos.filter((y) => y.Id != id);
  };

  get getAllTodos() {
    return this.todos;
  }

  get getNextTodoId() {
    let nextId = 0;
    if (this.todos && this.todos.length > 0) {
      let allIds = this.todos.map((y) => y.Id);
      nextId = Math.max(...allIds);
    }
    return nextId + 1;
  }
}
