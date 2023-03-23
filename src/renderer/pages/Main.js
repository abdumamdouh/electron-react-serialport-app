import React, { useEffect, useState } from 'react';
import model from '../../../assets/mimar/model.png';
import pinOn from '../../../assets/mimar/pinOn.png';
import pinOff from '../../../assets/mimar/pinOff.png';

import { toast } from 'react-toastify';

import { readFromFile, writeToFile } from '../utils';

const Main = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [canPin, setCanPin] = useState(false);
  const [iconsPositions, setIconsPositions] = useState([]);

  useEffect(() => {
    // Update the stored data when the iconsPositions state changes
    console.log('data that will be stored', iconsPositions);
    if (hasMounted) writeToFile(JSON.stringify(iconsPositions));
  }, [iconsPositions]);

  useEffect(() => {
    // Load the stored data when the component mounts
    const read = async () => {
      const data = await readFromFile();
      // console.log('data that was read', JSON.parse(data));
      setIconsPositions(JSON.parse(data));
    };
    read();
    setHasMounted(true);
  }, []);

  const handleModelClicked = (event) => {
    if (!canPin) return;
    const rect = event.target.getBoundingClientRect();

    const iconWidth = 80;
    const iconHeight = 107;

    const offsetX = event.clientX - rect.left - iconWidth / 2;
    const offsetY = event.clientY - rect.top - iconHeight;

    setIconsPositions((prev) => [
      ...prev,
      { id: prev.length, on: false, x: offsetX, y: offsetY },
    ]);

    // setTargetElement(event.target);

    // const eventRef = event;
    // window.addEventListener('resize', () => {
    // 	if (!targetElement) return;

    // 	const newRect = targetElement.getBoundingClientRect();
    // 	const newOffsetX = eventRef.clientX - newRect.left - iconWidth / 2;
    // 	const newOffsetY = eventRef.clientY - newRect.top - iconHeight;
    // 	setIconPosition({ x: newOffsetX, y: newOffsetY });
    // });
  };

  const handlePinToggle = (id) => {
    setIconsPositions((prev) =>
      prev.map((icon) => (+icon.id === +id ? { ...icon, on: !icon.on } : icon))
    );

    fetch('http://localhost:5432/log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => toast(`port opened for pin ${data.id}`))
      .catch((error) => console.error(error));
  };
  return (
    <div className="container">
      <div className="flex">
        <div>
          <button className="btn" onClick={() => setCanPin(!canPin)}>
            {canPin ? 'Stop Pining' : 'Click To Pin'}
          </button>
          <button className="btn" onClick={() => setIconsPositions([])}>
            Remove All
          </button>
        </div>
        <div className="model">
          <img onClick={handleModelClicked} className="modelPic" src={model} />
          {iconsPositions.map((iconPosition) => (
            <img
              key={iconPosition.id}
              onClick={() => handlePinToggle(iconPosition.id)}
              className="pin"
              src={iconPosition.on ? pinOn : pinOff}
              style={{
                left: `${iconPosition.x}px`,
                top: `${iconPosition.y}px`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
