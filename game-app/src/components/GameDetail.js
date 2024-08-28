import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameDetail = ({ gameId }) => {
    const [game, setGame] = useState(null);

    useEffect(() => {
        if (gameId) {
            axios.get(`http://localhost:5000/api/game/${gameId}`)
                .then(response => setGame(response.data))
                .catch(error => console.error('Erro ao buscar detalhes do game:', error));
        }
    }, [gameId]);

    if (!game) return <p>Selecione um Game para ver os detalhes.</p>;

    return (
        <div>
            <h1>{game.game_titulo} - {game.game_desenvolvedora} ({game.game_ano})</h1>
            <img src={game.game_capa} alt={game.game_titulo} width="300" />
            <h2>Personagens</h2>
            <ul>
                {game.personagens.map(personagem => (
                    <li key={personagem.personagem_id}>{personagem.personagem_nome}</li>
                ))}
            </ul>
        </div>
    );
};

export default GameDetail;
