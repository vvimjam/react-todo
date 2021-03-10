import { makeAutoObservable } from "mobx";
import ComplationFilters from "Models/CompletionFilters";
import Todo from "Models/Todo";
import ReorderTodos from "UseCases/ReorderTodos";

export default class TodoStore {
  isSorted = false;
  filterType: Number = ComplationFilters.All;
  todos: Todo[] = [];

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

  SetTodoFilter = (filter: Number) => {
    this.filterType = filter;
  };

  SetTodos = (todos: Todo[]) => {
    this.todos = todos;
  };

  get activeTodoFilter() {
    return this.filterType;
  }

  get getAllTodosByFilter() {
    switch (this.filterType) {
      case ComplationFilters.Complete:
        return this.todos.filter((y) => y.IsCompleted);
      case ComplationFilters.InComplete:
        return this.todos.filter((y) => !y.IsCompleted);
      default:
        return this.todos;
    }
  }

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
