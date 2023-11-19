import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const DetailScreen = () => {
  const route = useRoute();
  const { comic } = route.params;
  const navigation = useNavigation();

  const goToComicBookViewer = () => {
    navigation.navigate('ComicBookViewer', { comic });
  };

  return (
    <View style={styles.container}>
      <Image source={comic.cover} style={styles.comicCover} />
      <Text style={styles.comicTitle}>{comic.title}</Text>
      <Text style={styles.comicAuthor}>Author: {comic.author}</Text>
      <Text style={styles.comicDescription}>{comic.description}</Text>

      {/* Button to navigate to ComicBookViewer */}
      <TouchableOpacity onPress={goToComicBookViewer}>
        <Text style={styles.viewComicButton}>View Comic</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F2D85E',
    padding: 20,
    alignItems: 'center',
  },
  comicCover: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
  comicTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  comicAuthor: {
    fontSize: 18,
    marginTop: 10,
  },
  comicDescription: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  viewComicButton: {
    fontSize: 18,
    color: '#3498db',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
};

export default DetailScreen;
