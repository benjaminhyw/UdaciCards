import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import TextButton from "./TextButton";

class QuizCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAnswer: true
    };

    this.pressCorrect = this.pressCorrect.bind(this);
    this.pressIncorrect = this.pressIncorrect.bind(this);
    this.toggleShowAnswer = this.toggleShowAnswer.bind(this);
  }

  toggleShowAnswer() {
    console.log("toggleShowAnswer was fired");
    this.setState({
      showAnswer: !this.state.showAnswer
    });
  }

  pressCorrect() {
    console.log("CORRECT was pressed");
    // this.props.navigation.navigate("AddCard", {
    //   deckInformation: this.props.deckInformation
    // });
  }

  pressIncorrect() {
    console.log("INCORRECT was pressed");
    // this.props.navigation.navigate("AddCard", {
    //   deckInformation: this.props.deckInformation
    // });
  }

  render() {
    const { deckInformation } = this.props;
    console.log(deckInformation);
    return (
      <View>
        <Text>
          You have {deckInformation.questions.length} questions to answer
        </Text>

        <TextButton onPress={this.toggleShowAnswer} style={{ margin: 20 }}>
          {this.state.showAnswer ? "Show Question" : "Show Answer"}
        </TextButton>

        <TextButton onPress={this.pressCorrect} style={{ margin: 20 }}>
          CORRECT
        </TextButton>
        <TextButton onPress={this.pressIncorrect} style={{ margin: 20 }}>
          INCORRECT
        </TextButton>
      </View>
    );
  }
}

export default connect()(QuizCard);