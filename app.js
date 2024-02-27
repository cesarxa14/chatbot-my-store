const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flujoPrincipal = addKeyword(['hola', 'buenas', 'que tal' ])
    .addAnswer('Bienvenido a mi tienda')
    .addAnswer('En que te puedo ayudar?', {capture: true}, (ctx) => {
        console.log('contexto', ctx)
    })

const flujoSecundario = addKeyword('Gracias').addAnswer('De nada!')


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flujoPrincipal, flujoSecundario])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
