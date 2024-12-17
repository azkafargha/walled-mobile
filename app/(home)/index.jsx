import { Link } from "expo-router";
import { Image, Text, View, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import Header from "../../components/Header";
import DashboardBody from "../../components/DashboardBody";
import { SafeAreaView } from "react-native-safe-area-context";

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
        .get(`http://172.20.10.3:8080/profile`, config)
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
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header
          fullname={profile?.fullname || "Loading..."}
          avatar_url={profile?.avatar_url}
        />

        <DashboardBody
          fullname={profile?.fullname || "Loading..."}
          id={profile?.id}
          balance={profile?.balance}
        />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    marginBottom: 0,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});
