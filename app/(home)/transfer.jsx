import { View, Text, StyleSheet } from 'react-native';

export default function Transfer() {
  return (
    <View style={styles.container}>
      <Text>Ini Transfer anjay</Text>
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
