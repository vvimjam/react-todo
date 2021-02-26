import Todo from "Models/Todo";
import { rootStore } from "Store/RootStore";

export default class AddNewTodo {
  public static Execute(text: string) {
    //todo: show validation message
    if (!text || text.length == 0) return;

    const newTodo = new Todo(rootStore.todoStore.getNextTodoId, text);

    rootStore.todoStore.AddTodo(newTodo);
  }
}
