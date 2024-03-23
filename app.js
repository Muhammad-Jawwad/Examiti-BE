require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require('morgan')
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const universityRoutes = require("./api/routes/university");
const departmentRoutes = require("./api/routes/department");
const courseRoutes = require("./api/routes/course");
const topicRoutes = require("./api/routes/topic");
const adminRoutes = require("./api/routes/admin");
const teacherRoutes = require("./api/routes/teacher");
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use('/images', express.static(path.join(__dirname, 'images')));
console.log(path.join(__dirname, 'images'));

// To protect from CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// Routes
app.use('/university', universityRoutes);
app.use('/department', departmentRoutes);
app.use('/course', courseRoutes);
app.use('/topic', topicRoutes);
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);

// setting mongoose connection and starting server
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MongoDB_URI)
    .then(() => {
        app.listen(process.env.APP_PORT || 3000, () => {
            console.log("Server up and running on PORT:", process.env.APP_PORT || 3000);
        });
    })
    .catch((err) => {
        console.error("Mongoose connection error:", err);
    });

