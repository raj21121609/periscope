import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

import { Colors, StressColors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GlassCard } from '@/components/ui/GlassCard';
import { ActionButton } from '@/components/ui/ActionButton';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function HomeScreen({ navigation }) {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    // Dummy Data
    const stressLevel = 24; // Low
    const stressColor = StressColors.calm;
    const stressLabel = 'Calm';

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Header / 3D Avatar Area */}
                <View style={styles.header}>
                    <Text style={[styles.greeting, { color: theme.text }]}>Good Morning, User</Text>
                    <Text style={[styles.subtitle, { color: theme.icon }]}>Your mind is in a good place.</Text>

                    <View style={styles.avatarContainer}>
                        {/* Placeholder for 3D Model */}
                        <LinearGradient
                            colors={[theme.pastelBlue, theme.lavender]}
                            style={styles.avatarPlaceholder}
                        >
                            <Image
                                source={require('@/assets/images/react-logo.png')} // Replace with 3D model view
                                style={styles.avatarImage}
                                contentFit="contain"
                            />
                        </LinearGradient>

                        <View style={[styles.statusChip, { backgroundColor: stressColor }]}>
                            <Text style={styles.statusText}>{stressLabel}</Text>
                        </View>
                    </View>
                </View>

                {/* Vital Stats */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Vitals</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vitalsContainer}>
                    <GlassCard style={styles.vitalCard}>
                        <IconSymbol name="house.fill" size={24} color={theme.primary} />
                        <Text style={[styles.vitalValue, { color: theme.text }]}>78/100</Text>
                        <Text style={[styles.vitalLabel, { color: theme.icon }]}>Mood Score</Text>
                    </GlassCard>

                    <GlassCard style={styles.vitalCard}>
                        <IconSymbol name="chart.bar.fill" size={24} color={StressColors.normal} />
                        <Text style={[styles.vitalValue, { color: theme.text }]}>
                            {stressLevel}%
                        </Text>
                        <Text style={[styles.vitalLabel, { color: theme.icon }]}>Stress Level</Text>
                    </GlassCard>

                    <GlassCard style={styles.vitalCard}>
                        <IconSymbol name="paperplane.fill" size={24} color={theme.accent} />
                        <Text style={[styles.vitalValue, { color: theme.text }]}>7h 20m</Text>
                        <Text style={[styles.vitalLabel, { color: theme.icon }]}>Sleep</Text>
                    </GlassCard>
                </ScrollView>

                {/* Scan Action */}
                <GlassCard style={styles.scanCard}>
                    <View style={styles.scanContent}>
                        <View>
                            <Text style={[styles.cardTitle, { color: theme.text }]}>Check your stress</Text>
                            <Text style={[styles.cardSubtitle, { color: theme.icon }]}>
                                Take a quick 10s scan to analyze{'\n'}your current mental state.
                            </Text>
                        </View>
                        <ActionButton
                            title="Scan"
                            onPress={() => navigation.navigate('Scan')}
                            style={styles.scanButton}
                        />
                    </View>
                </GlassCard>

                {/* Recommendations */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Recommended for You</Text>

                <GlassCard style={styles.recCard}>
                    <View style={styles.recIcon}>
                        <IconSymbol name="house.fill" size={20} color="#fff" />
                    </View>
                    <View style={styles.recContent}>
                        <Text style={[styles.recTitle, { color: theme.text }]}>3-min Breathing</Text>
                        <Text style={[styles.recDesc, { color: theme.icon }]}>Reduce immediate anxiety</Text>
                    </View>
                    <TouchableOpacity>
                        <IconSymbol name="chevron.right" size={24} color={theme.icon} />
                    </TouchableOpacity>
                </GlassCard>

                <GlassCard style={styles.recCard}>
                    <View style={[styles.recIcon, { backgroundColor: theme.pastelBlue }]}>
                        <IconSymbol name="paperplane.fill" size={20} color="#fff" />
                    </View>
                    <View style={styles.recContent}>
                        <Text style={[styles.recTitle, { color: theme.text }]}>Morning Meditation</Text>
                        <Text style={[styles.recDesc, { color: theme.icon }]}>Start your day with focus</Text>
                    </View>
                    <TouchableOpacity>
                        <IconSymbol name="chevron.right" size={24} color={theme.icon} />
                    </TouchableOpacity>
                </GlassCard>

                {/* Bottom Padding for Tab Bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: Layout.padding,
        paddingTop: 60,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    greeting: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
    },
    avatarContainer: {
        marginTop: 20,
        width: 200,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 180,
        height: 180,
        borderRadius: 90,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    avatarImage: {
        width: 100,
        height: 100,
        opacity: 0.8,
    },
    statusChip: {
        position: 'absolute',
        bottom: 5,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    statusText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginLeft: 5,
    },
    vitalsContainer: {
        marginBottom: 25,
        overflow: 'visible', // Allow shadows to show
    },
    vitalCard: {
        width: 110,
        marginRight: 15,
        alignItems: 'center',
        paddingVertical: 15,
    },
    vitalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 2,
    },
    vitalLabel: {
        fontSize: 12,
    },
    scanCard: {
        marginBottom: 30,
        backgroundColor: 'rgba(255,255,255, 0.8)',
    },
    scanContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13,
        lineHeight: 18,
    },
    scanButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
    },
    recCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    recIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#FFB6C1',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    recContent: {
        flex: 1,
    },
    recTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    recDesc: {
        fontSize: 13,
    },
});
