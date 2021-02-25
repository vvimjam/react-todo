import React from "react";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "antd";
import { Input } from "antd";

type props = { addTodo: Function };
type state = { todoText: string };
export default class NewTodo extends React.Component<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      todoText: "",
    };
  }

  onKeyPress = (event: any) => {
    this.setState({ todoText: event.target.value });
  };

  onKeyUp = (event: any) => {
    if (event.key == "Enter") this.onAddClick(event);
  };

  onAddClick = (e: any) => {
    this.props.addTodo(this.state.todoText);
    this.setState({
      todoText: "",
    });
  };

  render() {
    const addIconElement = (
      <span className={"fa-icon"}>
        <FontAwesomeIcon style={{ marginRight: "5px;" }} icon={faPlus} />
      </span>
    );
    return (
      <Row>
        <Col span={6}>
          <Input
            value={this.state.todoText}
            onChange={this.onKeyPress}
            onKeyUp={this.onKeyUp}
            placeholder={"Enter new todo..."}
          />
        </Col>
        <Col span={1}></Col>
        <Col span={3}>
          <Button type="primary" onClick={this.onAddClick}>
            {addIconElement}Add
          </Button>
        </Col>
      </Row>
    );
  }
}
