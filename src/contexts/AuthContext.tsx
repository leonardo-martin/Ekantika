import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/api";

export type TUser = {
  id: string;
  name: string;
  email: string;
  perfil_type: string;
  slug_perfil: string;
  company_id?: string;
  photo?: string;
};

type AuthState = {
  token: string;
  user: TUser;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type FirstSignInCredentials = {
  user_id: string;
  email: string;
  password: string;
};

type SignInReturnProps = {
  firstLogin: boolean;
  userId?: string;
};

type AuthContextData = {
  user: TUser;
  signIn(credentials: SignInCredentials): Promise<SignInReturnProps>;
  firstSignIn(credentials: FirstSignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: TUser, token?: string): void;
  validateToken(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@Ekantika:token");
    const user = localStorage.getItem("@Ekantika:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(
    async ({ email, password }): Promise<SignInReturnProps> => {
      const response = await api.post("auth/login", {
        email,
        password,
      });

      const { token, payload: user } = response.data;

      if (!user) throw new Error("E-mail ou Password invalido.");
      if (token === "Redirect") {
        return { firstLogin: true, userId: user.id };
      }

      localStorage.setItem("@Ekantika:token", token);
      localStorage.setItem("@Ekantika:user", JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
      return { firstLogin: false };
    },
    []
  );

  const firstSignIn = useCallback(
    async ({ email, user_id, password }): Promise<void> => {
      const response = await api.post("auth/firstAccess", {
        user_id,
        email,
        password,
      });

      const { token, payload: user } = response.data;

      if (!user) throw new Error("E-mail ou Password invalido.");

      if (user.error) throw new Error(user.error_mensagem);

      localStorage.setItem("@Ekantika:token", token);
      localStorage.setItem("@Ekantika:user", JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      setData({ token, user });
    },
    []
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@Ekantika:token");
    localStorage.removeItem("@Ekantika:user");

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (newUser: TUser, token?: string) => {
      const userStr = localStorage.getItem("@Ekantika:user");
      let user: TUser = {} as TUser;

      if (userStr) user = JSON.parse(userStr);

      const updatedUser = { ...user, ...newUser };

      localStorage.setItem("@Ekantika:user", JSON.stringify(updatedUser));

      if (token) {
        localStorage.setItem("@Ekantika:token", token);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({
          token: token,
          user: updatedUser,
        });
      } else {
        setData({
          token: data.token,
          user: updatedUser,
        });
      }
    },
    [setData, data.token]
  );

  const validateToken = useCallback(async () => {
    const response = await api.post("auth/token", {
      token: data.token,
    });

    if (!response.data.success) {
      signOut();
    }
  }, [data.token, signOut]);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        firstSignIn,
        signOut,
        updateUser,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export default AuthProvider;
