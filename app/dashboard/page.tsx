'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type User = {
    nama: string;
    password: string;
    peran: string;
};

export default function Dashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (!userData) {
            router.push('/');
        } else {
            try {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } catch (e) {
                router.push('/');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!user) {
        return null;
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', padding: '2px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: '0 30px', fontSize: '24px', fontWeight: '600', color: '#222' }}>
                    {user.nama}
                </h3>
                <h3 style={{ margin: '0 30px', fontSize: '24px', fontWeight: '600', color: '#222', padding: '8px 16px', borderRadius: '8px' }}>
                    {user.peran}
                </h3>
            </div>

            <div style={{ flex: 1, background: '#fff', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '32px', color: '#222' }}>Dashboard</h2>

                <div style={{ marginTop: 'auto' }}>
                    <button
                        onClick={handleLogout}
                        style={{ padding: '10px 24px', background: '#f44', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
