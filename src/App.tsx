import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Project from "./pages/Project";
import Contact from "./pages/Contact";
import AboutMe from "./pages/AboutMe";
import { ThemeProvider } from "./context/ThemeContext";
import AnimatedBackground from "./components/AnimatedBackground";

const App: React.FC = () => {
    return (
        
        <ThemeProvider>
            <AnimatedBackground />

            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Project />} />
                        <Route path="/contact" element={<Contact /> } />
                        <Route path="about" element={<AboutMe />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default App;
