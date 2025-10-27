"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type View = "menu" | "facturacion" | "inventario"

interface ArticuloFactura {
  id: string
  sku: string
  descripcion: string
  cantidad: number
  precioUnitario: number
}

interface Factura {
  id: string
  cliente: string
  fecha: string
  articulos: ArticuloFactura[]
  total: number
}

interface ItemInventario {
  sku: string
  descripcion: string
  cantidadDisponible: number
}

export default function TermopacIntegration() {
  const [view, setView] = useState<View>("menu")
  const [cliente, setCliente] = useState("")
  const [fecha, setFecha] = useState("")
  const [articulos, setArticulos] = useState<ArticuloFactura[]>([])

  const [facturas, setFacturas] = useState<Factura[]>([
    {
      id: "1",
      cliente: "Cliente Demo A",
      fecha: "2025-01-15",
      articulos: [{ id: "1", sku: "SKU001", descripcion: "Producto A", cantidad: 10, precioUnitario: 25.5 }],
      total: 255.0,
    },
    {
      id: "2",
      cliente: "Cliente Demo B",
      fecha: "2025-01-20",
      articulos: [{ id: "2", sku: "SKU002", descripcion: "Producto B", cantidad: 5, precioUnitario: 40.0 }],
      total: 200.0,
    },
  ])

  const [inventario, setInventario] = useState<ItemInventario[]>([
    { sku: "SKU001", descripcion: "Producto A", cantidadDisponible: 100 },
    { sku: "SKU002", descripcion: "Producto B", cantidadDisponible: 50 },
    { sku: "SKU003", descripcion: "Producto C", cantidadDisponible: 75 },
  ])

  const [nuevoArticulo, setNuevoArticulo] = useState({
    sku: "",
    descripcion: "",
    cantidad: 0,
    precioUnitario: 0,
  })

  const agregarArticulo = () => {
    if (nuevoArticulo.sku && nuevoArticulo.descripcion) {
      setArticulos([...articulos, { ...nuevoArticulo, id: Date.now().toString() }])
      setNuevoArticulo({ sku: "", descripcion: "", cantidad: 0, precioUnitario: 0 })
    }
  }

  const registrarFactura = () => {
    const total = articulos.reduce((sum, art) => sum + art.cantidad * art.precioUnitario, 0)
    const nuevaFactura: Factura = {
      id: Date.now().toString(),
      cliente,
      fecha,
      articulos: [...articulos],
      total,
    }
    setFacturas([nuevaFactura, ...facturas])
    alert(`Factura registrada para ${cliente}`)
    setCliente("")
    setFecha("")
    setArticulos([])
  }

  const actualizarInventario = () => {
    alert("Inventario actualizado")
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b-4 border-blue-600 bg-blue-600">
        <div className="mx-auto max-w-7xl px-8 py-8">
          <h1 className="text-4xl font-bold tracking-tight text-white">TERMOPAC</h1>
          <p className="mt-1 text-sm font-medium tracking-wide text-blue-100">Sistema de Integración</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl p-8">
        {view === "menu" && (
          <div className="mx-auto max-w-5xl pt-16">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-900">Seleccione un Módulo</h2>
            <div className="grid grid-cols-2 gap-6">
              <Button
                onClick={() => setView("facturacion")}
                className="h-56 border-2 border-blue-600 bg-white text-2xl font-bold tracking-tight text-blue-600 shadow-lg transition-all hover:bg-blue-600 hover:text-white hover:shadow-xl"
              >
                FACTURACIÓN
              </Button>
              <Button
                onClick={() => setView("inventario")}
                className="h-56 border-2 border-blue-600 bg-white text-2xl font-bold tracking-tight text-blue-600 shadow-lg transition-all hover:bg-blue-600 hover:text-white hover:shadow-xl"
              >
                INVENTARIO
              </Button>
            </div>
          </div>
        )}

        {view === "facturacion" && (
          <div>
            <div className="mb-8 flex items-center justify-between border-b-2 border-gray-200 pb-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">Facturación</h2>
                <p className="mt-1 text-sm font-medium text-gray-500">Gestión de facturas y ventas</p>
              </div>
              <Button
                onClick={() => setView("menu")}
                className="border-2 border-gray-300 bg-white px-6 py-2.5 font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50"
              >
                ← Volver
              </Button>
            </div>

            <div className="mb-10">
              <h3 className="mb-4 text-xl font-bold tracking-tight text-gray-900">Facturas Registradas</h3>
              <div className="overflow-hidden border-2 border-gray-200 bg-white shadow-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-blue-600">
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                        Cliente
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                        Fecha
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                        Artículos
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-white">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {facturas.map((factura) => (
                      <tr key={factura.id} className="transition-colors hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{factura.id}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{factura.cliente}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{factura.fecha}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{factura.articulos.length}</td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                          ${factura.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-2 border-gray-200 bg-white p-8 shadow-md">
              <h3 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Nueva Factura</h3>

              {/* Formulario Cliente y Fecha */}
              <div className="mb-8 grid grid-cols-2 gap-6">
                <div>
                  <Label
                    htmlFor="cliente"
                    className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-700"
                  >
                    Cliente
                  </Label>
                  <Input
                    id="cliente"
                    value={cliente}
                    onChange={(e) => setCliente(e.target.value)}
                    className="border-2 border-gray-300 font-medium focus:border-blue-600"
                    placeholder="Nombre del cliente"
                  />
                </div>
                <div>
                  <Label htmlFor="fecha" className="mb-2 block text-sm font-bold uppercase tracking-wide text-gray-700">
                    Fecha
                  </Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="border-2 border-gray-300 font-medium focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Agregar Artículos */}
              <div className="mb-8 border-t-2 border-gray-200 pt-8">
                <h4 className="mb-4 text-lg font-bold tracking-tight text-gray-900">Agregar Artículo</h4>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <Label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">SKU</Label>
                    <Input
                      value={nuevoArticulo.sku}
                      onChange={(e) => setNuevoArticulo({ ...nuevoArticulo, sku: e.target.value })}
                      className="border-2 border-gray-300 font-medium focus:border-blue-600"
                      placeholder="SKU001"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Descripción
                    </Label>
                    <Input
                      value={nuevoArticulo.descripcion}
                      onChange={(e) => setNuevoArticulo({ ...nuevoArticulo, descripcion: e.target.value })}
                      className="border-2 border-gray-300 font-medium focus:border-blue-600"
                      placeholder="Nombre del producto"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Cantidad
                    </Label>
                    <Input
                      type="number"
                      value={nuevoArticulo.cantidad}
                      onChange={(e) =>
                        setNuevoArticulo({
                          ...nuevoArticulo,
                          cantidad: Number(e.target.value),
                        })
                      }
                      className="border-2 border-gray-300 font-medium focus:border-blue-600"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                      Precio Unit.
                    </Label>
                    <Input
                      type="number"
                      value={nuevoArticulo.precioUnitario}
                      onChange={(e) =>
                        setNuevoArticulo({
                          ...nuevoArticulo,
                          precioUnitario: Number(e.target.value),
                        })
                      }
                      className="border-2 border-gray-300 font-medium focus:border-blue-600"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <Button
                  onClick={agregarArticulo}
                  className="mt-4 border-2 border-blue-600 bg-blue-600 px-6 py-2.5 font-bold text-white transition-all hover:bg-blue-700"
                >
                  + Agregar Artículo
                </Button>
              </div>

              {/* Tabla de Artículos de la factura actual */}
              {articulos.length > 0 && (
                <div className="mb-8">
                  <h4 className="mb-3 text-lg font-bold tracking-tight text-gray-900">Artículos en esta factura</h4>
                  <div className="overflow-hidden border-2 border-gray-200">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b-2 border-gray-200 bg-gray-100">
                          <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                            SKU
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                            Descripción
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-700">
                            Cantidad
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                            Precio Unit.
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-wider text-gray-700">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {articulos.map((articulo) => (
                          <tr key={articulo.id} className="transition-colors hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-semibold text-gray-900">{articulo.sku}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{articulo.descripcion}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{articulo.cantidad}</td>
                            <td className="px-4 py-3 text-right text-sm text-gray-600">
                              ${articulo.precioUnitario.toFixed(2)}
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                              ${(articulo.cantidad * articulo.precioUnitario).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <Button
                onClick={registrarFactura}
                disabled={!cliente || !fecha || articulos.length === 0}
                className="w-full border-2 border-blue-600 bg-blue-600 py-4 text-lg font-bold tracking-tight text-white transition-all hover:bg-blue-700 disabled:border-gray-300 disabled:bg-gray-300"
              >
                REGISTRAR FACTURA
              </Button>
            </div>
          </div>
        )}

        {view === "inventario" && (
          <div>
            <div className="mb-8 flex items-center justify-between border-b-2 border-gray-200 pb-6">
              <div>
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">Inventario</h2>
                <p className="mt-1 text-sm font-medium text-gray-500">Gestión de stock y productos</p>
              </div>
              <Button
                onClick={() => setView("menu")}
                className="border-2 border-gray-300 bg-white px-6 py-2.5 font-semibold text-gray-700 shadow-sm transition-all hover:border-gray-400 hover:bg-gray-50"
              >
                ← Volver
              </Button>
            </div>

            <div className="mb-10">
              <h3 className="mb-4 text-xl font-bold tracking-tight text-gray-900">Stock Actual</h3>
              <div className="overflow-hidden border-2 border-gray-200 bg-white shadow-md">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-blue-600">
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">SKU</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-white">
                        Descripción
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-white">
                        Cantidad Disponible
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {inventario.map((item) => (
                      <tr key={item.sku} className="transition-colors hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.sku}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.descripcion}</td>
                        <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                          {item.cantidadDisponible}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-2 border-gray-200 bg-white p-8 shadow-md">
              <h3 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">Actualizar Inventario</h3>
              <p className="mb-6 text-sm font-medium text-gray-600">
                Seleccione un producto y actualice su cantidad disponible
              </p>
              <Button
                onClick={actualizarInventario}
                className="border-2 border-blue-600 bg-blue-600 px-8 py-4 text-lg font-bold tracking-tight text-white transition-all hover:bg-blue-700"
              >
                ACTUALIZAR INVENTARIO
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
