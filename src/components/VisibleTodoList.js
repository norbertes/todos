import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../actions';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    const { errorMessage, toggleTodo, todos, isFetching } = this.props;

    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }

    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

VisibleTodoList.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  fetchTodos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  todos: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

// { params } are desctructed from ownParams argument
// without withRouter it could be just passed by attaching {params.filter} into
// this component attrs
const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    filter,
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    todos: getVisibleTodos(state, filter),
  };
};

// withRouter passes params from router trough itself
// connect container subscribes to the store and passess the props to the component
VisibleTodoList = withRouter(connect(
  mapStateToProps,
  actions // shorthand for mapDispatchToProps
)(VisibleTodoList));

export default VisibleTodoList;
