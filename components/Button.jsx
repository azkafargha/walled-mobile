import { TouchableOpacity, Text, StyleSheet, onPress } from "react-native";

function Button({
  bgColor = "#199119",
  text,
  handlePress = () => {},
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.button, backgroundColor: bgColor }}
      onPress={onPress || handlePress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#22c627",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Button;
