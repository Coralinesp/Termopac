// app/api/inventory/[sku]/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

type Params = { params: { sku: string } };

// PATCH /api/inventory/:sku -> cambia stock o datos
export async function PATCH(req: Request, { params }: Params) {
  const { sku } = params;
  const body = await req.json();
  const patch: Record<string, unknown> = {};
  if (typeof body.stock === 'number') patch.stock = body.stock;
  if (typeof body.description === 'string') patch.description = body.description;
  if (typeof body.price === 'number') patch.price = body.price;

  if (!Object.keys(patch).length)
    return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 });

  const { data, error } = await supabaseServer
    .from('products')
    .update(patch)
    .eq('sku', sku)
    .select('id, sku, description, price, stock')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ item: data });
}
