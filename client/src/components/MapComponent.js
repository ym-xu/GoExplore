import React, { useState } from 'react';

function ConversationComponent() {
    const [query, setQuery] = useState('');
    const [lat, setLat] = useState(34.663087);
    const [lon, setLon] = useState(135.5351935);
    const [conversationId, setConversationId] = useState('default');
    const [conversation, setConversation] = useState([]);

    const handleSendMessage = () => {
        fetch(`http://localhost:8000/api/places`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, lat, lon, conversation_id: conversationId }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setConversation([...conversation, { role: 'user', content: query }, { role: 'assistant', content: data.recommendation }]);
            setQuery('');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Enter your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
            <div>
                {conversation.map((msg, index) => (
                    <p key={index} className={msg.role}>{msg.content}</p>
                ))}
            </div>
        </div>
    );
}

export default ConversationComponent;