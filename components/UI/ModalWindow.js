import { useTheme } from "@react-navigation/native";
import { useRef } from "react";
import { Modal, StyleSheet, View } from "react-native";
import OutsideView from "react-native-detect-press-outside";

function ModalWindow(props) {
  const childRef = useRef();
  const { colors } = useTheme();

  return (
    <Modal
      transparent={true}
      visible={props.onModalVisible}
      animationType={"fade"}
    >
      <View style={[styles.rootContainer]}>
        <OutsideView
          childRef={childRef}
          onPressOutside={() => {
            props.onSetModalVisible(false);
          }}
          style={styles.rootContainer}
        >
          <View style={styles.innerContainer}>
            <View ref={childRef}>{props.children}</View>
          </View>
        </OutsideView>
      </View>
    </Modal>
  );
}
export default ModalWindow;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  innerContainer: {
    backgroundColor: "rgba(0,0,0,0)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
