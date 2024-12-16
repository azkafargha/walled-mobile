import { View, Text, StyleSheet } from 'react-native';

export default function Topup() {
  return (
    <View style={styles.container}>
      <Text>Ini Top Up</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
