import React from 'react';
import MainStackNavigator from './src/navigations';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './src/screens/SplashScreen';
import stores from './src/stores';

const {persistor, store} = stores;

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        <MainStackNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
