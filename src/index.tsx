// src/index.tsx
import React from 'react'
import { render } from 'react-dom'
import {
  HashRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { Dispatch } from 'redux'
import store from './models/stores'
import {
  CREATE_TODO,
  DELETE_TODO,
  CREATE_TYPE,
  DELETE_TYPE,
} from './models/actions'
import { TodoState, OperateState } from './models/reducers'
import styles from './index.less'

interface HomeProps {
  todos: TodoState[];
  operateCounter: OperateState;
  dispatch: Dispatch;
}

const HomeOld: React.FC<HomeProps> = (props) => {
  const {
    todos = [],
    operateCounter: {
      createCounter = 0,
      deleteCounter = 0,
    },
  } = props;
  return (
    <>
      <div>HOME HOHOHO</div>
      <div>当前todos如下，可以在page1与page2中操作todos列表：</div>
      <div className={styles.hohoho}>添加操作： {createCounter} 次，删除操作： {deleteCounter} 次</div>
      {todos.map(({ text, id }) => (<li key={id}>{`id:${id}-text:${text}`}</li>))}
    </>
  )
}
const mapStateToPropsHome = (state: HomeProps) => {
  return {
    todos: state.todos,
    operateCounter: state.operateCounter,
  };
};
const Home = connect(mapStateToPropsHome)(HomeOld);





const Page1Old: React.FC<HomeProps> = (props) => {
  const { todos = [], dispatch } = props;
  let input: HTMLInputElement | null;
  function onClick() {
    const { id = 0 } = [...todos].pop() || {};
    dispatch({
      type: CREATE_TODO,
      id: id + 1,
      text: (input as HTMLInputElement).value,
    });
    dispatch({ type: CREATE_TYPE });
  }
  return (
    <>
      <div>PAGE1 HOHOHO</div>
      <input ref={node => { input = node }} />

      <button onClick={onClick}>添加</button>
      {todos.map(({ text, id }) => (<li key={id}>{`id:${id}-text:${text}`}</li>))}
    </>
  )
}
const mapStateToPropsPage1 = (state: HomeProps) => {
  return {
    todos: state.todos,
  };
};
const Page1 = connect(mapStateToPropsPage1)(Page1Old);





const Page2Old: React.FC<HomeProps> = (props) => {
  const { todos = [], dispatch } = props;
  function onClick(id: number) {
    dispatch({
      type: DELETE_TODO,
      id,
    });
    dispatch({ type: DELETE_TYPE });
  }
  return (
    <>
      <div>PAGE2 HOHOHO</div>
      {todos.map(({ text, id }) => (
        <li key={id}>
          {`id:${id}-text:${text}`}

          <a href="javascript:;" onClick={onClick.bind(null, id)}>删除该项</a>
        </li>
      ))}
    </>
  )
}
const mapStateToPropsPage2 = (state: HomeProps) => {
  return {
    todos: state.todos,
  };
};
const Page2 = connect(mapStateToPropsPage2)(Page2Old);






const App = () => (
  <Provider store={store}>
    <div className={styles.hohoho}>STAGE HOHOHO</div>
    <li><a href='#/home'>去home</a></li>
    <li><a href='#/page1'>去page1</a></li>
    <li><a href='#/page2'>去page2</a></li>
    <hr />
    <HashRouter>
      <Switch>
        <Route exact path='/home' component={Home} />
        <Route exact path='/page1' component={Page1} />
        <Route exact path='/page2' component={Page2} />
        <Redirect from='/' to='/home' />
      </Switch>
    </HashRouter>
  </Provider>
)

render(<App />, document.getElementById('root'))