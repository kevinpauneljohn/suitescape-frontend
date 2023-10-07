import React from 'react';
import {ScrollView, Text} from 'react-native';
import {Modal} from 'react-native-paper';
import style from './SectionModalStyles';

const SectionModal = ({isSectionShown, setHideModal, progress}) => {
  return (
    <Modal
      visible={isSectionShown}
      transparent={true}
      onDismiss={setHideModal}
      contentContainerStyle={style.mainContainer}>
      <Text style={style.headerText}>Sections</Text>
      <ScrollView
        horizontal={true}
        contentContainerStyle={style.scrollViewContainer}>
        <Text>{progress}</Text>
      </ScrollView>
    </Modal>
  );
};

export default SectionModal;
