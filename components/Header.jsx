import { View, Text, StyleSheet } from "react-native";
import ThemeToggle from "./ThemeToggle";
import ProfilePhoto from "./ProfilePhoto";

export default function Header({ fullname, avatar_url }) {
  
  return (
    <View style={styles.Header}>
      <View
        style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}
      >
        <ProfilePhoto avatar_url={avatar_url}/>
        <View>
          <Text style={{ fontWeight: "bold" }}>{fullname}</Text>
          <Text>Personal Account </Text>
        </View>
      </View>
      <ThemeToggle />
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    paddingHorizontal: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
