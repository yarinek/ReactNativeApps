import { useState } from 'react';
import {
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface IPhone {
  id: number;
  producer: string;
  model: string;
  androidVersion: string;
  page: string;
};

function AddView({navigation, route}: any): JSX.Element {
  const [phone, onChangePhone] = useState<IPhone>({
    id: route.params?.selectedPhone?.id || 0,
    producer: route.params?.selectedPhone?.producer || '',
    model: route.params?.selectedPhone?.model || '',
    androidVersion: route.params?.selectedPhone?.androidVersion || '',
    page: route.params?.selectedPhone?.page || '',
    });

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentInsetAdjustmentBehavior="automatic">
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Producer</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangePhone(prevState => ({...prevState, producer: text}))}
                    value={phone.producer}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Model</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangePhone(prevState => ({...prevState, model: text}))}
                    value={phone.model}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Android version</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangePhone(prevState => ({...prevState, androidVersion: text}))}
                    value={phone.androidVersion}

                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.text}>Page</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => onChangePhone(prevState => ({...prevState, page: text}))}
                    value={phone.page}
                />
            </View>
            <Button title={
                phone.id ? 'Edit' : 'Add'
            } disabled={
                !phone.producer || !phone.model || !phone.androidVersion || !phone.page
            } onPress={() => {
                navigation.navigate('PhoneDB', {phone});
            }}/>

                {phone.page && <Button  title="Go to website" onPress={() => {
                            Linking.openURL(phone.page);
                        }}/>}
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
});

export default AddView;