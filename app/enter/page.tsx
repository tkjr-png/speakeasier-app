'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EnterPage() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/auth/enter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: code.trim() }),
    });

    if (res.ok) {
      router.replace('/');
    } else {
      setError('Wrong code. Try again.');
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100dvh',
      background: 'var(--bg, #1a1a18)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '2.25rem',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#f5f0e8',
          margin: 0,
          letterSpacing: '0.01em',
        }}>
          Speakeasier
        </h1>
        <p style={{
          color: '#888',
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>
          Private beta — enter your invite code
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '320px' }}>
        <input
          type="text"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="invite code"
          autoFocus
          autoComplete="off"
          autoCapitalize="none"
          style={{
            width: '100%',
            background: '#2a2a26',
            border: '1px solid #3a3a36',
            borderRadius: '2px',
            color: '#f5f0e8',
            fontSize: '1rem',
            padding: '0.875rem 1rem',
            outline: 'none',
            boxSizing: 'border-box',
            letterSpacing: '0.1em',
            textAlign: 'center',
          }}
        />

        {error && (
          <p style={{
            color: '#c0392b',
            fontSize: '0.8rem',
            textAlign: 'center',
            marginTop: '0.75rem',
            marginBottom: 0,
          }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!code.trim() || loading}
          style={{
            width: '100%',
            marginTop: '1rem',
            padding: '0.875rem',
            background: loading || !code.trim() ? '#3a3a36' : '#c8773a',
            color: '#f5f0e8',
            border: 'none',
            borderRadius: '2px',
            fontSize: '0.875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}
        >
          {loading ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
