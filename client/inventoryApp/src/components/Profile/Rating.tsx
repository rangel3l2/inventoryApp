import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assuming you've installed and imported the icon library

interface RateProps {
  onRate: (rating: number) => void; // Function to handle rating selection
    title: string; // Title for the rating component
}

const Rate: React.FC<RateProps> = ({ onRate, title }) => {
  const [rating, setRating] = useState(0); // Initialize rating state

  const handleRate = (newRating: number) => {
    setRating(newRating);
    onRate(newRating); // Call the provided function with the selected rating
  };

  const renderStar = (starValue: number) => {
    const filled = rating >= starValue;
    const iconName = filled ? 'star' : 'staro';
    return (
      <TouchableOpacity key={starValue} onPress={() => handleRate(starValue)}>
        <AntDesign name={iconName as any} size={32} color={filled ? 'gold' : 'black'} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map(renderStar)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontFamily: 'RobotoBold',
    fontSize: 30,
    marginBottom: 25,
    
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
});

export default Rate;
