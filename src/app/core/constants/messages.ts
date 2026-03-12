export const APP_MESSAGES = {
  actions: {
    close: 'Cerrar',
    ok: 'OK'
  },
  errors: {
    loadInitialData: 'No fue posible cargar la información inicial.',
    alreadySubscribed: 'Ya te encuentras suscrito a este fondo.',
    insufficientBalance: 'No tiene saldo disponible para vincularse al fondo.',
    subscribeFailed: 'No fue posible completar la suscripción.',
    noActiveSubscription: 'No existe una suscripción activa para este fondo.',
    cancelFailed: 'No fue posible cancelar el fondo.'
  },
  success: {
    subscribe: (fundName: string) => `Suscripción exitosa a ${fundName}`,
    cancel: (fundName: string) => `Cancelación exitosa en ${fundName}`
  }
} as const;
