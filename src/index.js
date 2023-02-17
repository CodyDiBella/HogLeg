import React from "react";
import { createRoot } from "react-dom/client";
import {Main} from "./components";
import ReactDOM from 'react-dom';

window.addEventListener("mousemove", e => {
        cursor.style.top = e.pageY + "px"
        cursor.style.left = e.pageX + "px"
    })

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
        <Main />
)
