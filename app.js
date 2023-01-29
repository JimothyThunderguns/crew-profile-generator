const Manager = require ("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require ("./lib/Intern"); 
const inquirer = require("inquirer");
const fs = require("fs");


let managerCard = ``
let engineerCards = ``
let internCards = ``

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name?"
    },
    {
        type: 'number',
        name: 'id',
        message: "What is the team manager's employee ID?"
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the team manager's email address?"
    },
    {
        type: 'number',
        name: 'officeNumber',
        message: "What is the team manager's office number?"
    }
])
.then((answers) => {
    const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
    // console.log(manager)
    managerCard = generateHTML.generateManagerCard(manager)
    // console.log(managerCard)
    buildTeam()
})
.catch(err => console.log(err))


function buildTeam() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'buildTeam',
            message: "Would you like to add an engineer or an intern or to finish building the team?",
            choices: ['engineer', 'intern', 'finish building team']
        }
    ])
    .then((answer) => {
        // console.log(answer)
        if (answer.buildTeam === 'engineer') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "What is the engineer's name?"
                },
                {
                    type: 'number',
                    name: 'id',
                    message: "What is the engineer's employee ID?"
                },
                {
                    type: 'input',
                    name: 'email',
                    message: "What is the engineer's email address?"
                },
                {
                    type: 'input',
                    name: 'username',
                    message: "What is the engineer's GitHub username?"
                },
            ])
            .then((answers) => {
                const engineer = new Engineer(answers.name, answers.id, answers.email, answers.username)
                // console.log(engineer)
                const engineerCard = generateHTML.generateEngineerCard(engineer)
                // console.log(engineerCard)
                engineerCards += engineerCard
                // console.log(engineerCards)
            })
            .then(() => {
                buildTeam()
            })
            .catch(err => console.log(err))
        } else if (answer.buildTeam === 'intern') {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "What is the intern's name?"
                },
                {
                    type: 'number',
                    name: 'id',
                    message: "What is the intern's employee ID?"
                },
                {
                    type: 'input',
                    name: 'email',
                    message: "What is the intern's email address?"
                },
                {
                    type: 'input',
                    name: 'school',
                    message: "What is the intern's school?"
                },
            ])
            .then((answers) => {
                const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
                // console.log(intern)
                const internCard = generateHTML.generateInternCard(intern)
                // console.log(internCard)
                internCards += internCard
                // console.log(internCards)
            })
            .then(() => {
                buildTeam()
            })
            .catch(err => console.log(err))
        } else if (answer.buildTeam === 'finish building team') {
            const html = generateHTML.generateHTML(managerCard, engineerCards, internCards)
            // console.log(html)

            fs.writeFile('./dist/index.html', html, (err) => {
                if (err) throw err

                console.log('HTML saved!')
            })
        }
    })
    .catch(err => console.log(err))
}