import * as ReactDOM from "react-dom/client";
import HideButton from "./components/hide_button";

const addMask = (element: HTMLElement): void => {
    if (element.parentElement.tagName === 'BODY' || element.parentElement.tagName === 'HTML') {
        return
    }
    element.parentElement.style.position = 'relative'
    const mask = document.createElement("div") as HTMLElement ;
    mask.id = `adDestroyer-${Math.random()}`
    mask.style.cssText = "position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: clear; z-index: 999; cursor: pointer; pointer-events: none; border-radius: 10px;"
    element.parentElement.append(mask)
    mask.addEventListener('click', function(event) {
        mask.style.border = '2px solid #007AFF'
        const button = mask.firstChild as HTMLElement
        button.style.opacity = "1"
        button.style.pointerEvents = "auto"
    }, true);
    const didClick = () => {
        element.parentElement.classList.add('dust')
        element.parentElement.addEventListener('animationend', function() {
            element.parentElement.remove();
        }, { once: true });
    }
    const root = ReactDOM.createRoot(mask);
    root.render(HideButton({didClick}))
}

const scanDynmaicIFrame = (): void => {
    setInterval(() => {
        document.querySelectorAll('iframe').forEach(iframe => {
            const last = iframe.parentElement.lastChild as HTMLElement
            if (last.id && !last.id.includes('adDestroyer')) {
                addMask(iframe)
            }
        });
    }, 1000); 
}


window.addEventListener('DOMContentLoaded', scanDynmaicIFrame)



