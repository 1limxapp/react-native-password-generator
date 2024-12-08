# react-native-password-generator

Generate strong passwords based on secure, random and unique data created in native for react native applications

## Installation

```sh
npm install react-native-password-generator
```

## Usage


```js
import { generatePassword } from 'react-native-password-generator';

// ...

generatePassword({ length: 24 })
    .then(pwd => {
      console.log(`Generated password: ${pwd}`);
      // Generated password: {"password": "S]4O?Y1-[!*=!2<5mi}7Znai", "strength": "strong"}
    })
    .catch(e => console.error(`Generating password error: ${pwd}`));
```

## Methods

#### `generatePassword(passwordConfig): Promise<String>`
if no passwordConfig object is passed, it'll use the default config object:

```js
{
  length: 20,
  lowercaseIncluded: true,
  uppercaseIncluded: true,
  numbersIncluded: true,
  symbolsIncluded: true,
}
```

## Author

Hayr Hotoca | [@1limxapp](https://twitter.com/1limxapp)\
This package is used in my cross-platform app called [1LimX](https://1limx.com/)
## License

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
