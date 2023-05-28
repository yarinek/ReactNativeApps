import { NavigationContainer } from '@react-navigation/native';
import HomeView from './Views/HomeView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'react-native';
import AddView from './Views/AddView';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PhoneDB" component={HomeView} options={({ navigation, route }) => ({
          headerRight: () => (
            <Button title="..." />
          ),
        })}/>
        <Stack.Screen name="AddView" component={AddView} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


export default App;
