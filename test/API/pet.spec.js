// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 5001

describe('API Petstore Swagger - Entidade Pet', () =>{
    // Atributos, objectos, constantes e variáveis
    const request = supertest ('https://petstore.swagger.io/v2') // Base URL
    const massaPet = require("../../Vendors/json/massaPet")  // Teste de API com uma massa

    // Funçãoes e métodos = it
    // Incluir animal

    it('POST Pet', () => {
        const pet = require('../../Vendors/json/pet.json')
        return request
            .post('/pet')
            .send(pet)
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.body.id).toBe(petId)
                expect(response.body.name).toBe('Kira')
                expect(response.body.category.name).toBe('dog')
                expect(response.body.tags[0].name).toBe('vacinado')
            })
    }) // Final do POST
    // Primeiro teste que faz a inclusão do Cao(Kira)
    it('Get Pet',() => {
        return request
           // .get('/pet/ + petId')// Tradicional
           .get(`/pet/${petId}`)//actual
            .then((response) => {
                console.log('Resposta Recebida:\n', response.body)
                expect(response.statusCode).toBe(200)
                expect(response.body.id).toBe(petId)
                expect(response.body.name).toBe('Kira')
                expect(response.body.category.name).toBe('dog')
                expect(response.body.tags[0].name).toBe('vacinado')
                expect(response.body.status).toBe('available')
            })

        }) // Final do GET

        it('PUT Pet', () => {

            const pet = require('../../Vendors/json/petput.json')

            return request
            .put('/pet')
            .send(pet)
            .then((response) =>{
            expect(response.statusCode).toEqual(200)
            expect(response.body.status).toEqual('sold')
            })
        }) // Final do PUT

        it('DELETE Pet', () =>{
            return request
            .delete(`/pet/${petId}`)
            .then((response) => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.code).toEqual(200)
                expect(response.body.type).toBe('unknown')
                expect(response.body.message).toBe(petId.toString())
         } )
                
            })// Final do Delete

            // POST Pet DDT- Utilizando massa de teste
            it.each(massaPet.array.map(elemento => [
                elemento.id,
                elemento.categoryid,
                elemento.categoryname,
                elemento.petname,
                elemento.tag0id,
                elemento.tag0name,
                elemento.tag1id,
                elemento.tags1name,
                elemento.petstatus
    
            ])) // lê um bloco de cada vez
            
            ('POST Pet Data Driven: %s', (
                id,
                categoryid,
                categoryname,
                petname,
                tag0id,
                tag0name,
                tag1id,
                tag1name,
                petstatus

            // informaçao que vai diferenciar uma da outra, estavam disponiveis para o it, agora, para serem usados
        ) => {
            // Modelo de json a ser enviado
            // Valores que não forem sobrepostos seguirão no modelo
                const pet = require("../../Vendors/json/pet.json")

                // Sobreposição de valores
                pet.id = id
                pet.category.id = categoryid
                pet.category.name = categoryname
                pet.name = petname
                pet.tags[0].id = tag0id
                pet.tags[0].name = tag0name
                pet.tags[1].id = tag1id
                pet.tags[1].name = tag1name
                pet.status = petstatus
                // esses são parametros individuais, dai a falta da virgula, caso contrário significa que estão na mesma linha
       //Teste em si 
       return request
       .post('/pet')
       .send(pet)
       .then((response) => {
            expect(response.statusCode).toBe(200)
            expect(response.body.id).toBe(id)
            expect(response.body.name).toBe(petname)
            expect(response.body.category.name).toBe(categoryname)
            expect(response.body.tags[0].name).toBe(tag0name)
                

       })
            }) //final do POST Pet DDT
        })
