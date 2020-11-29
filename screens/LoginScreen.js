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

class LoginScreen extends Component {
 
    constructor(props) {
        super(props);
        this.navigation = props.navigation;

        this.onFocus = this.onFocus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);
        this.onAccessoryPress = this.onAccessoryPress.bind(this);

        this.emailRef = this.updateRef.bind(this, 'email');
        this.passwordRef = this.updateRef.bind(this, 'password');


        this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

        this.state = {
        secureTextEntry: true,
     
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
        ['email', 'password']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
            this.setState({ [name]: text });
            }
        });
    }

    onAccessoryPress() {
        this.setState(({ secureTextEntry }) => ({ secureTextEntry: !secureTextEntry }));
    }

    onSubmitEmail() {
        this.password.focus();
    }

    onSubmitPassword() {
        this.password.blur();
    }

    async onSubmit() {
        let errors = {};

        ['email', 'password']
        .forEach((name) => {
            let value = this[name].value();
            if (!value) {
                errors[name] = 'Should not be empty';
            } 
        });

        await auth().signInWithEmailAndPassword(this['email'].value(), this['password'].value())
            .then(() => {
                this.navigation.navigate('Home');
            })
            .catch((error) => {
                if (error.code === 'auth/user-not-found') {
                    errors['email'] = 'Email not found';
                }
                
                if (error.code === 'auth/wrong-password') {
                    errors['password'] = "Wrong Password";
                }
                console.log(error.code);
            });

        this.setState({ errors });
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    renderPasswordAccessory() {
        let { secureTextEntry } = this.state;

        let name = secureTextEntry?
        'visibility':
        'visibility-off';

        return (
        <MaterialIcon
            size={24}
            name={name}
            color={TextField.defaultProps.baseColor}
            onPress={this.onAccessoryPress}
            suppressHighlighting={true}
        />
        );
    }

    render() {
        let { errors = {}, secureTextEntry, ...data } = this.state;

        return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
            >
            <View style={styles.container}>



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
                secureTextEntry={secureTextEntry}
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
                renderRightAccessory={this.renderPasswordAccessory}
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

export default LoginScreen;