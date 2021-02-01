const express = require("express");
const router = express.Router();
const models = require('../models');

// Get All Employees
router.route('/employees').get((req, res) => {
    models.Employees.findAll()
    .then(Employees => {
        res.json(Employees)
    }) 
    .catch(err => {
        res.send("Erreur : Désolé, mais une erreur s'est produite lors de la récupération des employees")
    })
});

// Add Employee
router.route('/employee/add').post((req, res, next) => {
    const Employee = {
            Employee_Name: req.body.Employee_Name,
            Employee_Email: req.body.Employee_Email,
            Account_Type: req.body.Account_Type,
            Employee_Password: req.body.Employee_Password,
            Employee_Phone: req.body.Employee_Phone,
            Employee_StartDate: req.body.Employee_StartDate
    };
    models.Employees.create(Employee)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send("Erreur : Désolé, il y a un problème de serveur. Nous serons bientôt de retour")
        })
});

// Add Employee-Project
router.route('/employee-project/add').post((req, res, next) => {
        const Employee_project = {
            Employee_ID: req.body.Employee_ID,
            Project_ID: req.body.Project_ID,
    };
    models.Employee_Projects.create(Employee_project)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send("Erreur : Désolé, il y a un problème de serveur. Nous serons bientôt de retour")
        })
});

// Get a single Employee for a particular project
router.route('/employees_project/:id').get(async (req, res) => {
    await models.Employee_Projects.findAll({
        where: {
            Project_ID: req.params.id
        }
    })
        .then(Employees => {
            if (Employees) {
                res.json(Employees)
            } else {
                res.send('Project Not Found')
            }
        })
        .catch(err => {
            res.send("Erreur : Désolé, mais une erreur s'est produite lors de la récupération de la employee")
        })
});

router.route('/employee/:id').get(async (req, res) => {
    await models.Employee_Projects.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(Employee => {
            if (Employee) {
                res.json(Employee)
            } else {
                res.send('Employee Not Found')
            }
        })
        .catch(err => {
            res.send("Erreur : Désolé, mais une erreur s'est produite lors de la récupération de la employee")
        })
});

// Update Employees
router.route('/employee/update/:id').put((req, res) => {
    if (req.body.Client_Id) {
        models.Employees.update(
        {
            Employee_Name: req.body.Employee_Name,
            Employee_Email: req.body.Employee_Email,
            Account_Type: req.body.Account_Type,
            Employee_Phone: req.body.Employee_Phone,
            Employee_StartDate: req.body.Employee_StartDate
        },
                { where: { Employee_Id: req.params.id } }
        )
            .then(data => {
                res.send(data)
            })
    } else if (!req.body.Employee_Id) {
        res.status(404)
            .send({ message: 'Aucune Employeé Trouvée' })
    }
    else {
        (err => res.json({"Erreur ": "Une erreur s'est produite lors de la mise à jour" }))
    }

});

// Delete Employee
router.route('/employee/delete/:id').delete((req, res) => {
    models.Employees.destroy({
        where: {
            Employee_Id: req.params.id
        }
    })
        .then(() => {
            res.json({ status: 'Employee deleted!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

module.exports = router;