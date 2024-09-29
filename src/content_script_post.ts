import { enableMessage, notenableMessage } from "./constants";

const addDustAnimationStyle = () => {
    const style = document.createElement('style')
    style.innerHTML = `
        .dust {
            animation: dust 0.6s forwards;
        }

        @keyframes dust {
            100% {
                transform: translateY(-200px) rotate(10deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style)
}

type BackgroundEvent = {
    message: string
    sendResponse: (response?: any) => void
}

const handleActionFromBackground = (event: BackgroundEvent) => {
    if (event.message === enableMessage) {
        document.querySelectorAll('[id^="adDestroyer-"]').forEach(mask => {
            const element = mask as HTMLElement
            element.style.pointerEvents = 'auto'
            element.style.border = 'none'
        });
    } else if (event.message === notenableMessage) {
        document.querySelectorAll('[id^="adDestroyer-"]').forEach(mask => {
            const element = mask as HTMLElement
            element.style.pointerEvents = 'none'
            element.style.border = 'none'
            const button = element.firstChild as HTMLElement
            button.style.opacity = "0"
            button.style.pointerEvents = "none"
        });
    }
    event.sendResponse('ok')
}

addDustAnimationStyle()
chrome.runtime.onMessage.addListener(handleActionFromBackground)