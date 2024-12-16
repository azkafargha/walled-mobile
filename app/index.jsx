import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import Button from "../components/Button";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Must be 4 or more characters long" }),
});

export default function App() {
  const navigation = useNavigation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrors] = useState({});

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    try {
      LoginSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
    }
  };

  const handleSubmit = async () => {
    try {
      LoginSchema.parse(form);
      const res = await axios.post(
        "http://192.168.30.38:8080/auth/login",
        form
      );

      const token = res.data.data.token;
      console.log("Login berhasil:", token);

      await AsyncStorage.setItem("userToken", token);
      Alert.alert("Login berhasil dan token tersimpan!");

      navigation.navigate("(home)");
    } catch (err) {
      if (err.response && err.response.status === 404) {
        Alert.alert("Login Gagal", "Email atau password salah.");
      } else if (err.errors) {
        const errors = {};
        err.errors.forEach((item) => {
          const key = item.path[0];
          errors[key] = item.message;
        });
        setErrors(errors);
      } else {
        Alert.alert("Error", "Terjadi kesalahan. Silakan coba lagi nanti.");
      }
    }
  };

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        Alert.alert("Token Tersimpan:", token);
      } else {
        Alert.alert("Token tidak ditemukan.");
      }
    } catch (err) {
      Alert.alert("Error:", "Gagal mengambil token dari AsyncStorage.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/gojek-logo.png")} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        onChangeText={(text) => handleInputChange("email", text)}
        value={form.email}
      />
      {errorMsg.email ? (
        <Text style={styles.errorMsg}>{errorMsg.email}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange("password", text)}
        value={form.password}
      />
      {errorMsg.password ? (
        <Text style={styles.errorMsg}>{errorMsg.password}</Text>
      ) : null}

      <Button handlePress={handleSubmit} style={styles.button} text="Login" />

      {/* Tombol untuk mengecek token */}
      <TouchableOpacity onPress={checkToken} style={styles.checkButton}>
        <Text style={styles.checkButtonText}>Cek Token</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Don't have an account?{" "}
        <Link style={styles.regist} href="/register">
          Register here
        </Link>
      </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  regist: {
    color: "#2fbf77",
  },
  text: {
    padding: 20,
    textAlign: "left",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 75,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#11f32f",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  checkButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  checkButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    width: "100%",
    textAlign: "left",
    marginTop: 5,
    marginLeft: 10,
  },
});
