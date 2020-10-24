import { StyleSheet, Platform, StatusBar } from "react-native";
const statusBarHeight = StatusBar.currentHeight;

const styles = StyleSheet.create({
	container: {
		borderColor: "#000",
		borderWidth: 1,
		height: "100%",
		width: "100%",
	},
	header: {
		width: "100%",
		height: 50,
		justifyContent: "center",
		backgroundColor: "#0D4F8B",
		marginTop: Platform.OS === "android" ? statusBarHeight : null,
	},
	headerText: {
		fontSize: 18,
		fontWeight: "bold",
		paddingLeft: 10,
		color: "#fff",
	},
	bigBox: {
		borderColor: "#000",
		// borderWidth: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
		height: 60,
	},
	smallBox: {
		borderColor: "#000",
		// borderWidth: 1,
		width: "100%",
		justifyContent: "space-evenly",
		alignItems: "center",
		marginTop: 15,
		flexDirection: "row",
	},
	cardNumberStyle: {
		width: "92%",
		height: 50,
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 5,
		borderColor: "green",
	},
	smallTextBox: {
		width: "100%",
		height: 50,
		borderWidth: 1,
		paddingHorizontal: 10,
		borderRadius: 5,
		borderColor: "green",
	},
	button: {
		width: "92%",
		height: 50,
		paddingHorizontal: 10,
		borderRadius: 5,
		backgroundColor: "#3CB371",
		justifyContent: "center",
	},
	buttonText: {
		textAlign: "center",
		fontWeight: "bold",
		color: "#fff",
	},
	errorBox: {
		borderColor: "red",
	},
	errorText: {
		alignSelf: "flex-start",
		color: "red",
		fontWeight: "bold",
		fontSize: 10,
		paddingLeft: 8,
		marginTop: 2,
	},
	errorText1: {
		alignSelf: "flex-start",
		color: "red",
		fontWeight: "bold",
		fontSize: 10,
		paddingLeft: 20,
		marginTop: 2,
	},
});

export default styles;
