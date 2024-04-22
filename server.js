const express = require("express")
const app = express()
const path = require("path")


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/", express.static(
    path.join(__dirname, "/Front-end")
))


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./Data/test.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});




// handle signup page
app.post("/signup", (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, password], function(err) {
        if (err) {
            console.error('Error inserting data into database:', err.message);
            res.status(500).send('Error inserting data into database.');
        } else {
            console.log(`Inserted user with ID ${this.lastID} into database.`);
            // res.send("User registered successfully.");
            res.redirect(`/home.html?username=${encodeURIComponent(username)}`);
        }
    });
})


// handle login-page
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).send("Username and password are required.");
    }

    const sqlCheck = `SELECT * FROM users WHERE username = ?`;
    db.get(sqlCheck, [username], (err, row) => {
        if (err) {
            console.error('Error checking username in database:', err.message);
            return res.status(500).send('Error checking username in database.');
        }

        if (!row) {
            return res.status(401).send("Invalid username or password.");
        } else {
            if (row.password === password) {
                res.redirect(`/home.html?username=${encodeURIComponent(username)}`);
            } else {
                return res.status(401).send("Invalid username or password.");
            }
        }
    });
});




app.get('/api/users', (req, res) => {
    db.all('SELECT * FROM users', (err, rows) => {
        if(err) {
            console.error('Error fetching users', err)
            return res.status(500).send('Internal server error')
        }
        res.send(rows)
    })
})


app.listen(4004, (error) => {
    if(error){
        console.log(error)
        return
    }
})