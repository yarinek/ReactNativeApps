import {
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeView from './Views/HomeView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GradesScreen from './Views/CountAverage';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeView" component={HomeView}/>
        <Stack.Screen name="GradesScreen" component={GradesScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'lightgray',
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    margin: 10,
    marginTop: 20,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    margin: 10,
    width: '100%',
    height: 35,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    color: 'black'
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
