import React, { useState } from 'react';
import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';

type PropsModal = {
    visible: boolean;
    onRequestClose: () => void;
    titulo: string;
    mensagem: string;
    tipo: 'erro' | 'aviso' | 'sucesso';
    };

const ModalGenerico: React.FC<PropsModal> = ({ visible, onRequestClose, titulo, mensagem, tipo }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const getCorFundo = () => {
    switch (tipo) {
      case 'erro':
        return 'red';
      case 'aviso':
        return 'orange';
      case 'sucesso':
        return 'green';
      default:
        return 'white';
    }
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onRequestClose} contentContainerStyle={containerStyle}>
        <Text style={{ fontWeight: 'bold' }}>{titulo}</Text>
        <Text>{mensagem}</Text>
        <Button onPress={onRequestClose}>Fechar</Button>
      </Modal>
    </Portal>
  );
};

export default ModalGenerico;