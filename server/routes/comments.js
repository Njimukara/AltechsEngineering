const express = require("express");
const router = express.Router();
const models = require('../models');

// Get All Comments
router.route('/comments').get((req, res) => {
    models.Comments.findAll()
    .then(comments => {
        res.json(comments)
    }) 
    .catch(err => {
        res.send("Erreur : Désolé, mais une erreur s'est produite lors de la récupération des clients")
    })
});
// Add Client
router.route('/comment/add').post((req, res, next) => {
        const Comment = {
            Project_Id: req.body.Project_Id,
            Authors_Id: req.body.Authors_Id,
            Subject: req.body.Subject,
            Description: req.body.Description,
            Comment_Date: req.body.Comment_Date
    };
    models.Comments.create(Comment)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send("Erreur : Désolé, il y a un problème de serveur. Nous serons bientôt de retour")
        })
});

// Get a single Client
router.route('/client/:id').get((req, res) => {
    models.Comments.findOne({
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
        models.Comments.update(
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
                res.send(data)
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
    models.Comments.destroy({
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