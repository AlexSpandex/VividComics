import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, TouchableOpacity, Dimensions, Text, Button } from 'react-native';
import Tts from 'react-native-tts';

const ComicBookViewer = ({ route }) => {
  const { comic } = route.params;
  const [currentPage, setCurrentPage] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  const onPageChange = (index) => {
    setCurrentPage(index);
  };

  const startTextToSpeech = () => {
    const text = 'Ultimate Spider-Man Volume #6: Venom';
    Tts.speak(text, { androidParams: { KEY_PARAM_PAN: -1, KEY_PARAM_VOLUME: 1, KEY_PARAM_STREAM: 'STREAM_MUSIC' } });
  };

  const stopTextToSpeech = () => {
    Tts.stop();
  };

  useEffect(() => {
    const initializeTts = async () => {
      const availableVoices = await Tts.voices();
      setVoices(
        availableVoices
          .filter(v => !v.networkConnectionRequired && !v.notInstalled)
          .map(v => ({ id: v.id, name: v.name, language: v.language }))
      );

      // Log available voices for reference
      console.log('Available Voices:', voices);

      // Use the first voice as the default selected voice
      if (voices.length > 0) {
        setSelectedVoice(voices[0].id);
        try {
          // Set default language (optional)
          await Tts.setDefaultLanguage(voices[0].language);
        } catch (err) {
          console.log('setDefaultLanguage error ', err);
        }
        // Set the desired voice
        await Tts.setDefaultVoice(voices[0].id);
      }
    };

    initializeTts();
  }, []);

  const renderVoiceItem = ({ item }) => (
    <Button
      title={`${item.language} - ${item.name || item.id}`}
      color={selectedVoice === item.id ? undefined : '#969696'}
      onPress={() => onVoicePress(item)}
    />
  );

  const onVoicePress = async (voice) => {
    try {
      await Tts.setDefaultLanguage(voice.language);
    } catch (err) {
      console.log('setDefaultLanguage error ', err);
    }
    await Tts.setDefaultVoice(voice.id);
    setSelectedVoice(voice.id);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkModeContainer]}>
      <FlatList
        horizontal
        data={comic.pages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onPageChange(index)}>
            <Image source={item} style={[styles.pageImage, index === currentPage && styles.currentPage]} />
          </TouchableOpacity>
        )}
      />
      <View style={styles.textToSpeechContainer}>
        <Button title="Start Text-to-Speech" onPress={startTextToSpeech} />
        <Button title="Stop Text-to-Speech" onPress={stopTextToSpeech} />
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        renderItem={renderVoiceItem}
        extraData={selectedVoice}
        data={voices}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F2D85E',
    alignItems: 'center',
  },
  darkModeContainer: {
    backgroundColor: '#1E1E1E',
  },
  pageImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
  currentPage: {
    borderWidth: 2,
    borderColor: 'red',
  },
  textToSpeechContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
};

export default ComicBookViewer;
