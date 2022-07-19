import { mySqlConnection, mySqliteConnection } from "./dataBasesConfig.js";

const main = async () => {
    try {
        await mySqlConnection.schema.dropTableIfExists('productsList')

        await mySqlConnection.schema.createTable('productsList', tableArticle => {
            tableArticle.increments('id').primary()
            tableArticle.string('productName', 10).notNullable()
            tableArticle.float('price').notNullable()
            tableArticle.string('thumbnail', 20).notNullable()
            
        })

        mySqlConnection.destroy()
    
    } catch(err) {
        console.log(err)
    }
}


const main2 = async () => {
    try {
        await mySqliteConnection.schema.dropTableIfExists('messageList')

        await mySqliteConnection.schema.createTable('messageList', tableArticle => {
            tableArticle.increments('id').primary()
            tableArticle.string('username', 15).notNullable()
            tableArticle.string('message', 50).notNullable()
            tableArticle.integer('month').notNullable()
            tableArticle.integer('day').notNullable()
            tableArticle.integer('year').notNullable()
            tableArticle.integer('hour').notNullable()
            tableArticle.integer('minutes').notNullable()
            tableArticle.integer('seconds').notNullable()
        })

        mySqliteConnection.destroy()
    
    } catch(err) {
        console.log(err)
    }
}
main()
main2()