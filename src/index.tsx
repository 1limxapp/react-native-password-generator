import { NativeModules, Platform } from 'react-native';
const Buffer = require('buffer/').Buffer;

const LINKING_ERROR =
  `The package 'react-native-password-generator' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const PasswordGenerator = NativeModules.PasswordGenerator
  ? NativeModules.PasswordGenerator
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

type Password = {
  length: number;
  lowercaseIncluded?: boolean;
  uppercaseIncluded?: boolean;
  numbersIncluded?: boolean;
  symbolsIncluded?: boolean;
};

type ReturnedPassword = {
  password: string;
  strength: string;
};

const defaultPasswordConfig: Password = {
  length: 20,
  lowercaseIncluded: true,
  uppercaseIncluded: true,
  numbersIncluded: true,
  symbolsIncluded: true,
};

/* eslint-disable */
export async function generatePassword(password?: Password): Promise<ReturnedPassword> {
	const {
		length,
		lowercaseIncluded,
		uppercaseIncluded,
		numbersIncluded,
		symbolsIncluded
	} = {...defaultPasswordConfig, ...password};
	const lc ="abcdefghijklmnopqrstuvwxyz";
	const uc ="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const sym ="!@#$%^&*()_+-=[]{}|;:,.<>/?";
	const num = "0123456789";
	let allChar = "";

	if(lowercaseIncluded){
		allChar += lc;
	};

	if(uppercaseIncluded){
		allChar += uc;
	};

	if(numbersIncluded){
		allChar += num;
	};

	if(symbolsIncluded){
		allChar += sym;
	};
	
	let pwd = "";
	for (let i=0; i<length; i++){
	  pwd += allChar.charAt(Math.floor((await secureRandom()) * allChar.length))
	}

	const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
	const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
	if (strongPassword.test(pwd)) return { password: pwd, strength: "strong" };

	if (mediumPassword.test(pwd)) return { password: pwd, strength: "medium" };
	
	return { password: pwd, strength: "weak" };
}

async function secureRandom(): Promise<number> {
	try {
		const keyHex = await PasswordGenerator.generateSecureRandomData("hex");
		const buf = Buffer.from(keyHex, "hex");

		// Ensure the buffer is at least 4 bytes long
		if (buf.length < 4) {
			throw new Error("Insufficient random data generated.");
		}

		const offset = Math.random() < 0.5 ? 0 : buf.length-4;
		const intVal = buf.readUInt32LE(offset); // Convert bytes to an unsigned 32-bit integer
		const normalized = intVal / (Math.pow(2, 32) - 1); // Scale to [0, 1)
		return normalized;
	} catch (error) {
		console.error("Error generating secure random number:", error);
		throw error; // Rethrow or handle as needed
	}
}