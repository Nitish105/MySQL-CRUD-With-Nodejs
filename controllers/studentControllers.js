// get all student list
const db = require("../config/db");

const getStudents = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM students;')
        if(!data){
            return res.status(404).send({
                success:false,
                message:'No Records found'
            })
        }
        res.status(200).send({
            success:true,
            message: "ALL Student Records",
            totalStudents: data[0].length,
            data: data[0]
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            success:false,
            message: 'Error in Get All student API',
            error
        });
    }
};

//Get student By ID
const getStudentByID = async(req, res) => {
    try {
          const studentId = req.params.id
          if(!studentId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Or Provide Student id'
            })
          }
        // const data = await db.query(`SELECT * FROM students WHERE id=`+studentId)
        const data = await db.query(`SELECT * FROM students WHERE id=`+[studentId])
        if(!data){
            return res.status(404).send({
                success: false,
                message: 'no Records found'
            })
        }
        res.status(200).send({
            success: true,
            studentDetails: data[0],
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            success:false,
            message: 'Error in Get student by ID API',
            error
        });
    }
}


// create student
const createStudent = async (req, res) => {
    try {
       const {name, roll_no, fees, medium } = req.body 
       if(!name || !roll_no || !medium || !fees) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all fields'
            })
       }

       const data = await db.query(`INSERT INTO students (name, roll_no, fees, medium) VALUES (?, ?, ?, ? )`, [name, roll_no, fees, medium])
       if(!data) {
        return res.status(404).send({
            success:false,
            message: 'Error in INSERT Query'
        })
       }
       res.status(201).send({
        success:true,
        message:'New Student Record Created' 
       })
    } catch (error) {
        console.log(error);
        res.status(500).send({ 
            success:false,
            message: 'Error in Create student API',
            error
        });
    }
}


const updateStudent = async (req, res) => {
    try {
        const studentId =  req.params.id
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "Invalid ID or provide Id"
            })
        }
        const {name, roll_no, fees, medium} = req.body
        const data = await db.query(`UPDATE students SET name = ?, roll_no = ?, fees = ?, medium = ?WHERE id = ? `, [name, roll_no, fees, medium, studentId])
        if(!data){
            return res.status(500).send({
                success: false,
                message: "Error in Update Data"
            })
        }
        res.status(200).send({
            success:true,
            message:"student details updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update student API',
            error
        })
    }

}


const deleteStudent = async(req, res) => {
    try {
        const studentId =  req.params.id
        if(!studentId){
            return res.status(404).send({
                success: false,
                message: "Please provide student or valid student Id"
            })
        }
        await db.query(`DELETE FROM students WHERE id = ?`, [studentId]);
        res.status(200).send({
            success:true,
            message:"student deleted successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete student API',
            error
        })
    }
}

module.exports = { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent }