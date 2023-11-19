// Import necessary modules
import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, TouchableOpacity, Dimensions, Button } from 'react-native';
import Tts from 'react-native-tts';

// Import the voices.json file
import voicesData from './voices.json';

// Create the ComicBookViewer component
const ComicBookViewer = ({ route }) => {
  const { comic } = route.params;
  const [currentPage, setCurrentPage] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

  // Function to handle page change
  const onPageChange = (index) => {
    setCurrentPage(index);
  };

  // Function to start text-to-speech
  const startTextToSpeech = async () => {
    const characters = voicesData.comics.find(comicData => comicData.page === currentPage)?.characters;

    if (characters && characters.length > 0) {
      // Use Promise.all to play all characters' descriptions concurrently
      await Promise.all(characters.map(async character => {
        const text = character.description;
        const voice = character.voice;

        // Play the text
        await new Promise(resolve => {
          Tts.speak(text, {
            androidParams: {
              KEY_PARAM_PAN: -1,
              KEY_PARAM_VOLUME: 1,
              KEY_PARAM_STREAM: 'STREAM_MUSIC',
              KEY_PARAM_VOICE_NAME: voice,
            },
            onDone: resolve,
            onStopped: resolve,
            onError: resolve,
          });
        });
      }));
    }
  };

  // Function to stop text-to-speech
  const stopTextToSpeech = () => {
    Tts.stop();
  };

  // useEffect hook to initialize TTS and set the default voice based on the character's voice for the selected page
  useEffect(() => {
    const initializeTts = async () => {
      try {
        // Get the list of available voices
        const availableVoices = await Tts.voices();

        // Filter the available voices to include only US voices
        const usVoices = availableVoices.filter(voice => voice.language.includes('en-US'));

        // Get the characters for the selected page
        const characters = voicesData.comics.find(comicData => comicData.page === currentPage)?.characters;

        if (characters && characters.length > 0) {
          // Use the first character's voice as the default
          const defaultCharacter = characters[0];

          // Check if the default character's voice is available among US voices, otherwise, use the first US voice
          const selectedVoice = usVoices.find(voice => voice.id === defaultCharacter.voice) || usVoices[0];

          // Set the selected voice and character
          setSelectedVoice(selectedVoice.id);
          setSelectedCharacter(defaultCharacter);

          // Set the default language (optional)
          await Tts.setDefaultLanguage(selectedVoice.language);

          // Set the default voice
          await Tts.setDefaultVoice(selectedVoice.id);
        } else {
          console.log('No characters found for the selected page:', currentPage);
        }
      } catch (error) {
        console.error('Error initializing TTS:', error);
      }
    };

    // Call the initializeTts function
    initializeTts();

    // Clean up TTS when the component is unmounted
    return () => {
      Tts.stop();
    };
  }, [currentPage]);

  // Return the JSX for the ComicBookViewer component
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
    </View>
  );
};

// Styles for the ComicBookViewer component
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

// Export the ComicBookViewer component
export default ComicBookViewer;
