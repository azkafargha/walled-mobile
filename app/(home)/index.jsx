import { Link } from "expo-router";
import { Image, Text, View, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const [token, setToken] = useState("");
  const [profile, setProfile] = useState(() => {});

  useEffect(() => {
    AsyncStorage.getItem("userToken").then((res) => {
      setToken(res);
      const config = {
        headers: { Authorization: `bearer ${token}` },
      };
      console.log(config);
      axios
        .get(`http://192.168.30.38:8080/profile`, config)
        .then(function (res) {
          console.log(res.data);
          setProfile(res.data.data);
          return res.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }, [token, setToken, setProfile]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Good Morning! {profile?.fullname}</Text>
      <Text style={styles.text}>Your balance: {profile?.balance} IDR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
