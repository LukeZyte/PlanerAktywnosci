import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../constants/styles";
import Card from "../../UI/Card";
import MenuLabel from "../../UI/MenuLabel";
import TextUI from "../../UI/TextUI";

const Description = ({ activity }) => {
  return (
    <Card style={styles.cardStyle}>
      <MenuLabel>Opis</MenuLabel>
      <TextUI
        style={[
          styles.description,
          !activity.description && styles.noDescription,
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
    color: GlobalStyles.colors.contentBg400,
  },
});
