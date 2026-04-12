export const globeStyles = `
body {
    margin: 0;
    background-color: rgb(30, 30, 30);
    overflow: hidden;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
}

#mainContainer {
    position: relative;
    width: 100vw;
    height: 100vh;
}

#globeViz {
    width: 100vw;
    height: 100vh;
}

#myParagraph {
    margin: 0;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    color: black;
    word-wrap: break-word;
}

#controlsBtn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 999;
    width: 100px;
    height: 50px;
    background-color: black;
    color: beige;
    font-size: 16px;
    letter-spacing: 0.5px;
    border: 1px solid beige;
    border-radius: 8px;
    opacity: 0.5;
}
`;