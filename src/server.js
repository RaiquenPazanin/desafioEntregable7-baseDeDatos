import express  from 'express'
import { Server } from "socket.io"
const IOServer = Server
const app = express()
//const port = process.env.PORT
const port = 8081
import path  from 'path'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


import {mySqlConnection, mySqliteConnection} from '../public/dataBasesConfig.js'


app.use(express.json())
app.use(express.urlencoded())


app.use(express.static(path.join(__dirname, '../public')))

const expressServer = app.listen(port, (error) =>{
    if(error){
        console.log(`Hubo un error al comunicarse con el puerto: ${port}, con error ${error}`)
    }else{
        console.log(`Escuchando puerto: ${port}`)
    }
})


const io = new IOServer(expressServer)

io.on('connection', async socket =>{
    const showProductsAll = await showProducts()
    const showMessageAll = await showMessages()


    io.emit('server:message', showMessageAll)


    io.emit('server:produtsArray', showProductsAll)
    
    socket.on('client:message', async messageInfo => {
        
        await insertMessage(messageInfo)
        io.emit('server:message', showMessageAll)
    })

    socket.on('client:newProduct', async newProductInfo =>{

        await insertProduct(newProductInfo)
        
        io.emit('server:newProduct', showProductsAll)
    })

})




const insertProduct = async (newProductInfo) => {
    try {
        
        await mySqlConnection('productsList').insert(newProductInfo)
    } catch(err) {
        console.log(err)
    }
}

const showProducts = async () => {
    try{

        const allProducts =  await mySqlConnection.select('*').from('productsList')
        const allProductsShow = JSON.parse(JSON.stringify(allProducts))
        return(allProductsShow)
    
    }catch(err){
        console.log(err)
    }
}


const insertMessage = async (messageInfo) =>{
    try{
        await mySqliteConnection('messageList').insert(messageInfo)
       
    }catch(err){
        console.log(err)
        
    }
}

const showMessages = async () =>{
    try{

        const allmessages = JSON.parse(JSON.stringify(await mySqliteConnection.select('*').from('messageList')))
        return(allmessages)

    }catch(err){
        console.log(err)
    }
}
