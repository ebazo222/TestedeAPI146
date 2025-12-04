// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 5001

describe('API Petstore Swagger - Entidade Pet', () =>{
    // Atributos, objectos, constantes e variáveis
    const request = supertest ('https://petstore.swagger.io/v2') // Base URL

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

        })
