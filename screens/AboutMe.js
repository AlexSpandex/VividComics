// AboutMe.js
import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts'; 

const AboutMe = () => {
  const handleTextToSpeech = () => {
    Tts.speak(
      "Hey there, I'm Alejandro, the mad scientist behind VividComics! 🧪✨ (Yes I literally read the emojis) Brace yourselves as I bring your favorite comics to life with a touch of wizardry, aka Text-To-Speech. Get ready for characters that can talk, joke, and maybe even do stand-up comedy. 🎙️ (Mic drop BOOOM BOMB WADDA WADDA) Let the comic magic begin!"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.description}>
        Hey there, I'm Alejandro, the mad scientist behind VividComics! 🧪✨ Brace yourselves as I bring your favorite comics to life with a touch of wizardry, aka Text-To-Speech. Get ready for characters that can talk, joke, and maybe even do stand-up comedy. 🎙️ Let the comic magic begin!
      </Text>
      <TouchableOpacity onPress={handleTextToSpeech} style={styles.ttsButton}>
        <Text style={styles.ttsButtonText}>Read Aloud</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F25C54', // Reddish color
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF', // White color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#FFFFFF', // White color
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#FFFFFF', // White color
  },
  ttsButton: {
    backgroundColor: '#2169AB', // Blue color
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  ttsButtonText: {
    color: '#FFFFFF', // White color
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AboutMe;
