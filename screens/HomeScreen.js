import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import Title from "../components/UI/Title";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View>
        <Title>Nadchodzące aktywności</Title>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
});
