import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const data = [
  {
    id: '1',
    title: 'The Amazing Spider-Man (1963) #121',
    author: 'Gerry Conway',
    description: 'The Death of Gwen Stacy! Read the most heart-wrenching moment in Amazing Spider-Man history as Gwen Stacy dies!',
    cover: require('../assets/images/comic-1.jpeg'), 
  },
  {
    id: '2',
    title: 'The Amazing Spider-Man (2022) #1',
    author: 'Zeb Wells',
    description: 'Dont miss your chance to witness Spider-Mans rap battle with Eminem on this AMAZING SPIDER-MAN (2022)',
    cover: require('../assets/images/comic-2.jpeg'), 
  },
  {
    id: '3',
    title: 'Web of Spider-Man (1985) #32',
    author: 'J.M. DeMatteis',
    description: 'Spider-Man emerges from his grave and stumbles into Kravens mansion. From the newspapers scattered on the ground, Spider-Man learns that one of his impersonators has been attacking the town for two weeks.',
    cover: require('../assets/images/comic-3.jpeg'), 
  },
  {
    id: '4',
    title: 'Ultimate Spider-Man Vol. 6: Venom',
    author: 'Brian Michael Bendis',
    description: "After reuniting with his childhood friend Eddie Brock, Peter Parker discovers a terrible secret about their fathers' past ...a secret that quickly results in a confrontation with Venom, Spider-Man's evil, dark twin. Collects the sold-out ULTIMATE SPIDER-MAN #33-39 !",
    cover: require('../assets/images/comic-4.jpeg'),
    pages: [
      require('../assets/images/Ultimate/Ultimate-Spider-Man-v06---Venom-(2007)-(Digital)-(Asgard-Empire)-001.jpg'),
      require('../assets/images/Ultimate/Ultimate-Spider-Man-v06---Venom-(2007)-(Digital)-(Asgard-Empire)-002.jpg'),
      require('../assets/images/Ultimate/Ultimate-Spider-Man-v06---Venom-(2007)-(Digital)-(Asgard-Empire)-003.jpg'),
      require('../assets/images/Ultimate/Ultimate-Spider-Man-v06---Venom-(2007)-(Digital)-(Asgard-Empire)-004.jpg'),
    ],
  },
  // Add more comic books as needed
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState(''); // For search text
  const [filterAuthor, setFilterAuthor] = useState(''); // For filtering by author

  // Function to open the comic detail page
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Detail', { comic: item })}
      >
        <View style={styles.comicContainer}>
          <Image source={item.cover} style={styles.comicCover} />
          <Text style={styles.comicTitle}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredData = data.filter((item) => {
    // Filter by search text
    if (searchText !== '' && !item.title.toLowerCase().includes(searchText.toLowerCase())) {
      return false;
    }
    // Filter by author
    if (filterAuthor !== '' && !item.author.toLowerCase().includes(filterAuthor.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>VividComics</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search comics..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Filter by author..."
          value={filterAuthor}
          onChangeText={(text) => setFilterAuthor(text)}
        />
      </View>
      {filteredData.map((item) => (
        <View key={item.id} style={styles.comicItem}>
          {renderItem({ item })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = {
  container: {
    backgroundColor: '#F2D85E',
    padding: 10,
  },
  titleContainer: {
    backgroundColor: '#3498db',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  comicItem: {
    marginBottom: 20,
  },
  comicContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  comicCover: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
  comicTitle: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
};

export default HomeScreen;
