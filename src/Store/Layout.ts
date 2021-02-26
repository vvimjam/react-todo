import { makeAutoObservable } from "mobx";

export default class LayoutStore {
  collpased: boolean = true;

  get isCollapsed() {
    return this.collpased;
  }

  constructor() {
    makeAutoObservable(this);
  }

  toggleCollapse = () => {
    this.collpased = !this.collpased;
  };
}
