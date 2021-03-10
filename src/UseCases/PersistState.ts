import ComplationFilters from "Models/CompletionFilters";
import { rootStore } from "Store/RootStore";

export default class PersistState {
  public static Execute(readOnly = true) {
    if (readOnly) {
      const allTodoJSON = localStorage.getItem("allTodos");
      const currentFilterTypeJSON = localStorage.getItem("filterType");

      if (allTodoJSON) {
        const allTodos = JSON.parse(allTodoJSON);
        rootStore.todoStore.SetTodos(allTodos);
      }

      if (currentFilterTypeJSON) {
        const currentFilterType = JSON.parse(currentFilterTypeJSON);
        rootStore.todoStore.SetTodoFilter(currentFilterType);
      }
    } else {
      const currentFilterType = rootStore.todoStore.filterType;
      const currentFilterTypeJSON = JSON.stringify(currentFilterType);
      const allTodos = rootStore.todoStore.getAllTodos;
      const allTodoJSON = JSON.stringify(allTodos);

      localStorage.setItem("allTodos", allTodoJSON);
      localStorage.setItem("filterType", currentFilterTypeJSON);
    }
  }
}
