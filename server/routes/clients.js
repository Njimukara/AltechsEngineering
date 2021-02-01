const express = require("express");
const router = express.Router();
const models = require('../models');


// Get All Client Projects
router.route('/client/projects/:id').get((req, res) => {
    models.Projects.findAll({
        where: {
            Project_Author: req.params.id
        }
    })
    .then(projects => {
        res.json(projects)
    }) 
    .catch(err => {
        res.send("Erreur : Désolé, mais une erreur s'est produite lors de la récupération des clients")
    })
});
// Get All Clients
router.route('/clients').get((req, res) => {
    models.Clients.findAll()
    .then(Clients => {
        res.json(Clients)
    }) 
    .catch(err => {
        res.send("Erreur : Désolé, mais une erreur s'est produite lors de la récupération des clients")
    })
});
// Add Client
router.route('/client/add').post((req, res, next) => {
        const Client = {
            Client_Name: req.body.Client_Name,
            Client_Email: req.body.Client_Email,
            Account_Type: req.body.Account_Type,
            Client_Password: req.body.Client_Password,
            Client_Phone: req.body.Client_Phone
    };
    models.Clients.create(Client)
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.send("Erreur : Désolé, il y a un problème de serveur. Nous serons bientôt de retour")
        })
});

// Get a single Client
router.route('/client/:id').get((req, res) => {
    models.Clients.findOne({
        where: {
            Client_Id: req.params.id
        }
    })
        .then(Client => {
            if (Client) {
                res.json(Client)
            } else {
                res.send('Client Not Found')
            }
        })
        .catch(err => {
            res.send("Erreur : Désolé, mais une erreur s'est produite lors de la récupération de la client")
        })
});

// Update Clients
router.route('/client/update/:id').put((req, res) => {
    if (req.body.Client_Id) {
        models.Clients.update(
        {
            Client_Name: req.body.Client_Name,
            Client_Email: req.body.Client_Email,
            Account_Type: req.body.Account_Type,
            Client_Password: req.body.Client_Password,
            Client_Phone: req.body.Client_Phone,
        },
                { where: { Client_Id: req.params.id } }
        )
            .then(data => {
                res.json(data)
            })
    } else if (!req.body.Client_Id) {
        res.status(404)
            .send({ message: 'Aucune Client Trouvée' })
    }
    else {
        (err => res.json({"Erreur ": "Une erreur s'est produite lors de la mise à jour" }))
    }

});

// Delete Client
router.route('/client/delete/:id').delete((req, res) => {
    models.Clients.destroy({
        where: {
            Client_Id: req.params.id
        }
    })
        .then(() => {
            res.json({ status: 'Client deleted!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

module.exports = router;