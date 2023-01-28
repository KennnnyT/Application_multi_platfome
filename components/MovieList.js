import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import Fire from '../Fire';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';


const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const firebase = new Fire();
    firebase.getMovies(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <View>
      <FlatList
    data={movies}
    renderItem={({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.year}>{item.year}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Image style={styles.image} source={{ uri: item.image }} />
        </View>
    )}
    keyExtractor={item => item.title}/>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
      alignItems: 'center',
      padding: 20,
  },
  title: {
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10,
  },
  year: {
      fontSize: 14,
      marginBottom: 10,
  },
  description: {
      fontSize: 12,
      marginBottom: 10,
  },
  image: {
      width: 100,
      height: 100,
  },
});

export default MovieList;
