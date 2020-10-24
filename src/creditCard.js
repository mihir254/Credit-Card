import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Alert,
} from "react-native";
import styles from "./styles";

const CreditCard = () => {
	const [cardNumber, setCardNumber] = useState("");
	const [expiry, setExpiry] = useState("");
	const [code, setCode] = useState("");
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");

	const [validCardNumber, setValidCardNumber] = useState(true);
	const [validExpiry, setValidExpiry] = useState(true);
	const [validCode, setValidCode] = useState(true);
	const [validFirst, setValidFirst] = useState(true);
	const [validLast, setValidLast] = useState(true);
	const [validLuhn, setValidLuhn] = useState(true);

	const luhnCheck = (num) => {
		let arr = (num + "")
			.split("")
			.reverse()
			.map((x) => parseInt(x));
		let lastDigit = arr.splice(0, 1)[0];
		let sum = arr.reduce(
			(acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9),
			0
		);
		sum += lastDigit;
		return sum % 10 === 0;
	};

	const handleSubmit = () => {
		const nameRegex = /^[a-z ]+$/i;
		const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
		let valid = true;
		let isAmex = false;
		let month = new Date().getMonth() + 1;
		let year = new Date().getFullYear() - 2000;

		if (luhnCheck(parseInt(cardNumber))) {
			setValidLuhn(true);
		} else {
			valid = false;
			setValidLuhn(false);
		}

		if (
			cardNumber.substring(0, 2) == "34" ||
			cardNumber.substring(0, 2) == "37"
		) {
			if (cardNumber.length !== 15) {
				valid = false;
				setValidCardNumber(false);
				isAmex = false;
			} else {
				setValidCardNumber(true);
				isAmex = true;
			}
		} else if (cardNumber[0] == "4") {
			if (
				cardNumber.length == 13 ||
				cardNumber.length == 16 ||
				cardNumber.length == 19
			) {
				setValidCardNumber(true);
			} else {
				valid = false;
				setValidCardNumber(false);
			}
		} else if (
			cardNumber.substring(0, 2) == "51" ||
			cardNumber.substring(0, 2) == "52" ||
			cardNumber.substring(0, 2) == "53" ||
			cardNumber.substring(0, 2) == "54" ||
			cardNumber.substring(0, 2) == "55" ||
			(parseInt(cardNumber.substring(0, 6)) >= 222100 &&
				parseInt(cardNumber.substring(0, 6)) <= 272099)
		) {
			if (cardNumber.length !== 16) {
				valid = false;
				setValidCardNumber(false);
			} else {
				setValidCardNumber(true);
			}
		} else if (
			cardNumber.substring(0, 2) == "65" ||
			cardNumber.substring(0, 3) == "644" ||
			cardNumber.substring(0, 3) == "645" ||
			cardNumber.substring(0, 3) == "646" ||
			cardNumber.substring(0, 3) == "647" ||
			cardNumber.substring(0, 3) == "648" ||
			cardNumber.substring(0, 3) == "649" ||
			cardNumber.substring(0, 4) == "6011" ||
			(parseInt(cardNumber.substring(0, 6)) >= 622126 &&
				parseInt(cardNumber.substring(0, 6)) <= 622925)
		) {
			if (cardNumber.length == 16 || cardNumber.length == 19) {
				setValidCardNumber(true);
			} else {
				valid = false;
				setValidCardNumber(false);
			}
		} else {
			valid = false;
			setValidCardNumber(false);
			isAmex = false;
		}

		if (isAmex) {
			if (code.length != 4) {
				setValidCode(false);
				valid = false;
			} else {
				setValidCode(true);
			}
		} else {
			if (code.length != 3) {
				setValidCode(false);
				valid = false;
			} else {
				setValidCode(true);
			}
		}

		if (!nameRegex.test(first)) {
			setValidFirst(false);
			valid = false;
		} else {
			setValidFirst(true);
		}
		if (!nameRegex.test(last)) {
			setValidLast(false);
			valid = false;
		} else {
			setValidLast(true);
		}
		if (!expiryRegex.test(expiry)) {
			setValidExpiry(false);
			valid = false;
		} else {
			if (parseInt(expiry.substring(3)) > year) {
				setValidExpiry(true);
			} else if (parseInt(expiry.substring(3)) < year) {
				setValidExpiry(false);
				valid = false;
			} else {
				if (parseInt(expiry.substring(0, 2)) >= month) {
					setValidExpiry(true);
				} else {
					setValidExpiry(false);
					valid = false;
				}
			}
		}

		if (valid) {
			Alert.alert("Payment Successful!", "", [{ text: "OK" }], {
				cancelable: false,
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Credit Card Input Exercise</Text>
			</View>
			<View style={styles.bigBox}>
				<TextInput
					style={[
						styles.cardNumberStyle,
						!validCardNumber || !validLuhn ? styles.errorBox : null,
					]}
					value={cardNumber}
					onChangeText={(e) => setCardNumber(e)}
					keyboardType="number-pad"
					placeholder="Card Number"
				/>
				{!validCardNumber || !validLuhn ? (
					<Text style={styles.errorText1}>Invalid Card Number</Text>
				) : null}
			</View>
			<View style={styles.smallBox}>
				<View style={{ flexDirection: "column", width: "45%", height: 60 }}>
					<TextInput
						style={[styles.smallTextBox, !validExpiry ? styles.errorBox : null]}
						value={expiry}
						onChangeText={(e) => setExpiry(e)}
						keyboardType="numbers-and-punctuation"
						placeholder="MM/YY"
					/>
					{!validExpiry ? (
						<Text style={styles.errorText}>Invalid Expiry Date</Text>
					) : null}
				</View>
				<View style={{ flexDirection: "column", width: "45%", height: 60 }}>
					<TextInput
						style={[
							styles.smallTextBox,
							!validCode || !validCardNumber || !validLuhn
								? styles.errorBox
								: null,
						]}
						value={code}
						onChangeText={(e) => setCode(e)}
						keyboardType="number-pad"
						placeholder="Security Code"
					/>
					{!validCode || !validCardNumber || !validLuhn ? (
						<Text style={styles.errorText}>Invalid Security Code</Text>
					) : null}
				</View>
			</View>
			<View style={styles.smallBox}>
				<View style={{ flexDirection: "column", width: "45%", height: 60 }}>
					<TextInput
						style={[styles.smallTextBox, !validFirst ? styles.errorBox : null]}
						value={first}
						onChangeText={(e) => setFirst(e)}
						placeholder="First Name"
					/>
					{!validFirst ? (
						<Text style={styles.errorText}>Invalid First Name</Text>
					) : null}
				</View>
				<View style={{ flexDirection: "column", width: "45%", height: 60 }}>
					<TextInput
						style={[styles.smallTextBox, !validLast ? styles.errorBox : null]}
						value={last}
						onChangeText={(e) => setLast(e)}
						placeholder="Last Name"
					/>
					{!validLast ? (
						<Text style={styles.errorText}>Invalid Last Name</Text>
					) : null}
				</View>
			</View>
			<View style={styles.bigBox}>
				<TouchableOpacity style={styles.button} onPress={handleSubmit}>
					<Text style={styles.buttonText}>SUBMIT PAYMENT</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default CreditCard;
