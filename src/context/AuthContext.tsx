import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: number | string;
  email: string;
  name: string | null;
  createdAt?: string;
  updatedAt?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: async () => {},
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/me`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        setUser(null);
        return;
      }

      const data = await res.json();

      // Handle different response formats
      if (data && data.user) {
        setUser(data.user);
      } else if (data && data.id && data.email) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data on initial load
  useEffect(() => {
    refreshUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (res.ok) {
        setUser(null);
        window.location.href = "/login";
      }
    } catch (error) {
      // Silent fail - user will see they're still logged in
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
