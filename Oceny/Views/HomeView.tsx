import { useState, useEffect } from 'react';
import {
    Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeView({navigation, route}: any): JSX.Element {
  const [name, onChangeName] = useState('');
  const [surname, onChangeSurname] = useState('');
  const [grades, onChangeGrades] = useState('');
  const [isRequired, setIsRequired] = useState<{[key: string]: any}>({});

  const storeData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      return;
    }
  }

  const getData = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        switch(key) {
          case 'name':
            onChangeName(value);
          case 'surname':
            onChangeSurname(value)
          case 'grades':
            onChangeGrades(value)
        }
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getData('name');
    getData('surname');
    getData('grades');
  }, [])

  const handleBlur = (key: string) => {
    switch(key) {
      case 'name':
        if(!name.length) {
          setIsRequired(prevState => {
            return ({...prevState, name: true})
          })
        } else {
          setIsRequired(prevState => ({...prevState, name: false}))
        }
        storeData('name', name);
      case 'surname':
        if(key === 'surname' && !surname.length) {
          setIsRequired(prevState => ({...prevState, surname: true}))
        } else {
          setIsRequired(prevState => ({...prevState, surname: false}))
        }
        storeData('surname', surname);
      case 'grades':
        const gradesValue = parseInt(grades);
        if(key === 'grades' && isNaN(gradesValue) || gradesValue < 5 || gradesValue > 15) {
          setIsRequired(prevState => ({...prevState, grades: true}))
        } else {
          setIsRequired(prevState => ({...prevState, grades: false}))
        }
        storeData('grades', grades);
      default:
          break;
    }
  };

  const buttonRender = () => {
    if(!name) {
      return false;
    }

    if(!surname) {
      return false;
    }

    const gradesValue = parseInt(grades);
    if(isNaN(gradesValue) || gradesValue < 5 || gradesValue > 15) {
      return false;
    }

    return true;
  }

  const onButtonPress = () => {
    navigation.navigate('GradesScreen', {grades})
  }

  const showAlert = () => {
    route.params.average >= 3 ? Alert.alert('Gratulacje, otrzymujesz zaliczenie!') : Alert.alert('Wysyłam podanie o zaliczenie warunkowe.');
  }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentInsetAdjustmentBehavior="automatic">
          <View
            style={styles.container}>
              <View style={styles.inputContainer}>
              <Text style={styles.text}>Imię:</Text>
              <TextInput onFocus={() => {
                setIsRequired(prevState => ({...prevState, name: false}))
              }} onBlur={() => {
                handleBlur('name');
              }} style={styles.input} onChangeText={(text) => {
                onChangeName(text);
              }} value={name} placeholder="Wpisz imię"></TextInput>
          </View>
              {isRequired.name && <Text style={{color: 'red'}}>Pole wymagane</Text>}
          </View>

          <View
            style={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Nazwisko:</Text>
                <TextInput onFocus={() => {
                setIsRequired(prevState => ({...prevState, surname: false}))
              }} onBlur={() => {
                handleBlur('surname');
              }} style={styles.input} onChangeText={(text) => {
                onChangeSurname(text);
              }} value={surname} placeholder="Wpisz nazwisko"></TextInput>
              </View>
              {isRequired.surname && <Text style={{color: 'red'}}>Pole wymagane</Text>}
          </View>

          <View
            style={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.text}>Liczba ocen:</Text>
                <TextInput onFocus={() => {
                setIsRequired(prevState => ({...prevState, grades: false}))
              }} onBlur={() => {
                handleBlur('grades');
              }} keyboardType='number-pad' style={styles.input} onChangeText={(text) => {
                onChangeGrades(text);
              }} value={grades} placeholder="Wpisz liczbę ocen [5-15]"></TextInput>
              </View>
              {isRequired.grades && <Text style={{color: 'red'}}>Liczba musi być z zakresu [5-15]</Text>}
          </View>

          {route.params?.average && <View
            style={styles.container}>
              <Text style={styles.text}>Twoja średnia: {route.params?.average}</Text>
          </View>}

          {buttonRender() && <Button title="Oceny" color="gray" onPress={onButtonPress}/>}
          {route.params?.average && (route.params?.average >= 3 ? <Button title="Super!" color="gray" onPress={showAlert}/> : <Button title="Tym razem nie poszło" color="gray" onPress={showAlert}/>)}
        </ScrollView>
      </SafeAreaView>
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

export default HomeView;
