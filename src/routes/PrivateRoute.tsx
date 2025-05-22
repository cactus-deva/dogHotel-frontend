import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function PrivateRoute({ children }: { children: ReactNode }) {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if(!token) {
            navigate("/login")
        }
    },[token, navigate])

    return <>{children}</>
}