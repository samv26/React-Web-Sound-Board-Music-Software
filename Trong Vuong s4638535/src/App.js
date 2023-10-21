import React from "react";
import { BrowserRouter as Router, Route, Routes,useLocation} from "react-router-dom";
import Header from "./components/Header";
import Homepage1 from "./components/Homepage1";
import "./App.css"; // Add your CSS styles here
import CreateSong from "./components/createSong";
import  Share  from "./components/SharePage";
import { toneObject, toneTransport, tonePart } from "./music/playNotes";
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}


//this component refreshes the header when location changes
function AppContent() {
  const location = useLocation(); // Get the current location

  // Determine whether to show the return button in the header
  const canReturn = location.pathname !== "/";
  return (
    <div className="App">
      <Header canReturn={canReturn} /> {/* Render the header */}
      <div className="main-body">
        <h2 className="title">My Songs Selection</h2>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Homepage1 />} />
          <Route
            path="/createSong/:id"
            element={
              <CreateSong tO={toneObject} tT={toneTransport} tP={tonePart} />
            }
          />
          <Route path="/share/:id" element={<Share />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
