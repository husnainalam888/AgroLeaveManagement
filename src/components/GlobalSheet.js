import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import ActionButton from './ActionButton';
import { useAppColors } from '../assets/appColors';
import Toast from 'react-native-toast-message';
import { SafeAreaView } from 'react-native-safe-area-context';

const GlobalSheet = ({
  secondaryButtonText,
  primaryButtonText,
  title,
  children,
  actionSheetRef,
  onPrimaryButtonPress,
  onSecondaryButtonPress,
  primaryLoading,
  onClose,
  ...props
}) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  const handlePrimaryButtonPress = () => {
    onPrimaryButtonPress?.();
  };

  const handleSecondaryButtonPress = () => {
    onSecondaryButtonPress?.();
    closeSheet();
  };

  const closeSheet = () => {
    actionSheetRef.current?.hide();
  };

  return (
    <CustomActionSheet currentRef={actionSheetRef} onClose={onClose} {...props}>
      <View style={styles.actionSheet}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
      </View>
      <View style={styles.buttonContainer}>
        {secondaryButtonText && (
          <ActionButton
            style={styles.secondaryButton}
            label={secondaryButtonText}
            onPress={handleSecondaryButtonPress}
            secondary={true}
          />
        )}
        {primaryButtonText && (
          <ActionButton
            style={styles.primaryButton}
            label={primaryButtonText}
            onPress={handlePrimaryButtonPress}
            loading={primaryLoading}
          />
        )}
      </View>
      <Toast />
    </CustomActionSheet>
  );
};

const CustomActionSheet = ({ children, onClose, currentRef }) => {
  const [visible, setVisible] = useState(false);
  const appColors = useAppColors();
  const styles = useStyles(appColors);

  useImperativeHandle(currentRef, () => ({
    show: () => setVisible(true),
    hide: () => {
      setVisible(false);
      onClose?.();
    },
    isVisible: () => visible,
  }));

  const handleBackdropPress = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setVisible(false);
        onClose?.();
      }}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* <TouchableWithoutFeedback onPress={handleBackdropPress}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback> */}
        <View style={styles.modalContent}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
};

export default GlobalSheet;

const useStyles = appColors => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: 'transparent',
      flex: 0.9,
    },
    actionSheet: {
      flex: 1,
      backgroundColor: appColors.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 24,
      gap: 24,
      shadowColor: appColors.black,
      shadowOffset: { width: 0, height: -4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      color: appColors.black,
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 12,
      backgroundColor: appColors.white,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    secondaryButton: {
      flex: 1,
    },
    primaryButton: {
      flex: 1,
    },
  });
};
