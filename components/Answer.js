let React = require('react');

const Answer = (props)=> {
    return (
        <div className='col-md-4'>
            {props.selectedNumbers.map((number, i) =>
                <span key={i} onClick={() => props.unselectNumber(number)}>{number}</span>
            )}
        </div>
    )
};

export default Answer;