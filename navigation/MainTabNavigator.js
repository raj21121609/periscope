import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import InsightsScreen from '../screens/InsightsScreen';
import AICompanionScreen from '../screens/AICompanionScreen';

import { HapticTab } from '../components/haptic-tab';
import { IconSymbol } from '../components/ui/icon-symbol';
import { Colors } from '../constants/theme';
import { useColorScheme } from '../hooks/use-color-scheme';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: theme.tabIconSelected,
                tabBarInactiveTintColor: theme.tabIconDefault,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        elevation: 0,
                        height: 85,
                    },
                    default: {
                        backgroundColor: theme.background,
                        borderTopWidth: 0,
                        elevation: 10,
                        height: 65,
                        paddingBottom: 10,
                    },
                }),
                tabBarItemStyle: {
                    paddingTop: 10,
                }
            }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <IconSymbol size={24} name="house.fill" color={color} />,
                }}
            />
            <Tab.Screen
                name="Scan"
                component={ScanScreen}
                options={{
                    title: 'Scan',
                    tabBarIcon: ({ color }) => <IconSymbol size={24} name="camera.fill" color={color} />,
                }}
            />
            <Tab.Screen
                name="Insights"
                component={InsightsScreen}
                options={{
                    title: 'Insights',
                    tabBarIcon: ({ color }) => <IconSymbol size={24} name="chart.bar.fill" color={color} />,
                }}
            />
            <Tab.Screen
                name="Companion"
                component={AICompanionScreen}
                options={{
                    title: 'AI Twin',
                    tabBarIcon: ({ color }) => <IconSymbol size={24} name="message.fill" color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}
