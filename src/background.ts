import { storageKey, enableMessage, notenableMessage } from "./constants";

type DestoryerConfig = {
    enable: boolean
}

type LocalStorage = {
    [storageKey]: DestoryerConfig
}

type TabInfo = {
    id?: number
    tabId?: number
}

const handleExtensionAction = (tab: TabInfo) => {
    chrome.storage.local.get([storageKey]).then((value) => {
        const storage = value as LocalStorage
        let enable = false
        if (storage[storageKey]) {
            enable = storage[storageKey].enable
        }
        const iconPath = enable ? "assets/notenable.png" : "assets/enable.png"
        const update: DestoryerConfig = {
            enable: !enable
        }
        const message = enable ? notenableMessage : enableMessage

        chrome.action.setIcon({
            path: {
                32: iconPath
            }
        })
        chrome.storage.local.set({ [storageKey]: update }).then(() => {
            chrome.tabs.sendMessage(tab.id, {message}, function(response) {
                console.log("Response from content script:", response);
            });
        })
    });
}

const resetActionStatus = (tab: TabInfo) => {
    chrome.action.setIcon({
        path: {
            32: "assets/notenable.png"
        }
    })
    chrome.storage.local.remove([storageKey])
    chrome.tabs.sendMessage(tab.tabId, {message: notenableMessage}, function(response) {
        console.log("Response from content script:", response);
    });
}

chrome.action.onClicked.addListener(handleExtensionAction);

chrome.tabs.onActivated.addListener(resetActionStatus);
  