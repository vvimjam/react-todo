import Todo from "Models/Todo";
import React from "react";
import { List, Checkbox, Card } from "antd";

type props = { list: Todo[]; markTodo: Function };

export default class TodoList extends React.Component<props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (this.props.list && this.props.list.length > 0) {
      return (
        <List
          size="default"
          bordered
          dataSource={this.props.list}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                type="checkbox"
                checked={item.IsCompleted}
                onClick={(e) => this.props.markTodo(item.Id)}
              >
                {item.IsCompleted ? <s>{item.Text}</s> : item.Text}
              </Checkbox>
            </List.Item>
          )}
        />
      );
    } else {
      return (
        <Card style={{ width: "auto", textAlign: "center" }}>
          Yay! You are all caught up.
        </Card>
      );
    }
  }
}
