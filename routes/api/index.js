const router = require('express').Router();
const departmentRoutes = require("./departments");
const roleRoutes = require('./roles');
const employeeRoutes = require('./employees');

router.use('/departments', departmentRoutes);

router.use('/roles', roleRoutes);

router.use('/employees', employeeRoutes);


module.exports = router;

