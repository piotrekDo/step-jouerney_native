import { create } from 'zustand';
import { AppUser } from '../model/AppUser';

interface AuthState {
  user: AppUser | undefined;
  setUser: (user: AppUser | undefined) => void;
}

const useAuthState = create<AuthState>(set => ({
  user: undefined,
  setUser: user => set({ user }),
}));

export default useAuthState;
