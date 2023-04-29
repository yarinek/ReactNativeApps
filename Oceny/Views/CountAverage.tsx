import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RadioButton } from 'react-native-paper';

const GradesScreen = ({navigation, route} : any) => {
  const [grades, setGrades] = useState({});
  const subjects = require('../strings.json');

  const handleGradeChange = (subject: any, grade: any) => {
    setGrades(prevGrades => ({ ...prevGrades, [subject]: grade }));
  };

  const handleCalculate = () => {
    const gradeValues = Object.values(grades);
    const sum: any = gradeValues.reduce((acc: any, cur: any) => acc + cur, 0);
    let average = sum / gradeValues.length;
    navigation.navigate('HomeView', { average });
  };

  useEffect(() => {
    const subjectList = Object.values(subjects.subject)
    subjectList.forEach((value: any, index: number) => {
      if(index < route.params.grades) {
        handleGradeChange(value, 2)
      }
    })
  }, [])

  const renderRadioButtons = () => {
    const fields: any = [];
    Object.keys(grades).forEach((key: string) => {
      fields.push(
        <View>
          <Text>{key}</Text>
          <RadioButtons value={(grades as any)[key]} onChange={(grade: any) => handleGradeChange(key, grade)} />
        </View>
      )
    })
    return fields;
  }

  return (
    <View>
      {renderRadioButtons()}
      {/* <View>
        <Text>Matematyka</Text>
        <RadioButtons value={(grades as any).subject1} onChange={(grade: any) => handleGradeChange('subject1', grade)} />
      </View>
      <View>
        <Text>Fizyka</Text>
        <RadioButtons value={(grades as any).subject2} onChange={(grade: any) => handleGradeChange('subject2', grade)} />
      </View>
      <View>
        <Text>Angielski</Text>
        <RadioButtons value={(grades as any).subject3} onChange={(grade: any) => handleGradeChange('subject3', grade)} />
      </View>
      <View>
        <Text>Programowanie</Text>
        <RadioButtons value={(grades as any).subject4} onChange={(grade: any) => handleGradeChange('subject4', grade)} />
      </View>
      <View>
        <Text>Android</Text>
        <RadioButtons value={(grades as any).subject5} onChange={(grade: any) => handleGradeChange('subject5', grade)} />
      </View> */}
      <Button title="Oblicz średnią" color="gray" onPress={handleCalculate}/>
    </View>
  );
};

const RadioButtons = ({ value, onChange }: any) => {
  const [checked, setChecked] = useState('2');

    return (
      <RadioButton.Group onValueChange={value => {
        setChecked(value)
        onChange(Number(value));
      }} value={checked}>
        <View style={styles.radioButtonGroup}>
          <RadioButton.Item style={styles.radioButton} label="2" value="2" />
          <RadioButton.Item style={styles.radioButton} label="3" value="3" />
          <RadioButton.Item style={styles.radioButton} label="4" value="4" />
          <RadioButton.Item style={styles.radioButton} label="5" value="5" />
        </View>
      </RadioButton.Group>
    )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: 'lightgray',
  },

  gradesContainer: {
    flex: 1,
    display: 'flex',
  },

  text: {
    padding: 10,
  },
  buttons: {
    padding: 10,
  },
  radioButtonGroup: {
    display: 'flex',
    flexDirection: 'row',
  },

  radioButton: {
    display: 'flex',
    width: 80
  }
});

export default GradesScreen;