import Stars from "./Stars";
import Button from "./Button";
import Answer from "./Answer";
import Numbers from "./Numbers";
import DoneFrame from "./DoneFrame";

let React = require('react');

export default class Game extends React.Component {

    static randomNumber() {
        return 1 + Math.floor(Math.random() * 9);
    }

    static getInitialState() {
        return {
            selectedNumbers: [],
            usedNumbers: [],
            numberOfStars: Game.randomNumber(),
            answerIsCorrect: null,
            redraws: 5,
            doneStatus: null
        };
    }

    constructor(props) {
        super(props);
        this.state = Game.getInitialState();
    }

    resetGame() {
        this.setState(Game.getInitialState())
    }

    selectNumber(clickedNumber) {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
            return;
        }
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
            answerIsCorrect: null
        }));
    };

    unselectNumber(clickedNumber) {
        this.setState(prevState => ({
            selectedNumbers: prevState.selectedNumbers.filter(num => num !== clickedNumber),
            answerIsCorrect: null
        }))
    }

    checkAnswer() {
        this.setState(prevState => ({
            answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }))
    }

    acceptAnswer() {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: Game.randomNumber()
        }), this.updateDoneStatus)
    }

    redraw() {
        if(this.state.redraws === 0) {
            return;
        }

        this.setState(prevState => ({
            selectedNumbers: [],
            answerIsCorrect: null,
            numberOfStars: Game.randomNumber(),
            redraws: prevState.redraws - 1
        }), this.updateDoneStatus)
    }

    possibleSolutions({numOfStars, usedNumbers}) {
        const possibleNumbers = Numbers.list.filter(number => {
            return usedNumbers.indexOf(number) !== -1
        });

        return this.possibleCombinationSum(possibleNumbers, numOfStars);
    }

    possibleCombinationSum(arr, n) {
        if (arr.indexOf(n) >= 0) { return true; }
        if (arr[0] > n) { return false; }
        if (arr[arr.length - 1] > n) {
            arr.pop();
            return this.possibleCombinationSum(arr, n);
        }
        let listSize = arr.length, combinationsCount = (1 << listSize);
        for (let i = 1; i < combinationsCount ; i++ ) {
            let combinationSum = 0;
            for (let j=0 ; j < listSize ; j++) {
                if (i & (1 << j)) { combinationSum += arr[j]; }
            }
            if (n === combinationSum) { return true; }
        }
        return false;
    };

    updateDoneStatus() {
        this.setState(prevState => {
            if(prevState.usedNumbers.length === 9) {
                return {doneStatus: 'Done, Nice!'}
            }

            if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
                return {doneStatus: 'Game Over'}
            }

        })
    }

    render() {
        const {selectedNumbers, numberOfStars, answerIsCorrect, usedNumbers, redraws, doneStatus} = this.state;

        return (
            <div className='container'>
                <h1>Play Nine</h1>
                <hr/>
                <div className="row">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}
                            checkAnswer={this.checkAnswer.bind(this)}
                            answerIsCorrect={answerIsCorrect}
                            acceptAnswer={this.acceptAnswer.bind(this)}
                            redraws={redraws}
                            redraw={this.redraw.bind(this)} />


                    <Answer selectedNumbers={selectedNumbers} unselectNumber={this.unselectNumber.bind(this)}/>
                </div>
                <br/>
                <hr/>
                {doneStatus ?
                    <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame.bind(this)}/> :
                    <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber.bind(this)} usedNumbers={usedNumbers}/>}
            </div>
        )
    }

}