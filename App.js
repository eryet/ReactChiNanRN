import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Entypo } from "@expo/vector-icons";

import Layout from "./components/tablayout/Layout";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DarkTheme = {
  ...DefaultTheme,
  colors: {
    background: "rgb(242, 242, 242)",
    card: "#303030",
    border: "#38abe0",
    notification: "rgb(255, 69, 58)",
  },
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});

  useEffect(() => {
    Promise.all([
      fetch(
        "https://newsapi.org/v2/top-headlines?country=tw&apiKey=93261aa11b4a41c79193951e5640ba6b"
      ),
      fetch(
        "https://newsapi.org/v2/top-headlines?country=us&apiKey=93261aa11b4a41c79193951e5640ba6b"
      ),
    ])
      .then(([response1, response2]) =>
        Promise.all([response1.json(), response2.json()])
      )
      .then(([response1, response2]) => {
        setData(response1);
        setData2(response2);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading === false) {
    // console.log(data);
    return (
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Taiwan"
          tabBarOptions={{
            activeTintColor: "#38abe0",
            inactiveTintColor: "#909090",
            inactiveBackgroundColor: "#212121",
            activeBackgroundColor: "#212121",
          }}
        >
          <Tab.Screen
            name="taiwan"
            options={{
              tabBarLabel: "Taiwan",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="news" size={24} color={color} />
              ),
            }}
            children={() => <Layout data={data.articles} />}
          />
          <Tab.Screen
            name="usa"
            options={{
              tabBarLabel: "Usa",
              tabBarIcon: ({ color, size }) => (
                <Entypo name="news" size={24} color={color} />
              ),
            }}
            children={() => <Layout data={data2.articles} />}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.live_header}>
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#303030",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  dark_mode: {
    backgroundColor: "#303030",
  },
});

export default App;
