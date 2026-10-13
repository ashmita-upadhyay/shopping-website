
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading, user } = useAuth();

  console.log("Auth loading:", loading);
  console.log("Current user:", user?.email);
  console.log("Is admin:", isAdmin);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  if (!isAdmin) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
