import { View, Text, TextInput, StyleSheet } from "react-native";

function Input({text}) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder}>Notes</Text>
      <TextInput style={styles.input} >{text}</TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    backgroundColor: "white"
  },
  placeholder: {
    color: "#000000"
  },
  input: {
    borderBottomColor: "#000000",
    color: "#aaa9a9",
    height: 50,
    borderBottomWidth: 1
  },
});

export default Input;
