import { useTheme } from "@react-navigation/native";
import { Text } from "react-native";

const TextUI = ({ style, children }) => {
  const { colors } = useTheme();

  return <Text style={[{ color: colors.text }, style]}>{children}</Text>;
};

export default TextUI;
