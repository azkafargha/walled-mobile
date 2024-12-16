import { StatusBar } from "expo-status-bar";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Button from "../components/Button";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { z } from "zod";

const RegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, { message: "Must be 4 or more characters long" }),
});

export default function App() {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrors] = useState({});
  const [form, setForm] = useState({ email: "", password: "" });

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
      RegisterSchema.parse(form);
      const res = await axios.post(
        "http://192.168.30.38:8080/auth/register",
        form
      );
      console.log(form);
      console.log("Register berhasil:", res.data);
      navigation.navigate("(home)");
    } catch (err) {
      const errors = {};
      err.errors.forEach((item) => {
        const key = item.path[0];
        errors[key] = item.message;
      });
      setErrors(errors);
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView style={{ marginBottom: 10 }}>
              <View>
                <Text style={styles.title}>Terms and Conditions</Text>
              </View>
              <Text style={styles.modalText}>
                General Site Usage Last Revised: December 16, 2013 Welcome to
                www.lorem-ipsum.info. This site is provided as a service to our
                visitors and may be used for informational purposes only.
                Because the Terms and Conditions contain legal obligations,
                please read them carefully. 1. YOUR AGREEMENT By using this
                Site, you agree to be bound by, and to comply with, these Terms
                and Conditions. If you do not agree to these Terms and
                Conditions, please do not use this site. PLEASE NOTE: We reserve
                the right, at our sole discretion, to change, modify or
                otherwise alter these Terms and Conditions at any time. Unless
                otherwise indicated, amendments will become effective
                immediately. Please review these Terms and Conditions
                periodically. Your continued use of the Site following the
                posting of changes and/or modifications will constitute your
                acceptance of the revised Terms and Conditions and the
                reasonableness of these standards for notice of changes. For
                your information, this page was last updated as of the date at
                the top of these terms and conditions. 2. PRIVACY Please review
                our Privacy Policy, which also governs your visit to this Site,
                to understand our practices. 3. LINKED SITES This Site may
                contain links to other independent third-party Web sites
                ("Linked Sites”). These Linked Sites are provided solely as a
                convenience to our visitors. Such Linked Sites are not under our
                control, and we are not responsible for and does not endorse the
                content of such Linked Sites, including any information or
                materials contained on such Linked Sites. You will need to make
                your own independent judgment regarding your interaction with
                these Linked Sites.
              </Text>
            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setChecked(true);
              }}
            >
              <Text style={styles.textStyle}>Setuju boy</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Image source={require("../assets/logo.png")} style={styles.logo} />

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

      <Button handlePress={handleSubmit} text="Register" />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  linktext: {
    color: "#1ebf5e",
    fontWeight: "700",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  modalView: {
    margin: 29,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#0a7465",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 100,
    textAlign: "justify",
  },
  text: {
    flexDirection: "row",
    lineHeight: 24,
    margin: 10,
    alignItems: "justify",
  },
  checkbox: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    // width: 150,
    // height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4DB6AC",
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
