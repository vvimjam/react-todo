import Todo from "Models/Todo";
import React from "react";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import { Layout, Menu, Divider } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Row, Col } from "antd";
import ReorderCompletedTodos from "UseCases/ReorderCompletedTodos";

const { Content, Sider } = Layout;

type state = { todos: Todo[]; collapsed: boolean };

export default class App extends React.Component<{}, state> {
  defaultTodos = [
    new Todo(1, "Delete todos.", true),
    new Todo(2, "Group actions [delete all, mark/unmark all]."),
    new Todo(3, "Add todo 'Enter' key action.", true),
    new Todo(4, "App logo/banner."),
    new Todo(5, "Support for due date."),
    new Todo(6, "Todo list filter by completed, incomplete"),
    new Todo(7, "Redux store."),
    new Todo(8, "Responsive design."),
  ];

  constructor(props: any) {
    super(props);

    //Reorder on first launch
    this.defaultTodos = ReorderCompletedTodos.Execute(this.defaultTodos);

    this.state = {
      todos: this.defaultTodos,
      collapsed: false,
    };
  }

  addNewTodo = (text: string) => {
    if (!text || text.length == 0) return;

    const newTodo = new Todo(Math.random(), text);
    const newTodoList = [newTodo, ...this.state.todos];

    this.setState((state: state) => {
      return {
        todos: newTodoList,
      };
    });
  };

  markUmMarkTodo = (id: number) => {
    var todos = [...this.state.todos];

    // const targetTodoIndex = todos.findIndex((y) => y.Id == id);

    // if (targetTodoIndex != -1) {
    //   //Push completed to the end
    //   const targetTodo = todos[targetTodoIndex];

    //   //Seperate out completed/incomplete tasks
    //   const completedTodos = todos.filter((y) => y.Id != id && y.IsCompleted);
    //   const unCompletedTodos = todos.filter(
    //     (y) => y.Id != id && !y.IsCompleted
    //   );

    //   //Toggle completion
    //   targetTodo.IsCompleted = !targetTodo.IsCompleted;

    //   //If completed add to top of completed stack. else add to top
    //   if (targetTodo.IsCompleted)
    //     todos = [...unCompletedTodos, targetTodo, ...completedTodos];
    //   else todos = [targetTodo, ...unCompletedTodos, ...completedTodos];

    //   //Update state
    //   this.setState({ todos: todos });
    // }

    todos = ReorderCompletedTodos.Execute(todos, id);

    this.setState({ todos: todos });
  };

  deleteTodo = (id: number) => {
    console.log(id);
    var todoClones = [...this.state.todos];
    todoClones = todoClones.filter((y) => y.Id != id);
    this.setState({ todos: todoClones });
  };

  onCollapse = (collapsed: any) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
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
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Row>
                <Col span={24}>
                  <NewTodo addTodo={this.addNewTodo} />
                </Col>
              </Row>
              <Divider orientation="left"></Divider>
              <Row>
                <Col span={24}>
                  <TodoList
                    deleteTodo={this.deleteTodo}
                    list={this.state.todos}
                    markTodo={this.markUmMarkTodo}
                  />
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
