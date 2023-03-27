import React, { useRef, useState } from 'react';
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
  const [angle, setAngle] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const prevX = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleRotation = () => {
    setRotation(rotation + 45); // increment the rotation angle by 45 degrees on each click
  };

  const handleMenuItem = (item) => console.log('menu item', item);

  const onMouseDown = (e) => {
    console.log('handleMouseDown', e);
    setIsMouseDown(true);
  };

  const onMouseMove = (e) => {
    if (isMouseDown) {
      if (prevX.current) {
        const direction = e.clientX - prevX.current > 0 ? 1 : -1;
        const newAngle = angle + direction * Math.abs(e.movementX);
        setAngle(newAngle);
      }
      prevX.current = e.clientX;
    }
  };

  const onMouseUp = (e) => {
    console.log('onMouseUp', e);
    setIsMouseDown(false);
  };

  const onTouchStart = (e) => {
    setIsHolding(true);
    prevX.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    setIsHolding(false);
  };

  const onTouchMove = (e) => {
    if (isHolding) {
      if (prevX.current) {
        const direction = e.touches[0].clientX - prevX.current > 0 ? 1 : -1;
        const newAngle = angle + direction * Math.abs(e.touches[0].movementX);
        setAngle(newAngle);
      }
      prevX.current = e.touches[0].clientX;
    }
  };

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
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchMove={onTouchMove}
        className={isOpen ? 'active' : ''}
        style={{
          transform: `rotate(${angle}deg)`,
          transition: 'transform 0.5s ease-out',
          position: 'absolute',
          bottom: -155,
        }}
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
        <li onClick={() => setIsOpen(!isOpen)} className="close">
          <a href="#">
            <img src={close} alt="close" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
