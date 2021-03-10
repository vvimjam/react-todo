import React, { useContext, useEffect } from "react";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import { Layout, Divider } from "antd";
import { Row, Col } from "antd";
import AddNewTodo from "UseCases/AddNewTodo";
import { useObserver } from "mobx-react";
import { RootStoreContext } from "Store/RootStore";
import PersistState from "UseCases/PersistState";

export const AppFunction = () => {
  const store = useContext(RootStoreContext);

  //Reorder
  store.todoStore.ReOrderTodos();

  const addNewTodo = (text: string) => {
    AddNewTodo.Execute(text);
  };

  const markUmMarkTodo = (id: number) => {
    store.todoStore.ToggleCompletion(id);
  };

  const deleteTodo = (id: number) => {
    store.todoStore.DeleteTodo(id);
  };

  const onCollapseClick = () => {
    store.layoutStore.toggleCollapse();
  };

  const saveUserData = () => PersistState.Execute(false);

  useEffect(() => {
    PersistState.Execute(); //load user data
    window.addEventListener("beforeunload", saveUserData);

    return () => {
      window.removeEventListener("beforeunload", saveUserData);
    };
  }, []);

  return useObserver(() => (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout className="site-layout">
        <Layout.Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Row>
              <Col span={24}>
                <NewTodo addTodo={addNewTodo} />
              </Col>
            </Row>
            <Divider orientation="left"></Divider>
            <Row>
              <Col span={24}>
                <TodoList
                  deleteTodo={deleteTodo}
                  list={store.todoStore.getAllTodosByFilter}
                  markTodo={markUmMarkTodo}
                />
              </Col>
            </Row>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  ));
};
