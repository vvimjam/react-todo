import Todo from "Models/Todo";
import React from "react";
import { List, Checkbox, Card, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
type props = { list: Todo[]; markTodo: Function; deleteTodo: Function };

export default class TodoList extends React.Component<props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    if (this.props.list && this.props.list.length > 0) {
      const deleteIconElement = (
        <span className={"fa-icon"}>
          <FontAwesomeIcon style={{ color: " #cb4335" }} icon={faTrash} />
        </span>
      );
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
              {
                <Button
                  onClick={(e) => this.props.deleteTodo(item.Id)}
                  icon={deleteIconElement}
                >
                  Delete
                </Button>
              }
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
