import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Layout } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function AICompanionScreen() {
    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi, I'm your Cognitive Twin. I noticed your stress levels are a bit high today. Want to talk about it?",
            sender: 'ai',
            timestamp: '10:00 AM'
        }
    ]);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef();

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMsg = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMsg]);
        setInputText('');

        // Simulate AI typing and response
        setTimeout(() => {
            const aiResponse = {
                id: messages.length + 2,
                text: "I hear you. Taking a moment to breathe deeply can help reset your nervous system. Shall we try a 1-minute exercise?",
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            style={[styles.container, { backgroundColor: theme.background }]}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
            {/* Header */}
            <View style={[styles.header, { borderBottomColor: theme.card }]}>
                <View style={styles.avatarContainer}>
                    <LinearGradient
                        colors={[theme.pastelBlue, theme.lavender]}
                        style={styles.avatarBadge}
                    >
                        <Image
                            source={require('@/assets/images/react-logo.png')}
                            style={styles.avatarImage}
                            contentFit="contain"
                        />
                    </LinearGradient>
                    <View>
                        <Text style={[styles.headerTitle, { color: theme.text }]}>Cognitive Twin</Text>
                        <Text style={[styles.headerStatus, { color: theme.primary }]}>Always here for you</Text>
                    </View>
                </View>
            </View>

            {/* Chat Area */}
            <ScrollView
                contentContainerStyle={styles.chatContent}
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            >
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        style={[
                            styles.messageBubble,
                            msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                            msg.sender === 'user' ? { backgroundColor: theme.primary } : { backgroundColor: theme.card }
                        ]}
                    >
                        <Text style={[
                            styles.messageText,
                            msg.sender === 'user' ? { color: '#fff' } : { color: theme.text }
                        ]}>
                            {msg.text}
                        </Text>
                        <Text style={[
                            styles.timestamp,
                            msg.sender === 'user' ? { color: 'rgba(255,255,255,0.7)' } : { color: theme.icon }
                        ]}>
                            {msg.timestamp}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Input Area */}
            <View style={[styles.inputContainer, { backgroundColor: theme.card }]}>
                <TextInput
                    style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
                    placeholder="Type a message..."
                    placeholderTextColor={theme.icon}
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                />
                <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.primary }]} onPress={handleSend}>
                    <IconSymbol name="paperplane.fill" size={20} color="#fff" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: Layout.padding,
        borderBottomWidth: 1,
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarBadge: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: 30,
        height: 30,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerStatus: {
        fontSize: 13,
    },
    chatContent: {
        padding: Layout.padding,
        paddingBottom: 20,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
    },
    userBubble: {
        alignSelf: 'flex-end',
        borderBottomRightRadius: 5,
    },
    aiBubble: {
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 5,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 22,
    },
    timestamp: {
        fontSize: 10,
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingBottom: 30, // Safe area
    },
    input: {
        flex: 1,
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 20,
        marginRight: 15,
    },
    sendButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
