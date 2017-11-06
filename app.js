let React = require('react');
let ReactDOM = require('react-dom');
import Game from './Game';

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