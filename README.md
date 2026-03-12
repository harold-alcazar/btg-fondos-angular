# Prueba Técnica Frontend BTG - Angular

Aplicación web para gestión de fondos (FPV/FIC) con:

- Visualización de fondos disponibles.
- Suscripción a fondo con validación de saldo.
- Cancelación de participación y saldo actualizado.
- Historial de transacciones.
- Selección de método de notificación (`email` o `sms`) en suscripción.

## Stack

- Angular CLI `21.2.2`
- Angular `21.x`
- Angular Material
- json-server (API mock)

## Requisitos

- Node.js `22.x` (en este entorno: `v22.14.0`)
- npm `10.x`

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

Levantar frontend + API mock al mismo tiempo:

```bash
npm run dev
```

Servicios:

- Frontend: `http://localhost:4200`
- API mock: `http://localhost:3001`

## Scripts útiles

```bash
npm run start   # Solo Angular
npm run api     # Solo json-server
npm run build   # Build producción
npm run test    # Unit tests
```

## Datos de prueba

`db.json` incluye:

- Usuario único con saldo inicial `COP 500000`.
- 5 fondos definidos en el enunciado.
- Colecciones `positions` y `transactions` para operaciones.
