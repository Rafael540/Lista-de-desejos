import PropTypes from "prop-types";

function Tarefas({ tarefa, handleEdit, handleDelete }) {
  return (
    <ul>
      {tarefa.map((item, index) => (
        <li key={index}>
          {item}
          <button className="edit" onClick={(e) => handleEdit(e, index)}>
            Editar
          </button>
          <button className="delete" onClick={() => handleDelete(index)}>
            Deletar
          </button>
        </li>
      ))}
    </ul>
  );
}

Tarefas.propTypes = {
  tarefa: PropTypes.arrayOf(PropTypes.string).isRequired, // ou object, se necessário
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Tarefas;
