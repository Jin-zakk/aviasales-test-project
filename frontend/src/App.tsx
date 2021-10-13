import * as React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import UserForm from './user-form/UserForm';
import './App.less';

const mainCls = 'ui-app';

const App = (): JSX.Element => {
  return (
    <div className={mainCls}>
      <div className={`${mainCls}__logo`} />
      <Provider store={store}>
        <UserForm />
      </Provider>
    </div>
  );
};

export default App;
