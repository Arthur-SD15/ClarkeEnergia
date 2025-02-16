import Header from "../components/Header/Header";
import SearchSupplier from "../components/SearchSupplier/SearchSupplier";

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-muted">
            <Header />
            <SearchSupplier />
        </div>
    );
};

export default Home;