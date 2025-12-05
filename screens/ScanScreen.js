import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Colors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GlassCard } from '@/components/ui/GlassCard';
import { ActionButton } from '@/components/ui/ActionButton';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { analyzeStress } from '@/services/api';

export default function ScanScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [journalEntry, setJournalEntry] = useState('');
    const [cameraActive, setCameraActive] = useState(false);
    const cameraRef = useRef(null);

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    if (!permission) {
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

    const processImage = async (uri) => {
        setAnalyzing(true);
        try {
            // Create FormData
            const formData = new FormData();
            formData.append('image', {
                uri: uri,
                name: 'scan.jpg',
                type: 'image/jpeg',
            });

            // Call API
            const apiResult = await analyzeStress(formData);

            // Map API result to UI state
            setResult({
                stressLevel: apiResult.stress_level,
                mood: apiResult.emotion,
                emoji: getEmojiForEmotion(apiResult.emotion),
                explanation: apiResult.explanation
            });

        } catch (error) {
            Alert.alert('Scan Failed', 'Could not analyze stress. Please try again.');
            console.error(error);
        } finally {
            setAnalyzing(false);
            setCameraActive(false);
        }
    };

    const takePicture = async () => {
        if (!cameraRef.current) return;
        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.5,
                base64: false,
            });
            processImage(photo.uri);
        } catch (error) {
            console.error("Camera error:", error);
            Alert.alert("Camera Error", "Could not capture image. Try uploading instead.");
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.5,
            });

            if (!result.canceled) {
                processImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Picker error:", error);
            Alert.alert("Upload Error", "Could not display image picker.");
        }
    };

    const getEmojiForEmotion = (emotion) => {
        const map = {
            happy: '😊',
            happiness: '😊',
            sad: '😢',
            sadness: '😢',
            angry: '😠',
            anger: '😠',
            fear: '😨',
            surprise: '😲',
            neutral: '😐',
            disgust: '🤢'
        };
        return map[emotion ? emotion.toLowerCase() : 'neutral'] || '😐';
    };

    const resetScan = () => {
        setResult(null);
        setJournalEntry('');
        setCameraActive(false);
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
                        <Text style={[styles.explanationText, { color: theme.icon, textAlign: 'center', marginBottom: 10 }]}>
                            {result.explanation}
                        </Text>

                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${result.stressLevel}%`, backgroundColor: result.stressLevel > 50 ? '#e17055' : '#00b894' }]} />
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
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            {cameraActive ? (
                <View style={StyleSheet.absoluteFill}>
                    <CameraView
                        style={StyleSheet.absoluteFill}
                        facing="front"
                        mode="picture"
                        ref={cameraRef}
                    />
                    <View style={styles.cameraOverlay}>
                        <Text style={styles.overlayText}>Center your face</Text>

                        <View style={styles.controlsContainer}>
                            <TouchableOpacity style={styles.secondaryBtn} onPress={() => setCameraActive(false)}>
                                <IconSymbol name="xmark" size={24} color="#fff" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.captureBtn} onPress={takePicture} disabled={analyzing}>
                                {analyzing ? (
                                    <View style={styles.analyzingIndicator} />
                                ) : (
                                    <View style={styles.captureInner} />
                                )}
                            </TouchableOpacity>

                            <View style={{ width: 50 }} />
                        </View>
                    </View>
                </View>
            ) : (
                <View style={styles.placeholderContainer}>
                    <Text style={[styles.title, { color: theme.text, marginBottom: 10 }]}>Scan Your Face</Text>
                    <Text style={[styles.subtitle, { color: theme.icon, textAlign: 'center', marginBottom: 40 }]}>
                        Analyze your stress levels using AI.
                    </Text>

                    <ActionButton
                        title="Open Camera"
                        onPress={() => setCameraActive(true)}
                        style={{ marginBottom: 20 }}
                    />

                    <TouchableOpacity onPress={pickImage} style={styles.uploadBtn}>
                        <IconSymbol name="photo.fill" size={20} color={theme.primary} />
                        <Text style={{ marginLeft: 10, color: theme.primary, fontWeight: '600' }}>Upload from Gallery</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
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
    secondaryBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
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
    explanationText: {
        fontSize: 14,
        fontStyle: 'italic',
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
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    uploadBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    }
});
