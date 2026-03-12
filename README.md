# btg-fondos-angular
Aplicacion web responsiva para que un usuario gestione fondos FPV/FIC de forma autonoma.

## BTG Pactual - Manejo de Fondos (FPV/FIC)
Aplicacion web interactiva para:
- consultar fondos disponibles,
- suscribirse con validaciones de negocio,
- cancelar participaciones,
- revisar historial de transacciones.

Angular | TypeScript | Angular Material | json-server

## Caracteristicas
### Funcionalidades principales
- Visualizar fondos disponibles (5 fondos FPV/FIC).
- Suscripcion a fondos con validacion de saldo y monto minimo.
- Cancelacion de participacion con devolucion de saldo.
- Historial de transacciones (suscripciones y cancelaciones).
- Seleccion de notificacion en suscripcion (Email o SMS).
- Mensajes de error claros en reglas de negocio (por ejemplo, saldo insuficiente).

### Caracteristicas tecnicas
- Diseno responsivo (desktop y mobile).
- Lazy loading de rutas y dialogs.
- Manejo de estado con Angular Signals.
- Formularios reactivos con validaciones.
- API REST simulada con `json-server`.
- Pruebas unitarias de servicio y componentes clave.

## Instalacion y ejecucion
### Prerrequisitos
- Node.js 22+
- npm 10+

### Pasos
1. Clonar el repositorio:
```bash
git clone https://github.com/harold-alcazar/btg-fondos-angular.git
cd btg-fondos-angular
```

2. Instalar dependencias:
```bash
npm install
```

3. Ejecutar frontend + API mock:
```bash
npm run dev
```

Servicios:
- Frontend: `http://localhost:4200`
- API mock: `http://localhost:3001`

## Scripts
```bash
npm run start   # Solo Angular
npm run api     # Solo json-server
npm run dev     # Angular + json-server
npm run build   # Build de produccion
npm run test    # Pruebas unitarias
```

## Pruebas
```bash
npm run test -- --watch=false
```

La suite cubre, entre otros:
- carga inicial de datos,
- validacion de saldo insuficiente,
- suscripcion y cancelacion exitosas,
- dialogs de confirmacion y validacion,
- flujos principales de la pantalla de fondos.

## Estructura del proyecto
```text
src/app/
├── core/
│   ├── models/
│   │   └── domain.ts
│   └── services/
│       └── portfolio.ts
├── features/
│   ├── funds-page/
│   │   ├── cancel-dialog/
│   │   ├── subscribe-dialog/
│   │   └── funds-page.ts
│   └── transactions-page/
│       └── transactions-page.ts
└── shared/
    ├── data-table/
    └── topbar/
```

## Tecnologias usadas
- Angular 21
- TypeScript
- RxJS
- Angular Signals
- Angular Material
- json-server
- Vitest (via Angular test builder)
