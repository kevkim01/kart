import React from 'react';
import style from './logo.css';

class Logo extends React.Component {
  render () {
    return (
      <div className='logo_contain'>
          <img className='logo_info' src={require('../../kart_logo.png')} />
      </div>
    );
  }
}

export default Logo;
