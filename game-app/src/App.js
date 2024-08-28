import React, { useState } from 'react';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';
import './App.css';

const App = () => {
    const [selectedGameId, setSelectedGameId] = useState(null);

    return (
        <div className="app-container">
            <GameList onSelectGame={setSelectedGameId} />
            <GameDetail gameId={selectedGameId} />
        </div>
    );
};

export default App;
