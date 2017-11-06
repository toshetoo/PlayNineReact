let React = require('react');

const Numbers = (props)=> {

    const numberClassName = (number) => {
        if(props.usedNumbers.indexOf(number) >= 0) {
            return 'used'
        }

        if(props.selectedNumbers.indexOf(number) >= 0) {
            return 'selected'
        }
    };

    return (
        <div className='card'>
            <div>
                {Numbers.list.map((num, i) =>
                    <span key={i} className={numberClassName(num)} onClick={() => props.selectNumber(num)}>{num}</span>
                )}
            </div>
        </div>
    )
};

Numbers.list = [1,2,3,4,5,6,7,8,9];

export default Numbers;