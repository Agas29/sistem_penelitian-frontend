'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginResult = {
    nama: string;
    password: string;
    peran: string;
};

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState<LoginResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);

        const params = new URLSearchParams({ username, password }).toString();
        const url = `/api/login?${params}`;

        try {
            const res = await fetch(url, { method: 'GET' });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `HTTP ${res.status}`);
            }
            const data: LoginResult = await res.json();
            setResult(data);

            // Simpan data ke localStorage (opsional)
            localStorage.setItem('user', JSON.stringify(data));

            // Redirect ke dashboard setelah 1 detik
            setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
        } catch (err) {
            setError(err.message ?? 'Login gagal');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f5f5f5', padding: '20px' }}>
            <div style={{ width: '100%', maxWidth: '400px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '40px' }}>
                <h1 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '8px', color: '#222' }}>Login</h1>
                <p style={{ fontSize: '14px', color: '#666', textAlign: 'center', marginBottom: '32px' }}>Masukkan kredensial Anda</p>

                <form onSubmit={onSubmit} style={{ display: 'grid', gap: '16px' }}>
                    <div style={{ display: 'grid', gap: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan username"
                            required
                            style={{ padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = '#4F8EF3')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#ddd')}
                        />
                    </div>

                    <div style={{ display: 'grid', gap: '6px' }}>
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#333' }}>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            type="password"
                            required
                            style={{ padding: '10px 14px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', outline: 'none' }}
                            onFocus={(e) => (e.currentTarget.style.borderColor = '#4F8EF3')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#ddd')}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{ padding: '10px', background: loading ? '#bbb' : '#4F8EF3', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px' }}
                    >
                        {loading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>

                {error && <div style={{ marginTop: '16px', padding: '12px', background: '#fee', border: '1px solid #fcc', borderRadius: '8px', color: '#c33', fontSize: '13px' }}>{error}</div>}

                {result && (
                    <div style={{ marginTop: '16px', padding: '16px', background: '#efe', border: '1px solid #cfc', borderRadius: '8px' }}>
                        <div style={{ color: '#3a3', fontWeight: '600', marginBottom: '12px', fontSize: '13px' }}>Login berhasil! Redirecting...</div>
                        <div style={{ display: 'grid', gap: '8px', fontSize: '13px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
                                <span style={{ color: '#666' }}>Nama:</span>
                                <span style={{ fontWeight: '500', color: '#222' }}>{result.nama}</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
                                <span style={{ color: '#666' }}>Password:</span>
                                <span style={{ fontWeight: '500', color: '#222' }}>****</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr' }}>
                                <span style={{ color: '#666' }}>Peran:</span>
                                <span style={{ fontWeight: '600', background: '#e8f0fe', color: '#1967D2', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', width: 'fit-content' }}>{result.peran}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
