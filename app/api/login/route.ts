// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username') ?? '';
    const password = searchParams.get('password') ?? '';
    const qs = new URLSearchParams({ username, password }).toString();

    // Pakai HTTP port 5152 (bukan 7152)
    const backendUrl = `http://localhost:5152/api/pengguna/login?${qs}`;
    console.log('Proxying to:', backendUrl);

    try {
        const res = await fetch(backendUrl, { method: 'GET' });
        const text = await res.text();
        return new NextResponse(text, {
            status: res.status,
            headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' },
        });
    } catch (e) {
        return NextResponse.json({ error: e.message, backendUrl }, { status: 502 });
    }
}
