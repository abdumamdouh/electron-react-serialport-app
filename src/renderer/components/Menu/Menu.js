import React, { useState } from 'react';
import './style.scss';
import {
  bag,
  building,
  close,
  cloud,
  faces,
  home,
  house,
  swipe,
} from '../../../../assets/mimar/menu';

function Menu() {
  const [rotation, setRotation] = useState(0); // initial rotation angle
  const [isOpen, setIsOpen] = useState(false);

  const handleRotation = () => {
    setRotation(rotation + 45); // increment the rotation angle by 45 degrees on each click
  };

  const handleMenuItem = (item) => console.log('menu item', item);

  if (!isOpen)
    return (
      <img
        onClick={() => setIsOpen(!isOpen)}
        className="swipe-button"
        src={swipe}
        alt="swipe"
      />
    );

  return (
    <div
      style={{
        padding: 0,
        margin: 0,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ul
        className={isOpen ? 'active' : ''}
        // style={{ transform: `rotate(${rotation}deg)` }}
      >
        <li onClick={() => handleMenuItem('bag')}>
          <a href="#">
            <img src={bag} alt="bag" />
          </a>
        </li>
        <li onClick={() => handleMenuItem('faces')}>
          <a href="#">
            <img src={faces} alt="faces" />
          </a>
        </li>
        <li onClick={() => handleMenuItem('building')}>
          <a href="#">
            <img src={building} alt="building" />
          </a>
        </li>
        <li onClick={() => handleMenuItem('home')}>
          <a href="#">
            <img src={home} alt="home" />
          </a>
        </li>
        <li onClick={() => handleMenuItem('house')}>
          <a href="#">
            <img src={house} alt="house" />
          </a>
        </li>
        <li onClick={() => handleMenuItem('cloud')}>
          <a href="#">
            <img src={cloud} alt="cloud" />
          </a>
        </li>
        <li onClick={() => setIsOpen(!isOpen)} class="close">
          <a href="#">
            <img src={close} alt="close" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
