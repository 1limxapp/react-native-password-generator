/* eslint-disable */
import { useState, useEffect } from 'react';
import { 
  Text,
  View,
  StyleSheet,
  Switch,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { generatePassword } from 'react-native-password-generator';

interface PasswordConfig {
  length: number;
  lowercaseIncluded: boolean;
  uppercaseIncluded: boolean;
  numbersIncluded: boolean;
  symbolsIncluded: boolean;
}

export default function App() {
  const [result, setResult] = useState<string>('');
  const [config, setConfig] = useState<PasswordConfig>({
    length: 24,
    lowercaseIncluded: true,
    uppercaseIncluded: true,
    numbersIncluded: true,
    symbolsIncluded: true,
  });

  const generateNewPassword = async () => {
    try {
      const password = await generatePassword(config);
      setResult(password.password);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    generateNewPassword();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Password Generator_</Text>
      
      <View style={styles.configContainer}>
        <View style={styles.configRow}>
          <Text style={styles.label}>Length:</Text>
          <TextInput
            style={styles.input}
            value={config.length.toString()}
            keyboardType="numeric"
            onChangeText={(text) => {
              const length = parseInt(text) || 1;
              setConfig(prev => ({ ...prev, length }));
            }}
          />
        </View>

        <View style={styles.configRow}>
          <Text style={styles.label}> lowercase_chars</Text>
          <Switch
            value={config.lowercaseIncluded}
            onValueChange={(value) =>
              setConfig(prev => ({ ...prev, lowercaseIncluded: value }))
            }
            trackColor={{ false: '#333', true: 'green' }}
            thumbColor={config.lowercaseIncluded ? '#88ff88' : '#f4f3f4'}
          />
        </View>

        <View style={styles.configRow}>
          <Text style={styles.label}> uppercase_chars</Text>
          <Switch
            value={config.uppercaseIncluded}
            onValueChange={(value) =>
              setConfig(prev => ({ ...prev, uppercaseIncluded: value }))
            }
            trackColor={{ false: '#333', true: 'green' }}
            thumbColor={config.uppercaseIncluded ? '#88ff88' : '#f4f3f4'}
          />
        </View>

        <View style={styles.configRow}>
          <Text style={styles.label}> numeric_chars</Text>
          <Switch
            value={config.numbersIncluded}
            onValueChange={(value) =>
              setConfig(prev => ({ ...prev, numbersIncluded: value }))
            }
            trackColor={{ false: '#333', true: 'green' }}
            thumbColor={config.numbersIncluded ? '#88ff88' : '#f4f3f4'}
          />
        </View>

        <View style={styles.configRow}>
          <Text style={styles.label}> special_chars</Text>
          <Switch
            value={config.symbolsIncluded}
            onValueChange={(value) =>
              setConfig(prev => ({ ...prev, symbolsIncluded: value }))
            }
            trackColor={{ false: '#333', true: 'green' }}
            thumbColor={config.symbolsIncluded ? '#88ff88' : '#f4f3f4'}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.generateButton} onPress={generateNewPassword}>
        <Text style={styles.generateButtonText}>GENERATE</Text>
      </TouchableOpacity>

      <View style={styles.resultContainer}>
        <Text style={styles.resultLabel}> output:</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
    justifyContent: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00ff00',
    fontFamily: 'monospace',
  },
  configContainer: {
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    color: '#00ff00',
    fontFamily: 'monospace',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#00ff00',
    padding: 5,
    width: 50,
    textAlign: 'center',
    color: '#00ff00',
    backgroundColor: '#111',
    fontFamily: 'monospace',
  },
  generateButton: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00ff00',
    marginVertical: 20,
  },
  generateButtonText: {
    color: '#00ff00',
    textAlign: 'center',
    fontFamily: 'monospace',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
  },
  resultLabel: {
    color: '#00ff00',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  result: {
    color: '#00ff00',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
});
