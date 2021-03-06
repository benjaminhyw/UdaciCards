import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { white } from "../utils/colors";
import { connect } from "react-redux";
import { receiveDecks } from "../actions/decks";
import { getDecks, removeAll } from "../utils/api";

class DeckList extends Component {
  componentDidMount() {
    getDecks().then(decks => {
      console.log(decks);
      this.props.dispatch(receiveDecks(decks));
    });
  }

  render() {
    // removeAll();
    let { deckIds, decks } = this.props;
    return (
      <View style={styles.container}>
        {deckIds.length > 0 ? (
          deckIds.map(deckId => {
            return (
              <TouchableOpacity
                key={deckId}
                onPress={() => {
                  this.props.navigation.navigate("DeckDetail", {
                    deckId,
                    decks
                  });
                }}
              >
                <View style={styles.item}>
                  <Text>{decks[deckId].title}</Text>
                  <Text>{`${decks[deckId].questions.length} Questions`}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.noDataText}>
            <Text style={{ fontSize: 40, paddingTop: 40 }}>
              0 Decks Available.
            </Text>
            <Text style={{ fontSize: 40 }}>Create One!</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    alignItems: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0, 0.24)",
    shadowOffset: {
      width: 0,
      height: 3
    }
  },
  noDataText: {
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

function mapStateToProps(state) {
  return {
    decks: state.decks,
    deckIds: Object.keys(state.decks)
  };
}

export default connect(mapStateToProps)(DeckList);
