import React, { Component, useState } from 'react';
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

const LoginScreen =()=> {
 
    // constructor(props) {
    //     super(props);

    //     this.onFocus = this.onFocus.bind(this);
    //     this.onSubmit = this.onSubmit.bind(this);
    //     this.onChangeText = this.onChangeText.bind(this);
    //     this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    //     this.onSubmitEmail = this.onSubmitEmail.bind(this);
    //     this.onSubmitPassword = this.onSubmitPassword.bind(this);
    //     this.onAccessoryPress = this.onAccessoryPress.bind(this);

    //     this.firstnameRef = this.updateRef.bind(this, 'firstname');
    //     this.emailRef = this.updateRef.bind(this, 'email');
    //     this.passwordRef = this.updateRef.bind(this, 'password');


    //     this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);


    // }

    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [errors, setErrors] = useState({});
    const [firstname, setFirstname] = useState('')
    // let { errors = {}, secureTextEntry, ...data } = this.state;
    // let { firstname, lastname } = data;

    const onFocus = ()=> {

        for (let box in errors) {
            if (box && box.isFocused()) {
                setErrors(errors.filter((box)=>{
                    box!==errors[box]
                }));
            }
        }

        setErrors({ errors });
    }

    const onChangeText=(text)=> {
        ['firstname', 'email', 'password']
        .map((name) => ({ name, ref: this[name] }))
        .forEach(({ name, ref }) => {
            if (ref.isFocused()) {
            this.setState({ [name]: text });
            }
        });
    }

    const onAccessoryPress= ()=> {
        setSecureTextEntry(!secureTextEntry );
    }

    const onSubmitFirstName=() =>{
        this.email.focus();
    }


    const onSubmitEmail=()=> {
        this.password.focus();
    }

    const onSubmitPassword=() =>{
        this.password.blur();
    }

    const onSubmit = ()=> {
        let errors = {};

        ['firstname', 'email', 'password']
        .forEach((name) => {
            let value = this[name].value();

            if (!value) {
            errors[name] = 'Should not be empty';
            } else {
            if ('password' === name && value.length < 6) {
                errors[name] = 'Too short';
            }
            }
        });

        setErrors({ errors });
    }

    const updateRef=(name, ref)=> {
        this[name] = ref;
    }

    const renderPasswordAccessory=() =>{

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




        return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps='handled'
            >
            <View style={styles.container}>
                <TextField
                ref={firstnameRef}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={onFocus}
                onChangeText={onChangeText}
                onSubmitEditing={onSubmitFirstName}
                returnKeyType='next'
                label='First Name'
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
                maxLength={30}
                characterRestriction={20}
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

export default LoginScreen;