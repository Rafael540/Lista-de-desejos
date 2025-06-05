import React, { Component } from "react";

import Form from "./Form";
import Tarefas from "./Tarefas";

import "./Main.css";

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      novaTarefa: "",
      tarefa: [],
      index: -1,
    };
  }
  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas"));

    if (tarefas) return;

    this.setState({ tarefas });
  }

  componentDidMUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas == prevState.tarefas) return;

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarefa, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (tarefa.indexOf(novaTarefa) !== -1) return;

    const novaTarefas = [...tarefa];

    if (index === -1) {
      this.setState({
        tarefa: [...novaTarefas, novaTarefa],
        novaTarefa: "",
      });
    } else {
      novaTarefas[index] = novaTarefa;
      this.setState({
        tarefa: [...novaTarefas],
        novaTarefa: "",
        index: -1,
      });
    }
  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    const { tarefa } = this.state;

    this.setState({
      index,
      novaTarefa: tarefa[index],
    });
  };

  handleDelete = (e, index) => {
    const { tarefa } = this.state;
    const novaTarefas = [...tarefa];
    novaTarefas.splice(index, 1);

    this.setState({
      tarefa: [...novaTarefas],
    });
  };

  render() {
    const { novaTarefa, tarefa } = this.state;

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          handleEdit={this.handleEdit}
          handleSubmit={this.handleSubmit}
          tarefa={tarefa}
        />
      </div>
    );
  }
}
