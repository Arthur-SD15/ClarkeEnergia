import Header from "../components/Header/Header";
import ManegeSupplier from "../components/ManageSupplier/ManageSupplier";

const Manege = () => {
    return (
        <div className="flex flex-col min-h-screen bg-muted">
            <Header admin={true} />
            <ManegeSupplier />
        </div>
    )
}

export default Manege;
