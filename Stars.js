let React = require('react');

const Stars = (props)=> {
    let stars = [];

    for(let i=0; i<props.numberOfStars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>)
    }

    return (
        <div className='col-md-4'>
            {stars}
        </div>
    )
};

export default Stars;