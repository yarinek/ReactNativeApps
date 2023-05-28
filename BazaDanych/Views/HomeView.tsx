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

interface IPhone {
  id: number;
  producer: string;
  model: string;
  androidVersion: string;
  page: string;
};

function HomeView({navigation, route}: any): JSX.Element {
  const [phones, onChangePhones] = useState<IPhone[]>([]);

  const clearData = async () => {
    try {
      console.log('clearing data');
      await AsyncStorage.setItem('phones', '')
      onChangePhones([]);
    } catch (e) {
      return;
    }
  }

  const storePhones = async (value: IPhone[]) => {
    try {
      await AsyncStorage.setItem('phones', JSON.stringify(value))
    } catch (e) {
      return;
    }
  }

  const getPhones = async () => {
    try {
      const value = await AsyncStorage.getItem('phones');
      console.log('VALUE after GET:', value)
      onChangePhones(JSON.parse(value ?? "[]"));
      
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => { 
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={clearData} title="Clear data" />
      ),
    });
  }, [navigation])

  useEffect(() => {
    if(route.params?.phone) {
      console.log('adding new phone');
      const newPhone: IPhone = route.params.phone;
      storePhones([...phones, newPhone]);
      getPhones();
    }
  }, [route.params?.phone]);

  useEffect(() => {
          onChangePhones([
            {
              id: 1,
              producer: 'Samsung',
              model: 'Galaxy S21',
              androidVersion: 'Android 11',
              page: 'https://www.gsmmaniak.pl/1198644/samsung-galaxy-s21-plus-test-recenzja/',
            },
            {
              id: 2,
              producer: 'Samsung',
              model: 'Galaxy S20',
              androidVersion: 'Android 10',
              page: 'https://www.gsmmaniak.pl/1088640/samsung-galaxy-s20-plus-test-recenzja/',
            },
            {
              id: 3,
              producer: 'Samsung',
              model: 'Galaxy S10',
              androidVersion: 'Android 9',
              page: 'https://www.gsmmaniak.pl/1008640/samsung-galaxy-s10-plus-test-recenzja/',
            },
          ]);
          getPhones();
        
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentInsetAdjustmentBehavior="automatic">
            {phones.map((phone) => {
        return <View style={styles.inputContainer}>
        <Text style={styles.text}>{phone.producer}</Text>
        <Text style={styles.text}>{phone.model}</Text>
      </View>;
      })}
          
          </ScrollView>
          <Button title="+" onPress={() => navigation.navigate('AddView', {})} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
