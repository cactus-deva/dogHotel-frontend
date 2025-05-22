import Header from "../components/Header";
import { LoadingProvider } from "../context/LoadingContext";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";


export default function MainLayout() {
    return (
        <>
        <Header />
        <LoadingProvider>
            <Outlet />
        </LoadingProvider>
        <Footer />
        </>
    )
}