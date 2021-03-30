import { useEffect, useState } from 'react';

const RIGHT = { x: 1, y: 0 };
const LEFT = { x: -1, y: 0 };
const BOTTOM = { x: 0, y: 1 };
const UP = { x: 0, y: -1 };

const CONTROLS = {
  a: LEFT,
  w: UP,
  s: BOTTOM,
  d: RIGHT,
};

const useControls = (moveSnake) => {
  const [start, setStart] = useState(false);
  const [direction, setDirection] = useState(RIGHT);

  useEffect(() => {

    const onKeyPress = ({ key }) => {
      if (Object.keys(CONTROLS).includes(key)) {
        if (!start) {
          setStart(true);
        }
        setDirection(CONTROLS[key]);
      }
    }

    window.addEventListener('keydown', onKeyPress);

    return () => window.removeEventListener('keydown', onKeyPress);
  }, [moveSnake, start]);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      if (start) {
        moveSnake({ ...direction });
      }
    }, 100);

    return () => {
      console.log('clearing interval')
      clearInterval(interval);
    }
  }, [start, direction, moveSnake]);

  return { stop: () => setStart(false) }

};

export default useControls;