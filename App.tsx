import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback, Children } from "react";
import { PropsWithChildren } from "react";
import { useRef } from "react";
import {
  ViewStyle,
  StyleSheet,
  ScrollView,
  Text,
  View,
  RefreshControl,
  TouchableOpacity,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import universalStyles from "./src/styles/styles";
import Icon from "react-native-vector-icons/Ionicons";
import Clipboard from "@react-native-clipboard/clipboard";
import Snackbar from "react-native-snackbar";

const copyIcon = (
  <Icon
    name="copy"
    size={20}
    color="white"
    style={{ backgroundColor: "green", padding: 5, borderRadius: 10 }}
  />
);

type FadeOutProps = PropsWithChildren<{ style: ViewStyle }>;

type FadeInViewProps = PropsWithChildren<{ style: ViewStyle }>;

const FadeInView: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      useNativeDriver: true,
      duration: 10000,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const FadeOutView: React.FC<FadeOutProps> = (props) => {
  const fadeoutAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeoutAnim, {
      toValue: 0,
      useNativeDriver: true,
      duration: 10000,
    }).start();
  }, [fadeoutAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeoutAnim,
      }}
    >
      <Text>{props.children}</Text>
    </Animated.View>
  );
};

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
  const [randomColor, setRandomColor] = useState("");
  const [colorName, setColorName] = useState("");
  const [apiData, setAPIData] = useState(undefined);
  //const [apiData, setAPIData] = useState<ApiResponse | undefined>;

  const getAPIData = async () => {
    let urlResult = await fetch(url);
    let myData = await urlResult.json();
    setAPIData(myData);
    console.log(myData);
  };

  useEffect(() => {
    randomColorFunction();
    getAPIData();
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(`${apiData.text} - ${apiData.author}`);
  };

  const colors = [
    "aliceblue",
    "antiquewhite",
    "aqua",
    "aquamarine",
    "azure",
    "beige",
    "bisque",
    "black",
    "blanchedalmond",
    "blue",
    "blueviolet",
    "brown",
    "burlywood",
    "cadetblue",
    "chartreuse",
    "chocolate",
    "coral",
    "cornflowerblue",
    "cornsilk",
    "crimson",
    "cyan",
    "darkblue",
    "darkcyan",
    "darkgoldenrod",
    "darkgray",
    "darkgreen",
    "darkgrey",
    "darkkhaki",
    "darkmagenta",
    "darkolivegreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darksalmon",
    "darkseagreen",
    "darkslateblue",
    "darkslategrey",
    "darkturquoise",
    "darkviolet",
    "deeppink",
    "deepskyblue",
    "dimgray",
    "dimgrey",
    "dodgerblue",
    "firebrick",
    "floralwhite",
    "forestgreen",
    "fuchsia",
    "gainsboro",
    "ghostwhite",
    "gold",
    "goldenrod",
    "gray",
    "green",
    "greenyellow",
    "grey",
    "honeydew",
    "hotpink",
    "indianred",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lavenderblush",
    "lawngreen",
    "lemonchiffon",
    "lightblue",
    "lightcoral",
    "lightcyan",
    "lightgoldenrodyellow",
    "lightgray",
    "lightgreen",
    "lightgrey",
    "lightpink",
    "lightsalmon",
    "lightseagreen",
    "lightskyblue",
    "lightslategrey",
    "lightsteelblue",
    "lightyellow",
    "lime",
    "limegreen",
    "linen",
    "magenta",
    "maroon",
    "mediumaquamarine",
    "mediumblue",
    "mediumorchid",
    "mediumpurple",
    "mediumseagreen",
    "mediumslateblue",
    "mediumspringgreen",
    "mediumturquoise",
    "mediumvioletred",
    "midnightblue",
    "mintcream",
    "mistyrose",
    "moccasin",
    "navajowhite",
    "navy",
    "oldlace",
    "olive",
    "olivedrab",
    "orange",
    "orangered",
    "orchid",
    "palegoldenrod",
    "palegreen",
    "paleturquoise",
    "palevioletred",
    "papayawhip",
    "peachpuff",
    "peru",
    "pink",
    "plum",
    "powderblue",
    "purple",
    "rebeccapurple",
    "red",
    "rosybrown",
    "royalblue",
    "saddlebrown",
    "salmon",
    "sandybrown",
    "seagreen",
    "seashell",
    "sienna",
    "silver",
    "skyblue",
    "slateblue",
    "slategray",
    "snow",
    "springgreen",
    "steelblue",
    "tan",
    "teal",
    "thistle",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
    "white",
    "whitesmoke",
    "yellow",
    "yellowgreen",
  ];

  function randomColorFunction() {
    let result = Math.floor(Math.random() * colors.length);
    setRandomColor(colors[result]);
    setColorName(colors[result]);
    console.log(colors[result]);
    return colors[result];
  }

  const refreshFunction = useCallback(() => {
    randomColorFunction();
    setRefreshing(true);
    getAPIData();
    setTimeout(() => {
      setRefreshing(false);
    }, 200);
  }, []);

  interface ApiResponse {
    id: number;
    text: string;
    author: string;
    // Add any other properties if they exist in the API response
  }

  const url = "https://stoic-quotes.com/api/quote";

  function snackbarFunction() {
    Snackbar.show({
      text: "copied",
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 10,
          backgroundColor: randomColor,
          height: "100%",
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refreshFunction} />
        }
      >
        <Text>Open up App.tsx to start working on your app!</Text>
        <StatusBar style="auto" backgroundColor="black" />
        <Text>{colorName}</Text>
        {/* <View style={{ justifyContent: "center", flex: 1 }}></View> */}
        <View style={universalStyles.quoteBlock}>
          {apiData ? (
            <View>
              <Text style={universalStyles.quoteText}>{apiData.text}</Text>
              <Text style={universalStyles.authorText}>- {apiData.author}</Text>
            </View>
          ) : null}
        </View>
        <View style={universalStyles.iconBar}>
          <TouchableOpacity
            onPress={() => {
              snackbarFunction();
              copyToClipboard();
            }}
          >
            {copyIcon}
          </TouchableOpacity>
          <TouchableOpacity onPress={copyToClipboard}>
            {copyIcon}
          </TouchableOpacity>
        </View>
        <FadeInView
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            backgroundColor: "red",
          }}
        >
          <Text style={{ color: "green", fontSize: 20 }}>This is text</Text>
        </FadeInView>
        <FadeOutView
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", fontSize: 20 }}>Xd</Text>
        </FadeOutView>
      </ScrollView>
    </SafeAreaView>
  );
}
