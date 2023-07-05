import React from "react";
import Footer from "../../components/Footer";
import About from "../../Sections/About";
import Features from "../../Sections/Features";
import Header from "../../Sections/Header";
import Partners from "../../Sections/Partners";
import Transectionomics from "../../Sections/Transectionomics";
import WorkFlow from "../../Sections/WorkFlow";

const Home = () => {
    return(
        <div className="App">
            <Header />
            <About />
            <Features />
            <Transectionomics />
            <WorkFlow />
            <Partners />
            <Footer />
        </div>
    )
}

export default Home;