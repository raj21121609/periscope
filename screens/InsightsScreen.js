import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { Colors, StressColors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GlassCard } from '@/components/ui/GlassCard';

const screenWidth = Dimensions.get("window").width;

export default function InsightsScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    const [filter, setFilter] = useState('weekly');

    const chartConfig = {
        backgroundGradientFrom: theme.card,
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: theme.card,
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(76, 102, 159, ${opacity})`, // Deep Blue
        strokeWidth: 2,
        barPercentage: 0.5,
        decimalPlaces: 0,
        labelColor: (opacity = 1) => theme.icon,
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Text style={[styles.title, { color: theme.text }]}>Insights</Text>

                {/* Filters */}
                <View style={styles.filterContainer}>
                    {['daily', 'weekly', 'monthly'].map((f) => (
                        <TouchableOpacity
                            key={f}
                            style={[
                                styles.filterChip,
                                filter === f && { backgroundColor: theme.tint }
                            ]}
                            onPress={() => setFilter(f)}
                        >
                            <Text style={[
                                styles.filterText,
                                { color: filter === f ? '#fff' : theme.icon }
                            ]}>{f.charAt(0).toUpperCase() + f.slice(1)}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Stress Trend */}
                <GlassCard style={styles.chartCard}>
                    <Text style={[styles.cardTitle, { color: theme.text }]}>Stress Trend</Text>
                    <LineChart
                        data={{
                            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                            datasets: [{ data: [40, 45, 28, 60, 55, 30, 20] }]
                        }}
                        width={screenWidth - Layout.padding * 4}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                    />
                </GlassCard>

                {/* Mood Variations */}
                <GlassCard style={styles.chartCard}>
                    <Text style={[styles.cardTitle, { color: theme.text }]}>Mood Variations</Text>
                    <BarChart
                        data={{
                            labels: ["Calm", "Happy", "Anxious", "Tired"],
                            datasets: [{ data: [4, 2, 3, 1] }]
                        }}
                        width={screenWidth - Layout.padding * 4}
                        height={220}
                        chartConfig={{
                            ...chartConfig,
                            color: (opacity = 1) => `rgba(255, 182, 193, ${opacity})`, // Pink
                        }}
                        style={styles.chart}
                        activeOpacity={0.8}
                    />
                </GlassCard>

                {/* Insight Analysis Cards */}
                <Text style={[styles.sectionTitle, { color: theme.text }]}>Analysis</Text>

                <GlassCard style={styles.insightCard}>
                    <View style={[styles.bullet, { backgroundColor: '#e17055' }]} />
                    <Text style={[styles.insightText, { color: theme.text }]}>
                        You are most stressed at <Text style={{ fontWeight: 'bold' }}>night (8 PM - 10 PM)</Text>.
                    </Text>
                </GlassCard>

                <GlassCard style={styles.insightCard}>
                    <View style={[styles.bullet, { backgroundColor: '#00b894' }]} />
                    <Text style={[styles.insightText, { color: theme.text }]}>
                        Your stress decreased <Text style={{ fontWeight: 'bold' }}>12%</Text> this week compared to last week.
                    </Text>
                </GlassCard>

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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    filterContainer: {
        flexDirection: 'row',
        marginBottom: 25,
    },
    filterChip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.05)',
        marginRight: 10,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
    },
    chartCard: {
        padding: 10,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 10,
    },
    chart: {
        borderRadius: 16,
        marginRight: 10, // Compensation for padding
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15,
    },
    insightCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        marginBottom: 10,
    },
    bullet: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 15,
    },
    insightText: {
        fontSize: 15,
        flex: 1,
        lineHeight: 22,
    },
});
