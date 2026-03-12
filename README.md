# btg-fondos-angular
Aplicación web responsiva para que un usuario gestione fondos FPV/FIC de forma autónoma.

## BTG Pactual - Manejo de Fondos (FPV/FIC)
Aplicación web interactiva para:
- consultar fondos disponibles,
- suscribirse con validaciones de negocio,
- cancelar participaciones,
- revisar historial de transacciones.

Angular | TypeScript | Angular Material | json-server

## Características
### Funcionalidades principales
- Visualizar fondos disponibles (5 fondos FPV/FIC).
- Suscripción a fondos con validación de saldo y monto mínimo.
- Cancelación de participación con devolución de saldo.
- Historial de transacciones (suscripciones y cancelaciones).
- Selección de notificación en suscripción (Email o SMS).
- Mensajes de error claros en reglas de negocio (por ejemplo, saldo insuficiente).

### Características técnicas
- Diseño responsivo (desktop y mobile).
- Lazy loading de rutas y dialogs.
- Manejo de estado con Angular Signals.
- Formularios reactivos con validaciones.
- API REST simulada con `json-server`.
- Pruebas unitarias de servicio y componentes clave.

## Fondos disponibles
| ID | Nombre | Monto mínimo | Categoría |
|---|---|---:|---|
| 1 | FPV_BTG_PACTUAL_RECAUDADORA | COP 75.000 | FPV |
| 2 | FPV_BTG_PACTUAL_ECOPETROL | COP 125.000 | FPV |
| 3 | DEUDAPRIVADA | COP 50.000 | FIC |
| 4 | FDO-ACCIONES | COP 250.000 | FIC |
| 5 | FPV_BTG_PACTUAL_DINAMICA | COP 100.000 | FPV |

Nota: el usuario inicia con saldo de `COP 500.000`.

## Instalación y ejecución
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
npm run build   # Build de producción
npm run test    # Pruebas unitarias
```

## Pruebas
```bash
npm run test -- --watch=false
```

La suite cubre, entre otros:
- carga inicial de datos,
- validación de saldo insuficiente,
- suscripción y cancelación exitosas,
- dialogs de confirmación y validación,
- flujos principales de la pantalla de fondos.

## Estructura del proyecto
```text
src/app/
|- core/
|  |- models/
|  |  `- domain.ts
|  `- services/
|     `- portfolio.ts
|- features/
|  |- funds-page/
|  |  |- cancel-dialog/
|  |  |- subscribe-dialog/
|  |  `- funds-page.ts
|  `- transactions-page/
|     `- transactions-page.ts
`- shared/
   |- data-table/
   `- topbar/
```

## Tecnologías usadas
- Angular 21
- TypeScript
- RxJS
- Angular Signals
- Angular Material
- json-server
- Vitest (via Angular test builder)
