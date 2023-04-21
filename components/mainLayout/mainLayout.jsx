import Footer from "./footer";
import Header from "./header";

export default function MainLayout({children}) {
    return(
        <>
            <Header />
            <div className="flex min-h-screen items-center justify-center">
                {children}
            </div>
            <Footer />
        </>
    );
}