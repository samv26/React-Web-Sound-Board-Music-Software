import { useEffect,useMemo } from "react";

/**
 * Header Component: Displays the header section.
 */
const Header = ({canReturn}) => {
  console.log("canReturn",canReturn);
  const isHomeScreen = useMemo(() => {
    if (canReturn) {
      return (
        <h2>
          <a href="/" className="header-icon-link">
            ←
          </a>
        </h2>
      );
    } else {
      return <></>;
    }
  }, [canReturn]);
  return (
    <header>
      <div>
        <meta charSet="UTF-8"></meta>
        <title>SongTrax - Starter Style Guide - Header and Footer</title>
        <link rel="stylesheet" href="starterstyles.css"></link>
      </div>
      
      <div>
       
        <header className="page-header">
           {isHomeScreen}
          <div className="header-logo">
            <h2>
              <a href="/" className="header-icon-link">
                OgCiSum
              </a>
            </h2>
          </div>
          <div className="header-app-description">
            <span>Create & Share Location Based Music Samples!</span>
          </div>
        </header>
      </div>
    </header>
  );
};

export default Header;
