import { useState, useEffect } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable, TouchableOpacity, gestureHandlerRootHOC } from 'react-native-gesture-handler';

interface IPhone {
  id: number;
  producer: string;
  model: string;
  androidVersion: string;
  page: string;
};

const defaultPhones = [
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
]

function HomeView({navigation, route}: any): JSX.Element {
  const [phones, onChangePhones] = useState<IPhone[]>([]);
  const [selectedPhone, onChangeSelectedPhone] = useState<IPhone | null>(null);

  const clearData = async () => {
    try {
      await AsyncStorage.setItem('phones', '')
      onChangePhones([]);
    } catch (e) {
      return;
    }
  }

  const deletePhone = async (phone: IPhone) => {
    try {
      const newPhones = phones.filter((p) => p.id !== phone.id);
      await AsyncStorage.setItem('phones', JSON.stringify(newPhones))
      onChangePhones(newPhones);
    } catch (e) {
      return;
    }
  };

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
      if(!value || !JSON.parse(value as string).length) {
        storePhones(defaultPhones);
        onChangePhones(defaultPhones);
        return;
      }
      onChangePhones(JSON.parse(value ?? "[]"));
      
    } catch(e) {
      // error reading value
    }
  }



  const RenderRow = gestureHandlerRootHOC((phone: any): any => (
    <Swipeable renderRightActions={renderRightActions} onSwipeableWillOpen={() => deletePhone(phone)}>
      <TouchableOpacity onPress={() => onChangeSelectedPhone(phone)} style={phone.id === selectedPhone?.id ? styles.selectedInputContainer : styles.unselectedInputContainer}>
        <Text style={styles.text}>{phone.producer}</Text>
        <Text style={styles.text}>{phone.model}</Text>
      </TouchableOpacity>
    </Swipeable>
      
  )
  ) 


  const renderRightActions = (
    progress: any,
    dragAnimatedValue: any,
  ) => {
    const opacity = dragAnimatedValue.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    
    
    return (
      <View style={styles.swipedRow}>
        <View style={styles.swipedConfirmationContainer}>
          <Text style={styles.deleteConfirmationText}></Text>
        </View>
        <Animated.View style={[styles.deleteButton, {opacity}]}>
          <TouchableOpacity>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };
  

  useEffect(() => { 
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={clearData} title="Clear data" />
      ),
    });
  }, [navigation])

  useEffect(() => {
    if(route.params?.phone) {
      if(route.params.phone.id) {
        const newPhones = phones.map((phone) => {
          if(phone.id === route.params.phone.id) {
            return route.params.phone;
          }
          return phone;
        });
        storePhones(newPhones);
        getPhones();
        return;
      }

      const newPhone: IPhone = {
        ...route.params.phone,
        id: phones.length + 1,
      };
      storePhones([...phones, newPhone]);
      getPhones();
    }
  }, [route.params?.phone]);

  useEffect(() => {
          getPhones();
        
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentInsetAdjustmentBehavior="automatic">
            {phones.map((phone) => 
              <RenderRow key={phone.id} {...phone} />
            )}
          
          </ScrollView>
          {selectedPhone?.id && <Button title="Edit" onPress={() => navigation.navigate('AddView', {selectedPhone})} />} 
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
  selectedInputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightblue'
  },
  unselectedInputContainer: {
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
  swipedRow: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 5,
    backgroundColor: '#818181',
    minHeight: 50,
  },
  swipedConfirmationContainer: {
    flex: 1,
  },
  deleteConfirmationText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#b60000',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  deleteButtonText: {
    color: '#fcfcfc',
    fontWeight: 'bold',
    padding: 3,
  },
});

export default HomeView;
