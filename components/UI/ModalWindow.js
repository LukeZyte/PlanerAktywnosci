import { useRef, useState } from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import OutsideView from "react-native-detect-press-outside";
import Card from "./Card";

function ModalWindow(props) {
  const [modalVisible, setModalVisible] = useState(true);

  const childRef = useRef();

  return (
    <Modal transparent={true} visible={modalVisible}>
      <View style={styles.rootContainer}>
        <OutsideView
          childRef={childRef}
          onPressOutside={() => {
            // handle press outside of childRef event
            setModalVisible(false);
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
