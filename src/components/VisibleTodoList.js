import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { toggleTodo } from '../actions';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

// { params } are desctructed from ownParams argument
// without withRouter it could be just passed by attaching {params.filter} into
// this component attrs
const mapStateToProps = (state, { params }) => ({
  todos: getVisibleTodos(state, params.filter || 'all'),
});

// withRouter passes params trough itself
const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  { onTodoClick: toggleTodo } // shorthand for mapDispatchToProps
)(TodoList));

export default VisibleTodoList;
