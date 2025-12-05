import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { login } from '../services/auth';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            // Navigate to MainTabs instead of Home
            navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],
            });
        } catch (error) {
            Alert.alert('Login Failed', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.formContainer}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.linkButton}
                    onPress={() => navigation.navigate('Signup')}
                >
                    <Text style={styles.linkText}>
                        Don't have an account? <Text style={styles.linkBold}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 48,
    },
    inputContainer: {
        gap: 16,
        marginBottom: 32,
    },
    input: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#3b5998',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 24,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    linkButton: {
        alignItems: 'center',
    },
    linkText: {
        color: '#666',
        fontSize: 15,
    },
    linkBold: {
        color: '#3b5998',
        fontWeight: 'bold',
    },
});
