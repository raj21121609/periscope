import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function GlassCard({ children, style, variant = 'default' }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <View style={[
            styles.card,
            {
                backgroundColor: theme.card,
                borderColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'
            },
            style
        ]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: Layout.radius,
        padding: Layout.padding,
        width: '100%',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 10,
        marginBottom: 16,
    },
});
