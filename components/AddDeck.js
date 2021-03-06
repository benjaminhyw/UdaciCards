import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { timeToString } from "../utils/helpers";
import { purple, white, gray } from "../utils/colors";
import { connect } from "react-redux";
import { addDeck } from "../actions/decks";
import { submitDeck } from "../utils/api";

function SubmitBtn({ onPress, disabled }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios"
          ? disabled
            ? styles.disabledIosSubmitBtn
            : styles.iosSubmitBtn
          : disabled
          ? styles.disabledAndroidSubmitbtn
          : styles.androidSubmitbtn
      }
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>CREATE DECK</Text>
    </TouchableOpacity>
  );
}

class AddDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ""
    };
  }

  submit = () => {
    const key = timeToString();
    const { title } = this.state;

    let deck = {
      key,
      title,
      questions: [],
      quizTaken: false,
      quizScore: 0
    };
    this.props.dispatch(addDeck(deck));
    this.setState({ title: "" });
    this.toDeckDetails(key);
    submitDeck(deck);
  };

  toDeckDetails = deckId => {
    let { decks } = this.props;
    this.props.navigation.navigate("DeckDetail", {
      deckId,
      decks
    });
  };

  render() {
    let isDisabled = this.state.title.length > 0;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.center}>
          <Text style={styles.deckTitleLabelText}>
            What's the title of your new deck?
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter title here..."
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
          <SubmitBtn onPress={this.submit} disabled={!isDisabled} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  textInput: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  androidSubmitbtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  disabledIosSubmitBtn: {
    backgroundColor: gray,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  disabledAndroidSubmitbtn: {
    backgroundColor: gray,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "flex-end",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  deckTitleLabelText: {
    fontSize: 30,
    textAlign: "center"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30
  }
});

function mapStateToProps(state) {
  return {
    decks: state.decks
  };
}

export default connect(mapStateToProps)(AddDeck);
