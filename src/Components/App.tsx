import React, { useContext } from "react";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import { Layout, Menu, Divider } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import AddNewTodo from "UseCases/AddNewTodo";
import { useObserver } from "mobx-react";
import { RootStoreContext } from "Store/RootStore";

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

  return useObserver(() => (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        collapsible
        collapsed={store.layoutStore.isCollapsed}
        onCollapse={onCollapseClick}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            All Tasks
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Completed Tasks
          </Menu.Item>
        </Menu>
      </Layout.Sider>
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
                  list={store.todoStore.getAllTodos}
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
