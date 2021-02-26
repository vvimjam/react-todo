import TodoStore from "./Todo";
import LayoutStore from "./Layout";
import { createContext } from "react";

export type RootStoreType = {
  todoStore: TodoStore;
  layoutStore: LayoutStore;
};

class RootStore implements RootStoreType {
  todoStore: TodoStore = new TodoStore();
  layoutStore: LayoutStore = new LayoutStore();
}

export const rootStore = new RootStore();

export const RootStoreContext = createContext<RootStoreType>(
  {} as RootStoreType
);

export const RootStoreProvider = RootStoreContext.Provider;
