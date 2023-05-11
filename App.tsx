import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import WelcomeScreen from './screens/WelcomeScreen';
import ItemDetailScreen from './screens/ItemDetailScreen';
import QRScanner from './screens/QRScanner';
import ARScreen from './screens/ARScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomeScreen"
          component={WelcomeScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ItemDetailScreen"
          component={ItemDetailScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="QRScanner"
          component={QRScanner}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="ARScreen"
          component={ARScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => MainScreen)