import React from 'react';
import Navigation from './presentation/navigation/Navigation';
import {Provider} from 'react-redux';
import {store} from './application/redux/Store.redux';

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
