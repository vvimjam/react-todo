import Todo from "Models/Todo";
import React, { useContext } from "react";
import { List, Checkbox, Card, Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";
import { Radio } from "antd";
import ComplationFilters from "Models/CompletionFilters";
import { RootStoreContext } from "Store/RootStore";

type props = { list: Todo[]; markTodo: Function; deleteTodo: Function };

const todoFilters = [
  { label: "All", value: ComplationFilters.All },
  { label: "Complete", value: ComplationFilters.Complete },
  { label: "Pending", value: ComplationFilters.InComplete },
];

const TodoListFunction = observer((props: props) => {
  const store = useContext(RootStoreContext);

  const onFilterChange = (e: any) => {
    store.todoStore.SetTodoFilter(Number(e.target.value));
  };

  if (props.list && props.list.length > 0) {
    return (
      <div>
        <Radio.Group
          options={todoFilters}
          onChange={onFilterChange}
          value={store.todoStore.filterType}
          optionType="button"
          buttonStyle="solid"
        />
        <br />
        <br />
        <List
          size="default"
          bordered
          dataSource={props.list}
          renderItem={(item) => (
            <List.Item>
              <Checkbox
                className="todoListItem"
                type="checkbox"
                checked={item.IsCompleted}
                onClick={(e) => props.markTodo(item.Id)}
              >
                {item.IsCompleted ? <s>{item.Text}</s> : item.Text}
              </Checkbox>
              {
                <Button
                  danger
                  type="primary"
                  shape="circle"
                  onClick={(e) => props.deleteTodo(item.Id)}
                  icon={<FontAwesomeIcon icon={faTrash} />}
                ></Button>
              }
            </List.Item>
          )}
        />
      </div>
    );
  } else {
    return (
      <Card style={{ width: "auto", textAlign: "center" }}>
        Yay! You are all caught up.
      </Card>
    );
  }
});

export default TodoListFunction;
