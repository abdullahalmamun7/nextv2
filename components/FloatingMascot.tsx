import React, { useState, useRef } from 'react';
import RobotSVG from './RobotSVG';

const FloatingMascot: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPosition({ 
      x: positionRef.current.x + dx, 
      y: positionRef.current.y + dy 
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      positionRef.current = position;
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <>
      {/* Draggable Robot */}
      <div 
        id="robot"
        className={isDragging ? 'dragging' : ''}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <RobotSVG className="w-full h-full drop-shadow-xl" />
      </div>
    </>
  );
};

export default FloatingMascot;