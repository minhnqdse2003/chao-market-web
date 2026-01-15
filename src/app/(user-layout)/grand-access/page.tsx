'use client';
import { useState } from 'react';

export default function DriveDemo() {
    const [status, setStatus] = useState('Idle');
    const targetEmail = 'minhnqdse2003@gmail.com';

    const handleAccess = async action => {
        setStatus(`Processing ${action}...`);
        try {
            const res = await fetch('/api/drive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: targetEmail, action }),
            });
            const data = await res.json();
            setStatus(data.message || data.error);
        } catch (err) {
            setStatus('Error: ' + err.message);
        }
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
            <h1>Google Drive Access Demo</h1>
            <p>
                Target User: <strong>{targetEmail}</strong>
            </p>

            <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
                <button
                    onClick={() => handleAccess('add')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#22c55e',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Grant Access (Reader)
                </button>

                <button
                    onClick={() => handleAccess('remove')}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Remove Access
                </button>
            </div>

            <div
                style={{
                    marginTop: '20px',
                    padding: '10px',
                    border: '1px solid #ccc',
                }}
            >
                <strong>Status:</strong> {status}
            </div>
        </div>
    );
}
