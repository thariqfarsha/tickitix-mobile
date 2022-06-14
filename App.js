import React from 'react';
import MainStackNavigator from './src/navigations';
import {NativeBaseProvider} from 'native-base';

function App() {
  return (
    <NativeBaseProvider>
      <MainStackNavigator />
    </NativeBaseProvider>
  );
}

export default App;
