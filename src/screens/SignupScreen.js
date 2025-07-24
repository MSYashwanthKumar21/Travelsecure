import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../lib/supabase';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SignupScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSignup = async () => {
        setLoading(true);
        setError(null);
        const { error } = await supabase.auth.signUp({ email, password });
        setLoading(false);
        if (error) {
            setError(error.message);
            Alert.alert('Signup failed', error.message);
        } else {
            Alert.alert('Success', 'Signup complete! Please check your email for verification.');
            navigation.replace('LoginScreen');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.appBrand}>Trip Manager</Text>
            <Text style={styles.title}>Create Account</Text>
            {error && <Text style={styles.errorText}>{error}</Text>}

            <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={20} color="#5c6bc0" style={styles.icon} />
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    keyboardType="email-address"
                    style={styles.input}
                />
            </View>
            <View style={styles.inputContainer}>
                <Icon name="key-outline" size={20} color="#5c6bc0" style={styles.icon} />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.replace('LoginScreen')}>
                <Text style={styles.linkText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: "#f5f6fa" },
    appBrand: { fontSize: 32, fontWeight: "bold", color: "#5c6bc0", alignSelf: "center", marginBottom: 8 },
    title: { fontSize: 22, marginBottom: 20, textAlign: 'center', fontWeight: "600" },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#e0e0ea",
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    icon: { marginRight: 8 },
    input: { flex: 1, paddingVertical: 10, fontSize: 16, fontFamily: 'Roboto' },
    button: {
        backgroundColor: "#5c6bc0",
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginVertical: 8,
        elevation: 2,
    },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    linkBtn: { marginTop: 16 },
    linkText: { color: "#5c6bc0", textAlign: "center", fontSize: 16, textDecorationLine: "underline" },
    errorText: { color: "red", textAlign: "center", marginBottom: 12 }
});
