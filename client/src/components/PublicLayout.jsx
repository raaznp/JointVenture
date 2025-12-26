import PublicNavbar from './PublicNavbar';
import PublicFooter from './PublicFooter';

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
            <PublicNavbar />
            <main className="flex-grow pt-16">
                {children}
            </main>
            <PublicFooter />
        </div>
    );
};

export default PublicLayout;
