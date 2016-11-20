import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import TodoList from './TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'all':
      return todos;
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}.`);
  }
};

// { params } are desctructed from ownParams argument
// without withRouter it could be just passed by attaching {params.filter} into
// this component attrs
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state.todos, params.filter || 'all'),
});

// withRouter passes params trough itself
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo } // shorthand for mapDispatchToProps
)(TodoList));

export default VisibleTodoList;
