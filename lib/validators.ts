// /lib/validators.ts
import { z } from 'zod';

export const ItemFacturaSchema = z.object({
  sku: z.string().min(1),
  descripcion: z.string().min(1).optional(), // opcional
  cantidad: z.number().int().positive(),
  precioUnitario: z.number().nonnegative(),
});

export const CrearFacturaSchema = z.object({
  cliente: z.string().min(1),
  fecha: z.string().min(1), // 'YYYY-MM-DD'
  articulos: z.array(ItemFacturaSchema).min(1),
});
