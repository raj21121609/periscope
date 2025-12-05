import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function ActionButton({ onPress, title, variant = 'primary', style }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const bg = variant === 'primary' ? theme.primary : theme.accent;
    const text = variant === 'primary' ? '#fff' : theme.text;

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: bg }, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, { color: text }]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: Layout.radius,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
