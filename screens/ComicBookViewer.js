// ComicBookViewer.js
import React, { useState } from 'react';
import { View, Image, FlatList, TouchableOpacity } from 'react-native';

const ComicBookViewer = ({ route }) => {
  const { comic } = route.params;
  const [currentPage, setCurrentPage] = useState(0);
  const [darkMode, setDarkMode] = useState(true); // State to manage dark mode

  // Function to handle page changes
  const onPageChange = (index) => {
    setCurrentPage(index);
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
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F2D85E', // Default light mode background
    alignItems: 'center',
  },
  darkModeContainer: {
    backgroundColor: '#1E1E1E', // Only the background becomes dark
  },
  pageImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginVertical: 10,
    marginRight: 10,
  },
  currentPage: {
    borderWidth: 2,
    borderColor: 'red',
  },
};

export default ComicBookViewer;
