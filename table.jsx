import './table.css'; 
import React, { useState } from 'react';

function Table() {
    const initialPlayers = [
        { key: '1', No: '1', name: 'maxKINGxLIVE' },
       
    ];

    const [data, setData] = useState(initialPlayers);  
    const [matchups, setMatchups] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 
    const [newPlayerName, setNewPlayerName] = useState(''); 
    const [editPlayerKey, setEditPlayerKey] = useState(null); 
    const [editPlayerName, setEditPlayerName] = useState(''); 

    const generateMatchups = () => {
        const shuffledPlayers = [...data].sort(() => Math.random() - 0.5); 
        const newMatchups = [];

        for (let i = 0; i < shuffledPlayers.length - 1; i += 2) {
            newMatchups.push({ player1: shuffledPlayers[i].name, player2: shuffledPlayers[i + 1].name });
        }

        setMatchups(newMatchups); 
    };

    const addPlayer = () => {
        if (newPlayerName.trim()) {
            const newPlayer = {
                key: (data.length + 1).toString(),
                No: (data.length + 1).toString(),
                name: newPlayerName,
            };
            setData([...data, newPlayer]);
            setNewPlayerName('');
        }
    };

    const deletePlayer = (key) => {
        const filteredPlayers = data.filter(player => player.key !== key);
        setData(filteredPlayers);
    };

    const startEdit = (player) => {
        setEditPlayerKey(player.key);
        setEditPlayerName(player.name);
    };

    const saveEdit = () => {
        const updatedPlayers = data.map(player => 
            player.key === editPlayerKey ? { ...player, name: editPlayerName } : player
        );
        setData(updatedPlayers);
        setEditPlayerKey(null);
        setEditPlayerName('');
    };

    const filteredPlayers = data.filter(player => player.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            <div className="table-container">
                <h1 className="tournament-title">maxPOWER esports TOURNAMENT</h1>
                <h1 className="matchup-title">Matchups</h1>

                <input
                    type="text"
                    placeholder="Search Players"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                {/* Add Player Input */}
                <div className="add-player-container">
                    <input
                        type="text"
                        placeholder="Add New Player"
                        value={newPlayerName}
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        className="add-player-input"
                    />
                    <button onClick={addPlayer} className="add-player-button">Add Player</button>
                </div>

                <table className="players-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlayers.map((player) => (
                            <tr key={player.key}>
                                <td>{player.No}</td>
                                <td>
                                    {editPlayerKey === player.key ? (
                                        <input
                                            type="text"
                                            value={editPlayerName}
                                            onChange={(e) => setEditPlayerName(e.target.value)}
                                            className="edit-input"
                                        />
                                    ) : (
                                        player.name
                                    )}
                                </td>
                                <td>
                                    {editPlayerKey === player.key ? (
                                        <>
                                            <button onClick={saveEdit} className="save-button">Save</button>
                                            <button onClick={() => setEditPlayerKey(null)} className="cancel-button">Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => startEdit(player)} className="edit-button">Edit</button>
                                            <button onClick={() => deletePlayer(player.key)} className="delete-button">Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <button onClick={generateMatchups} className="generate-button">Generate Random Matchups</button>
                </div>

                <div className="matchups-container">
                    {matchups.length > 0 ? (
                        <div className="matchup-list">
                            {matchups.map((matchup, index) => (
                                <div key={index} className="matchup">
                                    <div className="combatants">
                                        <div className="player player1">{matchup.player1}</div>
                                        <div className="vs">vs</div>
                                        <div className="player player2">{matchup.player2}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-matchups">No matchups generated yet.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Table;
