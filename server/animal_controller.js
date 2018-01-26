require('dotenv').config()
const massive = require('massive')

module.exports = {
    post: (req, res) => {
        const dbInstance = req.app.get('db')
        const {
            animal_id
        } = req.body

        dbInstance.animal.insert({
            animal_id: animal_id,
        })
            .then(created => {
                res.send(created)
            })
            .catch(err => {
                console.log(err)
                res.err(err)
            })
    },

    get: (req, res) => {
        console.log(req.params.animal_id)
        const dbInstance = req.app.get('db')
        dbInstance.query(
            //JOIN
            `SELECT * FROM animals
        JOIN animals_new
        ON animals.animal_id = animal.id
         where animal_id = $1
        `,
            [req.params.animal_id]
        )
            .then(animal => {
                console.log(animal)
                res.send(animal)
            })
            .catch(err => {
                console.log(err)
                res.err(err)
            })
    },

    get: (req, res) => {
        console.log(req.params.animal_id)
            .then(animal => {
                res.json(req.body)
            })
            .catch(err => {
                console.log(err)
                res.err(err)
            })
    },

    get: (req, res) => {
        console.log(req.params.animal_id)
            .then(animal => {
                res.status(req.body)
            })
            .catch(err => {
                console.log(err)
                res.err(err)
            })
    },

    put: (req, res) => {
        const updateID = req.params.id
        const dbInstance = req.app.get('db')
        const {
            animal,
            animal_id
        } = req.body
        const newUpdate = {}

        if (animal) {
            newUpdate.animal = animal
        }

        if (animal_id) {
            newUpdate.animal_id = animal_id
        }

        dbInstance.animal.update({
            id: req.params.id,
        }, newUpdate)
            .then(updated => {
                res.send(updated)
            })
            .catch(err => {
                console.log(err)
                res.err(err)
            })
    },

    delete: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.albums.destroy({
            id: req.params.id,
        })
            .then(deleted => {
                res.status(202).end()
            })
            .catch(err => {
                console.log(err)
                res.err(err)
            })
    }
}