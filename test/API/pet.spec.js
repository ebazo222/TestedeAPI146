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
} )