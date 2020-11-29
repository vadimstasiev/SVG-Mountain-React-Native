import React, { Component } from 'react';
import auth from "@react-native-firebase/auth";
import {
  ScrollView,
  View,
  SafeAreaView,
  Platform,
} from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

let styles = {
  scroll: {
    backgroundColor: 'transparent',
  },

  container: {
    margin: 8,
    marginTop: Platform.select({ ios: 8, android: 32 }),
    flex: 1,
  },

  contentContainer: {
    padding: 8,
  },

  buttonContainer: {
    paddingTop: 8,
    margin: 8,
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#E8EAF6',
  },
};

class RegisterScreen extends Component {
 
    constructor(props) {
        super(props);

        this.navigation = props.navigation;

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onSubmitConfirmPassword = this.onSubmitConfirmPassword.bind(this);
        this.onAccessory1Press = this.onAccessory1Press.bind(this);
        this.onAccessory2Press = this.onAccessory2Press.bind(this);

        this.firstnameRef = this.updateRef.bind(this, 'firstname');
        this.emailRef = this.updateRef.bind(this, 'email');
        this.passwordRef = this.updateRef.bind(this, 'password');
        this.confirmPasswordRef = this.updateRef.bind(this, 'confirmPassword');


        this.renderPasswordAccessory1 = this.renderPasswordAccessory1.bind(this);
        this.renderPasswordAccessory2 = this.renderPasswordAccessory2.bind(this);

        this.state = {
        secureTextEntry1: true,
        secureTextEntry2: true,
        };
    }

    onFocus() {
        let { errors = {} } = this.state;

        for (let name in errors) {
        let ref = this[name];

        if (ref && ref.isFocused()) {
            delete errors[name];
        }
        }

        this.setState({ errors });
    }

    onChangeText(text) {
        ['firstname', 'email', 'password', 'confirmPassword']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
            this.setState({ [name]: text });
            }
        });
    }

    onAccessory1Press() {
        this.setState(({ secureTextEntry1 }) => ({ secureTextEntry1: !secureTextEntry1 }));
    }

    onAccessory2Press() {
      this.setState(({ secureTextEntry2 }) => ({ secureTextEntry2: !secureTextEntry2 }));
    }

    onSubmitFirstName() {
        this.email.focus();
    }

    onSubmitEmail() {
        this.password.focus();
    }

    onSubmitPassword() {
      this.confirmPassword.focus();
    }

    onSubmitConfirmPassword() {
      this.confirmPassword.blur();
    }

    async onSubmit() {
        let errors = {};

        ['firstname', 'email', 'password', 'confirmPassword']
        .forEach((name) => {
            let value = this[name].value();

            if (!value) {
            errors[name] = 'Should not be empty';
            } else {
            
            if ('email' === name){
              if (! (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value))) {
                errors[name] = "Invalid format";
              }
            }
            if ('password' === name && value.length < 8) {
              errors[name] = 'Too short';
            }
          }
        });

        if (this['password'].value() !== this['confirmPassword'].value()) {
          errors['confirmPassword'] = 'Passwords don\'t match'
        }
        if(Object.keys(errors).length === 0){
          await auth()
          .createUserWithEmailAndPassword(this['email'].value(), this['password'].value())
          .then(() => {
            this.navigation.navigate('Home');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              errors['email'] = 'Email already in use';
            }
            
            if (error.code === 'auth/invalid-email') {
              errors['email'] = "Invalid format";
            }
            console.log(error.code);
          });
        }
        this.setState({ errors });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    renderPasswordAccessory1() {
        let { secureTextEntry1 } = this.state;

        let name = secureTextEntry1?
        'visibility':
        'visibility-off';

        return (
        <MaterialIcon
            size={24}
            name={name}
            color={TextField.defaultProps.baseColor}
            onPress={this.onAccessory1Press}
            suppressHighlighting={true}
        />
        );
    }

    renderPasswordAccessory2() {
      let { secureTextEntry2 } = this.state;

      let name = secureTextEntry2?
      'visibility':
      'visibility-off';

      return (
      <MaterialIcon
          size={24}
          name={name}
          color={TextField.defaultProps.baseColor}
          onPress={this.onAccessory2Press}
          suppressHighlighting={true}
      />
      );
  }

    render() {
        let { errors = {}, secureTextEntry1, secureTextEntry2, ...data } = this.state;
        let { firstname, lastname } = data;

        return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
            >
            <View style={styles.container}>
                <TextField
                ref={this.firstnameRef}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitFirstName}
                returnKeyType='next'
                label='First Name'
                title='Used name within the app'
                error={errors.firstname}
                />


                <TextField
                ref={this.emailRef}
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType='next'
                label='Email Address'
                error={errors.email}
                />

                <TextField
                ref={this.passwordRef}
                secureTextEntry={secureTextEntry1}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={false}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPassword}
                returnKeyType='done'
                label='Password'
                error={errors.password}
                title='Choose wisely'
                maxLength={40}
                characterRestriction={40}
                renderRightAccessory={this.renderPasswordAccessory1}
                />

                <TextField
                ref={this.confirmPasswordRef}
                secureTextEntry={secureTextEntry2}
                autoCapitalize='none'
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                clearTextOnFocus={false}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitConfirmPassword}
                returnKeyType='done'
                label='Confirm Password'
                error={errors.confirmPassword}
                title='Choose wisely'
                maxLength={40}
                characterRestriction={40}
                renderRightAccessory={this.renderPasswordAccessory2}
                />

            </View>

            <View style={styles.buttonContainer}>
                <RaisedTextButton
                onPress={this.onSubmit}
                title='submit'
                color={TextField.defaultProps.tintColor}
                titleColor='white'
                />
            </View>
            </ScrollView>
        </SafeAreaView>
        );
    }
}

export default RegisterScreen;