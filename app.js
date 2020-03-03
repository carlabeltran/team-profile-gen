//FILE SYSTEM
const fs = require("fs");

//
const inquirer = require("inquirer");

//
const path = require("path");

//
const Manager = require("./lib/Manager");

//
const Engineer = require("./lib/Engineer");

//
const Intern = require("./lib/Intern");

//
const inquirer = require("inquirer");

//​
const OUTPUT_DIR = path.resolve(__dirname, "output")

//
const outputPath = path.join(OUTPUT_DIR, "team.html");

//
const render = require("./lib/htmlRenderer");

const employees = [];



