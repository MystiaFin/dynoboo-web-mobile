import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Update the User interface to match the actual structure from your API
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
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch user data on initial load
  useEffect(() => {
    const fetchUser = async () => {
      console.log("🔍 Fetching user data...");
      try {
        console.log(
          `🌐 Fetching from: ${import.meta.env.VITE_API_BASE_URL}/api/users/me`,
        );

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/me`,
          {
            method: "GET",
            credentials: "include", // Important for sending cookies
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        console.log("📡 Response status:", res.status);

        if (res.ok) {
          const data = await res.json();
          console.log("✅ User data received:", data);

          // Handle different response formats - the API might return either
          // { user: {...} } or directly the user object
          if (data && data.user) {
            setUser(data.user);
          } else if (data && data.id && data.email) {
            // The API is returning the user object directly
            setUser(data);
          } else {
            console.error("❌ Invalid data structure:", data);
            setUser(null);
          }
        } else {
          console.error("❌ Failed to fetch user:", await res.text());
          setUser(null);
        }
      } catch (error) {
        console.error("💥 Error fetching user:", error);
        setUser(null);
      } finally {
        console.log("🏁 Auth loading complete");
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Logout function
  const logout = async () => {
    console.log("🚪 Logging out...");
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
        },
      );

      console.log("📡 Logout response status:", res.status);

      if (res.ok) {
        console.log("✅ Logout successful");
        setUser(null);
        window.location.href = "/login";
      } else {
        console.error("❌ Logout failed:", await res.text());
      }
    } catch (error) {
      console.error("💥 Logout error:", error);
    }
  };

  // Debug current auth state
  useEffect(() => {
    console.log("🔐 Current auth state:", { user, loading });
  }, [user, loading]);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
