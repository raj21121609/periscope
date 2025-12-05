import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Colors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GlassCard } from '@/components/ui/GlassCard';
import { ActionButton } from '@/components/ui/ActionButton';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [journalEntry, setJournalEntry] = useState('');

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={[styles.message, { color: theme.text }]}>We need your permission to show the camera</Text>
                <ActionButton onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const takePicture = async () => {
        // Placeholder: In a real app, you'd use a ref to the camera and call takePictureAsync()
        // For now, we'll simulate capturing an image by setting a dummy URI or just switching state
        setAnalyzing(true);

        // Simulate API delay
        setTimeout(() => {
            setAnalyzing(false);
            setImage('dummy-uri'); // Normally this comes from camera
            setResult({
                stressLevel: 65,
                mood: 'Anxious',
                emoji: '😟',
            });
        }, 2000);
    };

    const resetScan = () => {
        setImage(null);
        setResult(null);
        setJournalEntry('');
    };

    const saveJournal = () => {
        Alert.alert('Saved', 'Your mood entry has been recorded.');
        resetScan();
    };

    if (result) {
        return (
            <View style={[styles.container, { backgroundColor: theme.background }]}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={[styles.title, { color: theme.text }]}>Scan Complete</Text>

                    <GlassCard style={styles.resultCard}>
                        <View style={styles.emojiContainer}>
                            <Text style={styles.emoji}>{result.emoji}</Text>
                        </View>
                        <Text style={[styles.moodText, { color: theme.text }]}>{result.mood}</Text>
                        <Text style={[styles.stressText, { color: theme.icon }]}>Stress Level: {result.stressLevel}%</Text>

                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${result.stressLevel}%`, backgroundColor: '#e17055' }]} />
                        </View>
                    </GlassCard>

                    <View style={styles.journalSection}>
                        <Text style={[styles.journalTitle, { color: theme.text }]}>How are you feeling?</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
                            placeholder="Add a note..."
                            placeholderTextColor={theme.icon}
                            multiline
                            value={journalEntry}
                            onChangeText={setJournalEntry}
                        />
                        <View style={styles.cButtons}>
                            <ActionButton title="Save Entry" onPress={saveJournal} style={styles.saveBtn} />
                            <TouchableOpacity onPress={resetScan} style={styles.retryBtn}>
                                <Text style={{ color: theme.icon }}>Discard</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} facing="front">
                <View style={styles.cameraOverlay}>
                    <Text style={styles.overlayText}>Center your face</Text>

                    <TouchableOpacity style={styles.captureBtn} onPress={takePicture} disabled={analyzing}>
                        {analyzing ? (
                            <View style={styles.analyzingIndicator} />
                        ) : (
                            <View style={styles.captureInner} />
                        )}
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    scrollContent: {
        padding: Layout.padding,
        paddingTop: 60,
        alignItems: 'center',
    },
    message: {
        textAlign: 'center',
        marginBottom: 20,
    },
    camera: {
        flex: 1,
    },
    cameraOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 50,
    },
    overlayText: {
        position: 'absolute',
        top: 100,
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        overflow: 'hidden',
    },
    captureBtn: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#fff',
    },
    captureInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
    },
    analyzingIndicator: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e17055',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    resultCard: {
        alignItems: 'center',
        marginBottom: 40,
    },
    emojiContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,182,193,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emoji: {
        fontSize: 50,
    },
    moodText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    stressText: {
        fontSize: 16,
        marginBottom: 20,
    },
    progressBarBg: {
        width: '100%',
        height: 10,
        backgroundColor: '#eee',
        borderRadius: 5,
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 5,
    },
    journalSection: {
        width: '100%',
    },
    journalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 120,
        borderRadius: Layout.radius,
        padding: 15,
        textAlignVertical: 'top',
        marginBottom: 20,
    },
    cButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    saveBtn: {
        flex: 1,
        marginRight: 10,
    },
    retryBtn: {
        padding: 15,
    }
});
