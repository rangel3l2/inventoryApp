import { FC } from "react";
import { Modal, Text, StyleSheet, View } from "react-native";
import { PaperProvider} from "react-native-paper";

interface MyModalProps  {
  // Adicione propriedades específicas do seu modal aqui
  title: string;
  message: string;
  onRequestClose: () => void;
  visible: boolean;
}

const MyModal : FC<MyModalProps> = ({ visible, onRequestClose }) => {
  return (
    <PaperProvider>
      <Modal
        visible={visible}
        transparent={true}
        onRequestClose={onRequestClose}
        style={styles.modal}>
        <View style={styles.container}>
          <Text style={styles.text}>Conteúdo do modal</Text>
        </View>
      </Modal>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default MyModal;
