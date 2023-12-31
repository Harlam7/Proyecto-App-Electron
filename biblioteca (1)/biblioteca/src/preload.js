const contextBridge = require('electron').contextBridge;
const ipcRender = require('electron').ipcRenderer;

const ipc = {
    'render': {
        'send': [
            'login',
            'logout',
            'invitado',
            'consultClient',
            'addClient',
            'updateClient',
            'deleteClient',
            'renewExpiredClient',
            'renewClient',
            'sendEmail'
        ],
        'sendReceive': [
            'getUserData',
            'getClients',
            'getClient',
            'confirmAddClient',
            'confirmUpdateClient',
            'confirmDeleteClient',
            'confirmRenewExpiredClient',
            'confirmRenewClient',
            'getSuscriptions'
        ]
    }
};

contextBridge.exposeInMainWorld(
    'ipcRender', {
    send: (channel, args) => {
        let validChannels = ipc.render.send;

        if (validChannels.includes(channel)) {
            ipcRender.send(channel, args);
        }
    },
    invoke: (channel, args) => {
        let validChannels = ipc.render.sendReceive;

        if (validChannels.includes(channel)) {
            return ipcRender.invoke(channel, args);
        }
    }
});