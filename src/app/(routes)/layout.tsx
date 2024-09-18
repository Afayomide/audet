import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

export default function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            <div className="contents">
                        {children}
    
            </div>
            <Footer />
        </div>
    );
}