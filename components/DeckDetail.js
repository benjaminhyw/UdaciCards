import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { white, red, gray } from "../utils/colors";
import { connect } from "react-redux";
import TextButton from "./TextButton";
import { deleteDeck } from "../actions/decks";
import { removeDeck } from "../utils/api";

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId, decks } = navigation.state.params;
    return {
      title: decks[deckId] && decks[deckId].title
    };
  };

  constructor(props) {
    super(props);

    this.addCard = this.addCard.bind(this);
    this.startQuiz = this.startQuiz.bind(this);
    this.deleteDeck = this.deleteDeck.bind(this);
  }

  addCard() {
    this.props.navigation.navigate("AddCard", {
      deckInformation: this.props.deckInformation
    });
  }

  startQuiz() {
    this.props.navigation.navigate("Quiz", {
      deckInformation: this.props.deckInformation
    });
  }

  deleteDeck() {
    removeDeck(this.props.deckInformation.key);
    this.props.dispatch(deleteDeck(this.props.deckInformation.key));
    this.props.navigation.navigate("DeckList");
  }

  render() {
    const { deckInformation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {deckInformation && deckInformation.title}
        </Text>
        <Text style={styles.cardCount}>
          {deckInformation && deckInformation.questions.length}{" "}
          {deckInformation && deckInformation.questions.length === 1
            ? "card"
            : "cards"}
        </Text>

        <TextButton onPress={this.addCard} style={{ margin: 20 }}>
          ADD CARD
        </TextButton>

        <TextButton onPress={this.startQuiz} style={{ margin: 20 }}>
          START QUIZ
        </TextButton>
        <TextButton
          onPress={this.deleteDeck}
          style={{ margin: 20, color: red }}
        >
          DELETE DECK
        </TextButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  title: {
    fontSize: 40,
    textAlign: "center"
  },
  cardCount: {
    fontSize: 26,
    textAlign: "center",
    color: gray
  }
});

function mapStateToProps(state, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    deckId,
    deckInformation: state.decks[deckId]
  };
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } = navigation.state.params;

  // remove: () =>
  //   dispatch(
  //     addEntry({
  //       [deckId]: timeToString() === deckId ? getDailyReminderValue() : null
  //     })
  //   ),
  return {
    goBack: () => navigation.goBack(),
    dispatch
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckDetail);
