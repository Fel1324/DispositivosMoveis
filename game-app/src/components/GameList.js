import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameList = ({ onSelectGame }) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/games')
            .then(response => setGames(response.data))
            .catch(error => console.error('Erro ao buscar álbuns:', error));
    }, []);

    return (
        <div>
            <h1>Games</h1>
            <ul>
                {games.map(game => (
                    <li key={game.game_id} onClick={() => onSelectGame(game.game_id)}>
                        <img src={game.game_capa} alt={game.game_titulo} width="100" />
                        <p>{game.game_titulo} - {game.game_desenvolvedora} ({game.game_ano})</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GameList;

