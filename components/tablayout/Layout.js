import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Linking,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageLoader } from "react-native-image-fallback";

import styles from "./Styles";
import headerStyles from "./headerStyles";

const News = ({ item }) => {
  console.log(item);
  const imageurl = `${item.urlToImage}`;
  const fallbacks = item.urlToImage;
  const date = new Date(item.publishedAt).toLocaleString();
  // const fallbacks = require("");
  // console.log(item);
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => Linking.openURL(`${item.url}`)}
        style={styles.youtube_link}
      >
        <View style={styles.youtube_link}>
          <ImageLoader
            source={imageurl}
            style={styles.thumbnail}
            fallback={fallbacks}
          />
          <View style={styles.videolink_view}>
            <Text
              style={styles.youtube_title}
              ellipsizeMode="tail"
              numberOfLines={3}
            >
              {item.title}
            </Text>
            <Text style={styles.youtube_channel} numberOfLines={1}>
              {item.source.name}
            </Text>
            <Text style={styles.youtube_channel} numberOfLines={2}>
              {date}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const NewsLayout = (props) => {
  const [data, setData] = useState([...props.data]);

  const renderItem = ({ item }) => {
    return (
      <View key={item.title}>
        <News item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(data) => data.title}
      />
    </SafeAreaView>
  );
};

// sort by popupmenu styles
const optionsStyles = {
  optionsContainer: {
    backgroundColor: "#333333",
    padding: 10,
  },
  optionText: {
    fontSize: 20,
    color: "white",
  },
};

export default NewsLayout;
