const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "mone656454",
    database: "bime_yaran",
    dateStrings: true
})



// ABOUT - Get count of users
app.post("/total-users", (req, res) => {
    con.query("SELECT COUNT(*) FROM users", (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// ABOUT - Get count of branches
app.post("/total-branches", (req, res) => {
    con.query("SELECT COUNT(*) FROM branches", (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// ABOUT - Get count of contracts
app.post("/total-contracts", (req, res) => {
    con.query("SELECT COUNT(*) FROM contract", (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// BRANCHES - Get branches details
app.post("/branches", (req, res) => {
    con.query("SELECT * FROM branches", (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// SIGNUP, SIGNIN - Check Email availability for registering and login
app.post("/check-email", (req, res) => {
    const email = req.body.email;
    con.query("SELECT * FROM users WHERE email = ? ",[email], (err, result) => {
        if(result.length > 0) {
            res.send("true")
        }
        else {
            res.send("false")
        }
    })
})

// SIGNIN - check password for login
app.post("/check-password", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    con.query("SELECT * FROM users WHERE email = ? AND password = ?",[email, password], (err, result) => {
        if(result.length > 0) {
            res.send("true")
        }
        else {
            res.send("false")
        }
    })
})

// SIGNUP - Register User
app.post("/register-user", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user_type = "user";
    con.query("INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)", [email, password, user_type], (err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send(err)
        }
    })
})


// SIGNIN - Check User Type For Dashboard
app.post("/check-user-type", (req, res) => {
    const email = req.body.email;
    con.query("SELECT * from users WHERE email = ?", [email], (err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send(err)
        }
    })
})


// DASHBOARD - BRANCHES - Add Branch
app.post("/register-branch", (req, res) => {
    const branch_id = req.body.branch_id;
    console.log(branch_id)
    const branch_name = req.body.branch_name;
    const branch_address = req.body.branch_address;
    const branch_phone = req.body.branch_phone;
    const branch_type = req.body.branch_type;
    con.query("INSERT INTO branches (branch_id, branch_name, branch_address, branch_phone, branch_type) VALUES (?, ?, ?, ?, ?)",
        [branch_id, branch_name, branch_address, branch_phone, branch_type], (err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send(err)
        }
    })
})

// DASHBOARD - BRANCHES - Delete Branch
app.post("/delete-branch", (req, res) => {
    const branch_id = req.body.branch_id;
    con.query("DELETE FROM branches WHERE branch_id = ?",[branch_id], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})

// DASHBOARD - BRANCHES - Edit Branch
app.post("/edit-branch", (req, res) => {
    const branch_id = req.body.branch_id;
    console.log(branch_id)
    const branch_name = req.body.branch_name;
    const branch_address = req.body.branch_address;
    const branch_phone = req.body.branch_phone;
    const branch_type = req.body.branch_type;
    con.query("UPDATE branches SET branch_name = ?, branch_phone = ?, branch_address = ?, branch_type = ? WHERE branch_id = ?"
        , [branch_name, branch_phone, branch_address, branch_type, branch_id], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})
 //DASHBOARD - BRANCHES, Check branch id availability for edit
app.post("/check-branch", (req, res) => {
    const branch_id = req.body.branch_id;
    con.query("SELECT * FROM branches WHERE branch_id = ?",[branch_id], (err, result) => {
        if(result.length > 0) {
            res.send("true")
        }
        else {
            res.send("false")
        }
    })
})

//DASHBOARD - BRANCHES, Check branch name
app.post("/check-branch-name", (req, res) => {
    const branch_name = req.body.branch_name;
    con.query("SELECT * FROM branches WHERE branch_name = ?",[branch_name], (err, result) => {
        res.send(result)
    })
})

// DASHBOARD - EMPLOYEES - Get total admins
app.post("/employees", (req, res) => {
    con.query("SELECT * from employee", (err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send(err)
        }
    })
})


// DASHBOARD - EMPLOYEES - Delete Employee
app.post("/delete-employee", (req, res) => {
    const empId = req.body.emp_id;
    con.query("DELETE FROM employee WHERE employee_id = ?",[empId], (err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send(err)
        }
    })
})

// DASHBOARD - EMPLOYEES - Add Employee
app.post("/register-employee", (req, res) => {
        const user_id = req.body.user_id
        const employee_name = req.body.employee_name
        const n_num = req.body.n_num
        const salary = req.body.salary
        const branch = req.body.branch
    con.query("INSERT INTO employee (user_id, employee_name, employee_num, employee_salary, employee_branch) VALUES (?, ?, ?, ?, ?)",
        [user_id, employee_name, n_num, salary, branch], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})


// DASHBOARD - Add Employee Check
app.post("/check-user-id", (req, res) => {
    const user_id = req.body.user_id;
    con.query("SELECT * FROM users WHERE user_id = ?",[user_id], (err, result) => {
        if(result.length > 0) {
            res.send("true")
        }
        else {
            res.send("false")
        }
    })
})

// DASHBOARD - Add Employee Check

app.post("/check-branch-id", (req, res) => {
    const branch_id = req.body.branch_id;
    con.query("SELECT * FROM branches WHERE branch_id = ?",[branch_id], (err, result) => {
        if(result.length > 0) {
            res.send("true")
        }
        else {
            res.send("false")
        }
    })
})

// DASHBOARD - Add Employee Id
app.post("/check-emp-id", (req, res) => {
    const emp_id = req.body.emp_id;
    con.query("SELECT * FROM employee WHERE employee_id = ?",[emp_id], (err, result) => {
        if(result.length > 0) {
            res.send("true")
        }
        else {
            res.send("false")
        }
    })
})

// DASHBOARD - EMPLOYEES - Promote User

app.post("/promote-user", (req, res) => {
    const user_id = req.body.user_id
    con.query("UPDATE users SET user_type = ? WHERE user_id = ?", ["admin", user_id], (err, result) => {
        if(result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// DASHBOARD - EMPLOYEES - Edit Emp
app.post("/edit-employee", (req, res) => {
    const emp_id = req.body.emp_id
    const employee_name = req.body.employee_name
    const n_num = req.body.n_num
    const salary = req.body.salary
    const branch = req.body.branch
    con.query("UPDATE employee SET employee_name = ?, employee_num = ?, employee_salary = ?, employee_branch = ? WHERE employee_id = ?"
        , [employee_name, n_num, salary, branch, emp_id], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})



// DASHBOARD - TRANSACTIONS - Get total trans
app.post("/transactions", (req, res) => {
    con.query("SELECT * from transaction", (err, result) => {
        if(result){
            res.send(result);
        }else{
            res.send(err)
        }
    })
})


// DASHBOARD - PASSWORD - Change Password
app.post("/change-password", (req, res) => {
    const password = req.body.password
    const email = req.body.email
    con.query("UPDATE users SET password = ? WHERE email = ?"
        , [password, email], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})


// BUY INSURANCE - INSURANCE TYPES
app.post("/insurances", (req, res) => {
    con.query("SELECT * FROM insurance", (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})


// BUY INSURANCE - CHECK CLIENT
app.post("/check-client", (req, res) => {
    const user_id = req.body.user_id
    con.query("SELECT * FROM client WHERE user_id = ?",[user_id], (err, result) => {
        if (result.length > 0) {
            res.send(result)
        }
        else {
            res.send("F")
        }
    })
})



// BUY INSURANCE - ADD Insurance
app.post("/add-client", (req, res) => {
    const user_id = req.body.user_id
    const client_phone = req.body.client_phone
    const client_address = req.body.client_address
    const client_birthday = req.body.client_birthday
    const client_name = req.body.client_name
    const client_fname = req.body.client_fname
    con.query("INSERT INTO client (user_id, client_name, client_fname, client_address, client_phone, client_birthday) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, client_name, client_fname, client_address, client_phone, client_birthday], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})

// BUY INSURANCE - ADD Transaction
app.post("/add-transaction", (req, res) => {
    const user_id = req.body.user_id
    const branch_id = req.body.branch_id
    const transaction_date = req.body.transaction_date
    const transaction_amount = req.body.transaction_amount
    const insurance_id = req.body.insurance_id
    const transaction_type = req.body.transaction_type
    con.query("INSERT INTO transaction (user_id, branch_id, transaction_date, transaction_amount, insurance_id, transaction_type) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, branch_id, transaction_date, transaction_amount, insurance_id, transaction_type], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})


// BUY INSURANCE - CHECK Transaction
app.post("/check-transaction", (req, res) => {
    const user_id = req.body.user_id
    const insurance_id = req.body.insurance_id
    con.query("SELECT * FROM transaction WHERE user_id = ? AND insurance_id = ? AND transaction_description IS NULL",[user_id, insurance_id], (err, result) => {
        res.send(result)
    })
})

// BUY INSURANCE - CHECK Client
app.post("/check-client-id", (req, res) => {
    const user_id = req.body.user_id
    con.query("SELECT * FROM client WHERE user_id = ?",[user_id], (err, result) => {
        res.send(result)
    })
})


// BUY INSURANCE - ADD Transaction
app.post("/add-contract", (req, res) => {
    const branch_id = req.body.branch_id
    const insurance_id = req.body.insurance_id
    const client_id = req.body.client_id
    const contract_status = req.body.contract_status
    con.query("INSERT INTO contract (client_id, branch_id, insurance_id, contract_status) VALUES (?, ?, ?, ?)",
        [client_id, branch_id, insurance_id, contract_status], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send("E")
            }
        })
})


// DASHBOARD - BUY - EDIT AND BUY INSURANCE
app.post("/edit-client", (req, res) => {
    const user_id = req.body.user_id
    const client_phone = req.body.client_phone
    const client_address = req.body.client_address
    const client_birthday = req.body.client_birthday
    con.query("UPDATE client SET client_phone = ?, client_address = ? , client_birthday = ? WHERE user_id = ?"
        , [client_phone, client_address, client_birthday, user_id], (err, result) => {
           res.send(result)
        })
})


// DASHBOARD - BUY - COmplete contract
app.post("/complete-contract", (req, res) => {
    const client_id = req.body.client_id
    const insurance_id = req.body.insurance_id
    const transaction_id = req.body.transaction_id
    con.query("UPDATE contract SET transaction_id = ? WHERE client_id = ? AND insurance_id = ?"
        , [transaction_id, client_id, insurance_id], (err, result) => {
            res.send(result)
        })
})


// BUY INSURANCE - ADD health
app.post("/add-health", (req, res) => {
    const branch_id = req.body.branch_id
    const client_id = req.body.client_id
    const health_age = req.body.health_age
    const health_date_start = req.body.health_date_start
    const health_date_expire = req.body.health_date_expire
    con.query("INSERT INTO health (branch_id, client_id, health_date_start, health_date_expire, health_age) VALUES (?, ?, ?, ?, ?)",
        [branch_id, client_id, health_date_start, health_date_expire, health_age], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})

// BUY INSURANCE - ADD fire
app.post("/add-fire", (req, res) => {
    const branch_id = req.body.branch_id
    const client_id = req.body.client_id
    const fire_house_area = req.body.fire_house_area
    const fire_date_start = req.body.fire_date_start
    const fire_date_expire = req.body.fire_date_expire
    con.query("INSERT INTO fire (branch_id, client_id, fire_date_start, fire_date_expire, fire_house_area) VALUES (?, ?, ?, ?, ?)",
        [branch_id, client_id, fire_date_start, fire_date_expire, fire_house_area], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})

// BUY INSURANCE - ADD car
app.post("/add-car", (req, res) => {
    const branch_id = req.body.branch_id
    const client_id = req.body.client_id
    const car_insurance_type = req.body.car_insurance_type
    const car_insurance_price = req.body.car_insurance_price
    const car_date_start = req.body.car_date_start
    const car_date_expire = req.body.car_date_expire
    const car_number = req.body.car_number
    const car_type = req.body.car_type
    const car_value = req.body.car_value
    con.query("INSERT INTO car (branch_id, client_id, car_insurance_type, car_insurance_price, car_date_start, car_date_expire, car_number, car_type, car_value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [branch_id, client_id, car_insurance_type, car_insurance_price, car_date_start, car_date_expire, car_number, car_type, car_value], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})

// ADMIN - Get contracts
app.post("/contracts", (req, res) => {
    con.query("SELECT * FROM contract", (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// Admin - Get not approved contracts
app.post("/get-pending-contracts", (req, res) => {
    con.query("SELECT * FROM contract WHERE contract_status = ?", ["pending"], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})



// DASHBOARD - BUY - COmplete contract
app.post("/approve-contract", (req, res) => {
    const contract_id = req.body.contract_id
    con.query("UPDATE contract SET contract_status = ? WHERE contract_id = ?"
        , ["completed", contract_id], (err, result) => {
            res.send(result)
        })
})


// ADMIN - Get users
app.post("/users", (req, res) => {
    con.query("SELECT * FROM users", (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// ADMIN - Get clients
app.post("/clients", (req, res) => {
    con.query("SELECT * FROM client", (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})


// ADMIN - Get current insurances
app.post("/user-contract", (req, res) => {
    const client_id = req.body.client_id
    con.query("SELECT * FROM contract WHERE client_id = ?", [client_id], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})


// ADD REPAY
app.post("/add-repay", (req, res) => {
    const contract_id = req.body.contract_id
    const client_id = req.body.client_id
    const repay_status = req.body.repay_status
    con.query("INSERT INTO repay (contract_id, client_id, repay_status) VALUES (?, ?, ?)",
        [contract_id, client_id, repay_status], (err, result) => {
            if(result){
                res.send(result);
            }else{
                res.send(err)
            }
        })
})


// Admin - Get not approved damages
app.post("/get-pending-damage", (req, res) => {
    con.query("SELECT * FROM repay WHERE repay_status = ?", ["pending"], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})



// DASHBOARD - approve damage
app.post("/approve-damage", (req, res) => {
    const repay_id = req.body.repay_id
    con.query("UPDATE repay SET repay_status = ? WHERE repay_id = ?"
        , ["completed", repay_id], (err, result) => {
            res.send(result)
        })
})



// Dashboard - get car insurances
app.post("/get-car-insurance-by-client", (req, res) => {
    const client_id = req.body.client_id
    con.query("SELECT * FROM car_users WHERE client_id = ?", [client_id], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})


// Dashboard - get fire insurances
app.post("/get-fire-insurance-by-client", (req, res) => {
    const client_id = req.body.client_id
    con.query("SELECT * FROM fire_users WHERE client_id = ?", [client_id], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

app.post("/get-health-insurance-by-client", (req, res) => {
    const client_id = req.body.client_id
    con.query("SELECT * FROM health_users WHERE client_id = ?", [client_id], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})


// Dashboard - get repay by id
app.post("/get-repay", (req, res) => {
    const repay_id = req.body.repay_id
    con.query("SELECT * FROM repay WHERE repay_id = ?",[repay_id], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// Dashboard - get repay by id
app.post("/get-user", (req, res) => {
    const client_id = req.body.client_id
    con.query("SELECT * FROM client WHERE client_id = ?",[client_id], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

// Dashboard - get repay by id
app.post("/get-contract", (req, res) => {
    const contract_id = req.body.contract_id
    con.query("SELECT * FROM contract WHERE contract_id = ?",[contract_id], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

app.post("/get-transaction", (req, res) => {
    const transaction_id = req.body.transaction_id
    con.query("SELECT * FROM transaction WHERE transaction_id = ?",[transaction_id], (err, result) => {
        if (result) {
            res.send(result)
        }
        else {
            res.send(err)
        }
    })
})

app.listen(3001, () => {
    console.log("MySQL Database server running...");
})