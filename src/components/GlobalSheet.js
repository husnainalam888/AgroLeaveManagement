import ActionSheet from 'react-native-actions-sheet';
import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import ActionButton from './ActionButton';
import { useAppColors } from '../assets/appColors';

const GlobalSheet = ({
  secondaryButtonText,
  primaryButtonText,
  title,
  children,
  actionSheetRef,
}) => {
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const closeSheet = () => {
    actionSheetRef.current?.hide();
  };
  return (
    <ActionSheet overlayColor={appColors.overlayColor} ref={actionSheetRef}>
      <View style={styles.actionSheet}>
        {title && <Text style={styles.title}>{title}</Text>}
        {children}
        <View style={styles.buttonContainer}>
          {secondaryButtonText && (
            <ActionButton
              style={styles.secondaryButton}
              label={secondaryButtonText}
              onPress={closeSheet}
              secondary={true}
            />
          )}
          {primaryButtonText && (
            <ActionButton
              style={styles.primaryButton}
              label={primaryButtonText}
              onPress={closeSheet}
            />
          )}
        </View>
      </View>
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
