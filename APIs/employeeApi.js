/*
    This API will manage employee information
*/
const exp = require("express");
const employeeApiRoute = exp.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secretKey = process.env.secretKey;

// get all employees: domain/superAdmin/employee/getEmployees
employeeApiRoute.get("/getEmployees", async (req, res) => {
    let dbObj = req.app.get("dbObj");
    let coll = dbObj.collection("employeeCollection");
    data = await coll.find().toArray();
    res.send({ empData: data });
});

// get a specific employee: domain/superAdmin/employee/:empId
employeeApiRoute.get("/:empId", async (req, res) => {
    let coll = req.app.get("dbObj").collection("employeeCollection");
    let id = +req.params.empId;
    let empData = await coll.findOne({ empId: id });
    if (empData) {
        res.send({ empData: empData });
    }
    else {
        res.send({ message: `Employee with id ${id} does not exist` });
    }
});

// create an employee: domain/superAdmin/employee/addEmployee   Payload: JSON data
employeeApiRoute.post("/addEmployee", async (req, res) => {
    let empObj = req.body;
    let coll = req.app.get("dbObj").collection("employeeCollection");
    let existingEmp = await coll.findOne({ empId: empObj.empId });
    if (existingEmp) {
        res.send({ message: "Employee Id already exists!" });
    }
    else {
        let hashedPwd = await bcryptjs.hash(empObj.password, 6);
        empObj.password = hashedPwd;
        let inserted = await coll.insertOne(empObj);
        res.send({ message: "Employee data added successfully" });
    }
});

// update employee data: domain/superAdmin/employee/:empId/update
// replaceOne() will replace the entire doc, from angular, we need to send the entire doc
employeeApiRoute.put("/:empId/update", async (req, res) => {
    let newEmpObj = req.body;
    let id = +req.params.empId;
    let coll = req.app.get("dbObj").collection("employeeCollection");
    let existingEmp = await coll.findOne({ empId: id });
    if (existingEmp) {
        let result = await coll.replaceOne({ empId: id }, newEmpObj);
        res.send({ message: "Employee data updated successfully" });
    }
    else {
        res.send({message:`The employee with id ${id} does not exist, data not updated`})
    }
});

// remove an employee: domain/superAdmin/employee/:empId/delete
employeeApiRoute.delete("/:empId/delete", async (req, res) => {
    let id = +req.params.empId;
    let coll = req.app.get("dbObj").collection("employeeCollection");
    let existingEmp = await coll.findOne({ empId: id });
    if (existingEmp) {
        let result = await coll.deleteOne({ empId: id });
        res.send({ message: "Employee data deleted successfully" });
    }
    else {
        res.send({ message: `Employee with id ${id} does not exist, no data deleted` });
    }
});

// employee login
employeeApiRoute.post("/login", async (req, res) => {
    let coll = req.app.get("dbObj").collection("employeeCollection");
    let empCred = req.body;
    let empObj = await coll.findOne({ empMail: empCred.empMail });
    if (empObj) {
        let resultOfComparision = await bcryptjs.compare(empCred.password, empObj.password);
        if (resultOfComparision) {
            let token = await jwt.sign({ empMail: empObj.empMail }, secretKey, { expiresIn: "1d" });
            res.send({
                status: "ok",
                empSessionId: token,
                empObj: {
                    "empName": empObj.empName,
                    "empMail": empObj.empMail,
                    "role": empObj.role
                }
            });
        }
        else
            res.send({ status: "failed" });
    }
    else {
        res.send({ status: "failed" });
    }
});

module.exports = employeeApiRoute;