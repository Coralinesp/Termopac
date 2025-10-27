// app/api/inventory/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

// GET /api/inventory -> lista productos
export async function GET() {
  const { data, error } = await supabaseServer
    .from('products')
    .select('id, sku, description, price, stock')
    .order('sku', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data });
}

// POST /api/inventory -> crea/actualiza (upsert) producto
export async function POST(req: Request) {
  const body = await req.json();
  const { sku, description, price = 0, stock = 0 } = body ?? {};

  if (!sku || !description) {
    return NextResponse.json({ error: 'sku y description son requeridos' }, { status: 400 });
  }

  const { data, error } = await supabaseServer
    .from('products')
    .upsert({ sku, description, price, stock }, { onConflict: 'sku' })
    .select('id, sku, description, price, stock')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data }, { status: 201 });
}
