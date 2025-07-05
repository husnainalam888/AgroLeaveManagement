import React from 'react';
import { View, StyleSheet } from 'react-native';
import HeadingLabel from '../components/HeadingLable.js';
import InputField from '../components/InputField';
import ActionButton from '../components/ActionButton';
import Label from '../components/Label.js';
import svgs from '../assets/svgs.js';
import { useAppColors } from '../assets/appColors.js';
import { useLoginStates } from '../hooks/login/useLoginStates.js';
const { emailIcon, lockIcon, eyeIcon, avatarIcon } = svgs;

export default function LoginScreen({ navigation }) {
  const { email, setEmail, password, setPassword } = useLoginStates();
  const appColors = useAppColors();
  const styles = useStyles(appColors);
  const handleLogin = () => {
    navigation.navigate('BottomTabs');
  };
  return (
    <View style={styles.container}>
      <HeadingLabel
        title="Sign In Your Account"
        subtitle="Elevate Your Employee Management with ARGO."
        iconXml={avatarIcon}
      />
      <View style={styles.formContainer}>
        <Label label={'Email'} />
        <InputField placeholder="Email" iconLeftXml={emailIcon} />

        <Label label={'Password'} />
        <InputField
          placeholder="Password"
          secureTextEntry={true}
          iconLeftXml={lockIcon}
          iconRightXml={eyeIcon}
        />

        {/* <LabelLink label="Already have an account?" linkText="Log in" onPress={() => navigation.goBack()} />
        <DividerWithText /> */}
        <ActionButton label="Login" onPress={handleLogin} />
      </View>
    </View>
  );
}

const useStyles = appColors => {
  return StyleSheet.create({
    container: {
      paddingTop: 50,
      flex: 1,
      justifyContent: 'center',
      marginBottom: 20,
      backgroundColor: appColors.white,
      paddingHorizontal: 20,
    },
    formContainer: {
      gap: 14,
      marginBottom: 20,
    },
  });
};
