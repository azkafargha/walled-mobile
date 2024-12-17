import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Transfer() {
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [balance, setBalance] = useState(0);
  const [token, setToken] = useState("");
  const [id, setID] = useState("");

  const fetchProfile = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      if (!userToken) {
        Alert.alert("Error", "No token found. Please login again.");
        return;
      }
      setToken(userToken);

      const config = {
        headers: { Authorization: `Bearer ${userToken}` },
      };

      const response = await axios.get(
        "http://172.20.10.3:8080/profile",
        config
      );
      setBalance(response.data.data.balance);
      setID(response.data.data.id);
    } catch (error) {
      console.log("Error fetching profile:", error);
      Alert.alert("Error", "Failed to fetch balance.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleTransfer = async () => {
    if (!toAccount || !amount || isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Input", "Please provide valid account and amount.");
      return;
    }

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const senderId = id;

      const transferData = {
        senderId: senderId,
        receiverId: toAccount,
        amount: parseInt(amount),
        notes: notes,
      };

      // Debug payload

      const response = await axios.post(
        "http://172.20.10.3:8080/transfer",
        transferData,
        config
      );

      if (response.status === 200) {
        Alert.alert("Success", "Transfer completed successfully.");
        fetchProfile();
        setAmount("");
        setNotes("");
      } else {
        Alert.alert("Failed", "Transfer failed.");
      }
    } catch (error) {
      console.log("Transfer Error:", error.response?.data || error.message);
      Alert.alert(
        "Error",
        error.response?.data.message || "Transfer failed. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Transfer</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>To Account:</Text>
          <TextInput
            style={styles.input}
            value={toAccount}
            onChangeText={setToAccount}
            placeholder="Enter account ID"
            keyboardType="number-pad"
          />

          <Text style={styles.label}>Amount (IDR):</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Enter amount"
            keyboardType="number-pad"
          />

          <Text style={styles.balance}>
            Balance: IDR {balance.toLocaleString()}
          </Text>

          <Text style={styles.label}>Notes:</Text>
          <TextInput
            style={styles.input}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add a note"
          />

          <TouchableOpacity style={styles.button} onPress={handleTransfer}>
            <Text style={styles.buttonText}>Transfer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  balance: {
    marginBottom: 10,
    color: "gray",
  },
  button: {
    backgroundColor: "#008080",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
