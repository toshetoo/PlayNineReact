import Game from "./components/Game";

let React = require('react');
let ReactDOM = require('react-dom');

class App extends React.Component {

    render() {
        return (
            <div>
                <Game/>
            </div>
        )
    }


}

ReactDOM.render(<App/>, document.getElementById('app'));