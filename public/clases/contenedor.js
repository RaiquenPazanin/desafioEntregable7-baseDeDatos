import mySqlConnection from '../dataBasesConfig'

class Contenedor{
    constructor(){
        this.config = mySqlConnection;
        this.elements = [];
    }

    async save(title, price, thumbnail){

        try{
            let newProduct = {
				productName: title,
				price: price,
				thumbnail: thumbnail,
			}

            await this.config('productsList').insert(newProduct)
			
        }catch (error) {
            console.log(`ERROR: No se pudo agregar un producto. ${error}` );
        }
    }

    async getById(id){
        
        try{
            const element =  await this.config.from('productsList').select('id', '=', id);
            console.log(element);
        }catch(error){
            console.log(`ERROR: ${error}` );
        }
        
    }

    async deletById(id){
        try{
            await this.config.from('productsList').where('id', '=', id).del()
            console.log(newArray);
        }catch(error){
            console.log(`ERROR: ${error}` );
        }
        

    }

    async getAll(){
        try{
            let data;
            data = await this.config.from('productsList').select('*');
            console.log(data);
        }catch(error){
            console.log(`ERROR: ${error}` );
        }
        
    }

    async deletAll(){
        try{
            await this.config.from('productsList').where('*').del()
            console.log("Se eliminaron todos los elementos del archivo")
        }catch(error){
            console.log(`ERROR: ${error}` );
        }
       
    }

}