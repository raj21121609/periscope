import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }) {
    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Authentication with Firebase</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.loginButton]}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.signupButton]}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.signupButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#rgba(255,255,255,0.8)',
        marginBottom: 50,
    },
    buttonContainer: {
        width: '100%',
        gap: 15,
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#fff',
    },
    loginButtonText: {
        color: '#3b5998',
        fontSize: 18,
        fontWeight: '600',
    },
    signupButton: {
        borderWidth: 2,
        borderColor: '#fff',
    },
    signupButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});
