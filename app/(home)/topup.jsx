import { View, StyleSheet } from "react-native";
import Input from "../../components/Input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopUp() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Input></Input>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
