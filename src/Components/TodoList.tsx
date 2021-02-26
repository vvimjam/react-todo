import Todo from "Models/Todo";
import React from "react";
import { List, Checkbox, Card, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { observer, inject, useObserver } from "mobx-react";

type props = { list: Todo[]; markTodo: Function; deleteTodo: Function };

@observer
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
                className="todoListItem"
                type="checkbox"
                checked={item.IsCompleted}
                onClick={(e) => this.props.markTodo(item.Id)}
              >
                {item.IsCompleted ? <s>{item.Text}</s> : item.Text}
              </Checkbox>
              {
                <Button
                  danger
                  type="primary"
                  shape="circle"
                  onClick={(e) => this.props.deleteTodo(item.Id)}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                ></Button>
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
