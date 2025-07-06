import ActionSheet from 'react-native-actions-sheet';
import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import ActionButton from './ActionButton';
import { useAppColors } from '../assets/appColors';
import Toast from 'react-native-toast-message';

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
    <ActionSheet
      overlayColor={appColors.overlayColor}
      ref={actionSheetRef}
      onClose={onClose}
      {...props}
    >
      <View style={styles.actionSheet}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
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
      </View>
      <Toast />
    </ActionSheet>
  );
};

export default GlobalSheet;

const useStyles = appColors => {
  return StyleSheet.create({
    actionSheet: {
      padding: 16,
      gap: 16,
      backgroundColor: appColors.white,
      marginBottom: -10,
      paddingBottom: 26,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: appColors.black,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
    },
    secondaryButton: {
      flex: 1,
    },
    primaryButton: {
      flex: 1,
    },
  });
};
