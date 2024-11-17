import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      // Iniciar sesión y establecer usuario
      login: (user, token) => {
        set({ user, token, isAuthenticated: true });
      },

      // Cerrar sesión y limpiar estado
      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      // Verificar si el token es válido
      verifyToken: () => {
        const { token } = get();
        if (token) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
