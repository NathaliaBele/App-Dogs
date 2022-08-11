const { Router } = require('express')
const { Dog, Temperament } = require('../db')
const { Op } = require('sequelize')
const axios = require('axios');

const router = Router();


router.get('/', async (req, res) => {
    let { name } = req.query
    if (!name) {
        const { data } = await axios.get('https://api.thedogapi.com/v1/breeds')
        // console.log(data)
        const allDogs = data.map(e => {
            return {
                id: e.id,
                name: e.name,
                image: e.image.url,
                height: e.height.metric,
                weight: e.weight.metric,
                temperament: e.temperament,
                lifeSpan: e.life_span,
                originApi: true,
            }
        })
        return res.json(allDogs);

    } else {
        const { data } = await axios.get('https://api.thedogapi.com/v1/breeds')
        const byName = data.filter(dog => {
            return dog.name == name
        })
        const respuesta = byName.map(e => {
            return {
                id: e.id,
                name: e.name,
                image: e.image.url,
                height: e.height.metric,
                weight: e.weight.metric,
                temperament: e.temperament,
                lifeSpan: e.life_span,
                originApi: true,

            }
        })
        const dogsDB = await Dog.findAll()
        res.json([...respuesta, ...dogsDB])
    }

})

router.get('/:id', async (req, res) => {

    // arreglo vacio que guarda las propiedades que la persona escogió
    let arr = []
    // for in para evaluar que los parametros del query vengan en verdadero.
    //for in para recorrer el objeto query.
    for (const property in req.query) {
     //constante property es la propiedad
     //query objeto completo   
        if (req.query[property] == 'true') {
            //nombre de la propiedad.
            arr.push(property)
        }
    }


    const { data } = await axios.get('https://api.thedogapi.com/v1/breeds')
    const id = req.params.id
    const byId = await data.filter(doggy => {
        return doggy.id == id
    })

    const result = byId.map(e => {


        return {
            id: e.id,
            name: e.name,
            image: e.image.url,
            height: e.height.metric,
            weight: e.weight.metric,
            temperament: e.temperament,
            lifeSpan: e.life_span
        }


    })
    // map para crear la respueta personalizada.

    const rta = result.map(element => {
        let obj = {};
        //crear un objeto que va a hacer el contenedor de lo que se devuelve.
        for (const key in element) {
                        //element es el objeto que se retorna generalmente
            for (let i = 0; i < arr.length; i++) {
                //recorre lo que mando en true, las propiedades que la persona quiere ver.
                if (key == arr[i]) {
                  //si es así guarde la llave y el valor.   
                    obj = {
                        ...obj,
                        [key]: element[key] //key //valor 
                    }
                }

            }


        }

        return obj

    })

    return arr.length > 0 ? res.json(rta) : res.json(result)



})


router.post('/', async (req, res) => {

    const recibirRaza = req.body

    let act = await Dog.create({
        name: recibirRaza.name,
        image: recibirRaza.image,
        height: recibirRaza.height,
        weight: recibirRaza.weight,
        temperament: recibirRaza.temperament,
        lifeSpan: recibirRaza.lifeSpan,
        originApi: false,
    });

    let cons = await Dog.findAll()


    return res.json(cons)

})


module.exports = router;