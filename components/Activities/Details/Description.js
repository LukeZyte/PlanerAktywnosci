import { useTheme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Card from "../../UI/Card";
import MenuLabel from "../../UI/MenuLabel";
import TextUI from "../../UI/TextUI";

const Description = ({ activity }) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.cardStyle}>
      <MenuLabel>Opis</MenuLabel>
      <TextUI
        style={[
          styles.description,
          !activity.description &&
            (styles.noDescription, { color: colors.contentBg400 }),
        ]}
      >
        {activity.description ? activity.description : "Brak dostępnego opisu"}
      </TextUI>
    </Card>
  );
};

export default Description;

const styles = StyleSheet.create({
  cardStyle: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  description: {
    fontSize: 16,
  },
  noDescription: {
    textAlign: "center",
  },
});
