import { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Image,
} from 'react-native';
import backgroundImage from '../assets/background.png';
import { AntDesign } from '@expo/vector-icons';

export const RegistrationScreen = () => {
  const [focusedInput, setFocusedInput] = useState(null);
  const [isHidePassword, setIsHidePassword] = useState(true);

  const handleInputFocus = (input) => {
    setFocusedInput(input);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const handleHidePassword = () => {
    setIsHidePassword(!isHidePassword);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -165 : -165}
      >
        <ImageBackground
          style={styles.imageBackground}
          source={backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.formContainer}>
            <View style={styles.imagePhotoContainer}>
              <Image style={styles.imagePhoto} />
              <TouchableOpacity style={styles.loadPhoto}>
                <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
              </TouchableOpacity>
            </View>
            <Text style={styles.formTitle}>Реєстрація</Text>
            <View style={styles.inputThumb}>
              <TextInput
                style={[
                  styles.formInput,
                  focusedInput === 'login' && styles.focusedFormInput,
                ]}
                placeholder="Логін"
                onFocus={() => handleInputFocus('login')}
                onBlur={handleInputBlur}
              />

              <TextInput
                style={[
                  styles.formInput,
                  focusedInput === 'email' && styles.focusedFormInput,
                ]}
                placeholder="Адреса електронної пошти"
                textContentType="emailAddress"
                keyboardType="email-address"
                onFocus={() => handleInputFocus('email')}
                onBlur={handleInputBlur}
              />

              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.formInput,
                    focusedInput === 'password' && styles.focusedFormInput,
                  ]}
                  placeholder="Пароль"
                  textContentType="password"
                  secureTextEntry={isHidePassword}
                  onFocus={() => handleInputFocus('password')}
                  onBlur={handleInputBlur}
                />
                <TouchableOpacity
                  style={styles.passwordButton}
                  onPress={handleHidePassword}
                >
                  <Text style={styles.passwordButtonText}>
                    {isHidePassword ? 'Показати' : 'Приховати'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonTitle}>Зареєстуватися</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.textLogin}>Вже є акаунт? Увійти</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  formContainer: {
    paddingTop: 92,
    paddingBottom: 78,
    paddingHorizontal: 16,
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: '#FFFFFF',
  },

  imagePhotoContainer: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -45 }],
    top: -60,
  },
  imagePhoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F6F6F6',
  },

  loadPhoto: {
    position: 'absolute',
    right: -12,
    bottom: 14,
  },

  formTitle: {
    marginBottom: 32,
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
  },

  inputThumb: {
    marginBottom: 32,
    gap: 16,
  },

  formInput: {
    padding: 16,
    height: 50,
    borderRadius: 8,
    fontSize: 16,
    lineHeight: 19,
    backgroundColor: '#F6F6F6',
  },

  focusedFormInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
    borderColor: '#FF6C00',
    backgroundColor: '#FFFFFF',
  },

  passwordContainer: {
    position: 'relative',
  },

  passwordButton: {
    position: 'absolute',
    top: 15,
    right: 12,
  },

  passwordButtonText: {
    fontSize: 16,
    color: '#1B4371',
  },

  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: '#FF6C00',
  },

  buttonTitle: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFF',
  },

  textLogin: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
});
