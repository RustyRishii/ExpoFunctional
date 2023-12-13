import { StyleSheet } from "react-native";

const universalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  quoteText: {
    fontSize: 20,
  },
  authorText: {
    fontSize: 20,
    textAlign: "right",
  },
  iconBar: {
    //backgroundColor: "blue",
    flexDirection: "row",
    marginTop: 5,
    padding: 5,
    justifyContent: "space-between",
  },
  quoteBlock: {
    marginTop: 5,
    borderColor: "black",
    borderWidth: 0.5,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
  },
});

export default universalStyles;
