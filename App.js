
import React from 'react';
import {
    Text,
    SafeAreaView,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Hello World</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
