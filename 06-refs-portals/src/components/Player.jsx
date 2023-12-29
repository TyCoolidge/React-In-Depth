import { useState, useRef } from 'react';

export default function Player() {
  const input = useRef();

  const [playerName, setPlayerName] = useState('');

  function handleClick() {
    setPlayerName(input.current.value);
    input.current.value = ''; // if it doesnt affect any other state then this is fine
  }

  return (
    <section id="player">
      <h2>Welcome {playerName || 'unknown entity'}</h2>
      <p>
        <input ref={input} type="text" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
