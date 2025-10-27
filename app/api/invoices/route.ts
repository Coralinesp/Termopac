// app/api/invoices/route.ts
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';
import { CrearFacturaSchema } from '@/lib/validators';

// GET /api/invoices -> lista últimas 50
export async function GET() {
  const { data, error } = await supabaseServer
    .from('invoices')
    .select('id, customer, fecha, total, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ facturas: data });
}

// POST /api/invoices -> crea factura y rebaja stock via trigger
export async function POST(req: Request) {
  const json = await req.json();
  const parse = CrearFacturaSchema.safeParse(json);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.flatten() }, { status: 400 });
  }

  const { cliente, fecha, articulos } = parse.data;

  // Adaptar items al JSONB que consume la función SQL
  const items = articulos.map(a => ({
    sku: a.sku,
    cantidad: a.cantidad,
    precioUnitario: a.precioUnitario,
  }));

  const { data, error } = await supabaseServer
    .rpc('create_invoice', {
      p_customer: cliente,
      p_fecha: fecha,
      p_items: items,
    });

  if (error) {
    // Mensajes de error del trigger/SQL llegan aquí
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Devuelve ID de la nueva factura
  return NextResponse.json({ id: data }, { status: 201 });
}
