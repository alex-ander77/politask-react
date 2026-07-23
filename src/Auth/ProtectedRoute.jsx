import { Navigate } from "react-router-dom";
import { authFirebase } from "../firebase";

function ProtectedRoute({ children }) {
const user = authFirebase.currentUser;

if (!user) {
    return <Navigate to="/login" replace />;
}
return children;
}

export default ProtectedRoute;