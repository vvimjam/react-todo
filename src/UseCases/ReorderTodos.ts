import Todo from "Models/Todo";

export default class ReorderTodos {
  static Execute(todos: Todo[], targetTodoId: number = -1) {
    if (!todos || todos.length == 0) return todos;

    //Find target todo
    const targetTodoIndex = todos.findIndex((y) => y.Id == targetTodoId);
    const targetTodo =
      targetTodoIndex == -1 ? undefined : todos.splice(targetTodoIndex, 1)[0];

    //Seperate out completed/incomplete tasks
    let complete = todos.filter((y) => y.IsCompleted);
    let inComplete = todos.filter((y) => !y.IsCompleted);

    //Toggle completion
    if (targetTodo) {
      targetTodo.IsCompleted = !targetTodo.IsCompleted;

      //If completed add to top of completed stack. else add to top
      if (targetTodo.IsCompleted) complete = [targetTodo, ...complete];
      else inComplete = [targetTodo, ...inComplete];
    }

    inComplete.push(...complete);

    return inComplete;
  }
}
