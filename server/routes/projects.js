const express = require("express");
const router = express.Router();
const models = require('../models');

const addClient_Projects = (clientId, projectId) => {
    const data = {
        Client_ID: clientId,
        Project_ID: projectId
    }
  if(models.Client_Projects.create(data)) {
      return ('Successful operation')
  }
  else {
      return ('Unexpected Error')
  }
};

const addEmployee_Projects = (employeeId, projectId) => {
    const data = {
        Employee_ID: employeeId,
        Project_ID: projectId
    }
  if(models.Employee_Projects.create(data)) {
      return ('Successful operation')
  }
  else {
      return ('Unexpected Error')
  }
};

// Add Project progress
router.route('/progress/add').post(async(req, res, next) => {
        let progress = {
            Project_Id: req.body.Project_Id,
            Progress_Title: req.body.Progress_Title,
            Progress: req.body.Progress
    };
    await models.Project_Progress.create(progress)
        .then(progress => {
            res.send(progress)
            return progress
        })
        .catch(err => {
            res.send(err)
        })
});

//Get Progress
router.route('/progress/:id').get((req, res) => {
    models.Project_Progress.findAll({
        where: { Project_Id: req.params.id }
    })
    .then(progress => {
        res.json(progress)
    }) 
    .catch(err => {
        res.json({Error: "Sorry, but there was an error while retrieving the project's progress"})
    })
});

// 
router.route('/project/engineers/:Project_Id').get((req, res) => {
    models.Project_Relation.findAll({
        where: { Project_Id: req.params.Project_Id }
    })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.send(err)
    })
});


// Get All projects
router.route('/projects').get((req, res) => {
    models.Projects.findAll()
    .then(projects => {
        res.json(projects)
    }) 
    .catch(err => {
        res.send('Error: Sorry, but there was an error whie retrieving the projects ')
    })
});
// Add Project
router.route('/project/add').post(async(req, res, next) => {
        let project = {
            Project_Name: req.body.Project_Name,
            Project_Type: req.body.Project_Type,
            Project_SubType: req.body.Project_SubType,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Project_status: req.body.Project_status,
            Project_Description: req.body.Project_Description,
            Completion_Rate: req.body.Completion_Rate,
            Project_Author: req.body.Project_Author
    };
    project = await models.Projects.create(project)
        .then(project => {
            res.send(project)
            return project
        })
        .catch(err => {
            res.send(err)
        })
    const Client_Id = req.body.Project_Author

    await addClient_Projects(Client_Id, project.Project_Id)
});

// Get a single project
router.route('/project/:id').get((req, res) => {
    models.Projects.findOne({
        where: {
            Project_Id: req.params.id
        }
    })
    .then(project => {
        if (project) {
            res.json(project)
        } else {
            res.send('Project Not Found')
        }
    })
    .catch(err => {
        res.send(err, 'Error: Sorry, but there was an error while retrieving the project')
    })
});

// Update Projects
router.route('/project/update/:id').put(async(req, res) => {
    if (req.body.Project_Id) {
        models.Projects.update(
        {
            Project_Name: req.body.Project_Name,
            Project_Type: req.body.Project_Type,
            Project_Author: req.body.Project_Author,
            Project_SubType: req.body.Project_SubType,
            StartDate: req.body.StartDate,
            EndDate: req.body.EndDate,
            Project_status: req.body.Project_status,
            Project_Description: req.body.Project_Description
        },
                { where: { Project_Id: req.params.id } }
        )
            .then(data => {
                res.send(data)
            })
    } else if (!req.body.Project_Id) {
        res.status(404)
            .send({ message: 'Aucune Projet Trouvée' })
    }
    else {
        (err => res.json({"Erreur ": "Une erreur s'est produite lors de la mise à jour" }))
    }

     await   addEmployee_Projects(req.body.Project_Team, req.params.id)
    

});

// Delete Project
router.route('/project/delete/:id').delete((req, res) => {
    models.Projects.destroy({
        where: {
            Project_Id: req.params.id
        }
    })
        .then(() => {
            res.json({ status: 'Project deleted!' })
        })
        .catch(err => {
            res.send('error: ' + err)
        })
});

module.exports = router;