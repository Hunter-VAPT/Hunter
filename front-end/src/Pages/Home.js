import NBar from "../components/NBar"
import "./HomeStyles.css";
import Logo from "../components/Assets/HunterLogo.png";
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/scan');
    };

    const customIconSize = {
        width: '25rem', // You can adjust the size here as needed
        height: '25rem', // You can adjust the size here as needed
    };

    return (
        <>
            <div className="home">
                <NBar />

                <div className="bg-white h-screen flex items-center justify-center">
                    <div className="text-center">
                        <img
                            src={Logo}
                            alt="Hunter Icon"
                            style={customIconSize}
                            className="mx-auto mb-4"
                        />
                        <h1 className="text-4xl font-semibold text-black mt-4">Secure Your Network</h1>
                        <p style={{ fontSize: '1.25rem' }} className="text-lg text-gray-600 mt-2">Discover open ports and vulnerable services with the complete ability to filter scans.</p>
                        <button onClick={handleClick} style={{ fontSize: '1.25rem', padding: '0.75rem 1.5rem' }} className="mt-6 bg-black hover:bg-blue-700 transition-all duration-200 ease-in-out text-white font-bold rounded">
                            Scan Now
                        </button>

                    </div>
                </div>
            </div>

        </>
    )
}
export default Home;