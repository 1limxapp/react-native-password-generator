import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { generatePassword } from 'react-native-password-generator';

export default function App() {
  const [result, setResult] = useState<string | undefined>();

  useEffect(() => {
    generatePassword({ length: 24 })
      .then((data) => {
        console.log(1820, data);
        setResult(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
