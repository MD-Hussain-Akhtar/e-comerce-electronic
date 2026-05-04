const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/dataBaseConnect");


exports.AddStudent = async (req, res) => {
   const db = getDB();
   const row = await db.collection("StudentDetail").find().toArray();
   res.render('AddStudent', {
      getData: row,
      msg: ""
   });
};

exports.postStudent = async (req, res) => {
   let db = getDB();

   const { name, age, className, roll, email, phone, gender, address } = req.body;

   const existingStudent = await db.collection("StudentDetail").findOne({
      name: name,
      roll: roll
   });

   let msg = "";

   // ❌ STOP INSERT if already exists
   if (existingStudent) {
      return res.render('AddStudent', { msg: "Already student exists ❌", getData: await db.collection('StudentDetail').find().toArray() })

   }

   // ✅ INSERT only if not exists
   await db.collection("StudentDetail").insertOne({
      name,
      age,
      className,
      roll,
      email,
      phone,
      gender,
      address
   });

   const row = await db.collection("StudentDetail").find().toArray();

   msg = "Student successfully added ✅";

   console.log("Student successfully added");

   res.render('AddStudent', { getData: row, msg });
};
exports.filterByClass = async (req, res) => {
   let db = getDB();

   const className = req.params.className;

   const data = await db.collection("StudentDetail")
      .find({ className: className })
      .toArray();

   res.render("AddStudent", {
      getData: data || [],
      msg: data.length ? `Class ${className} students` : "No students found"
   });
};


exports.studentDelete = async (req, res) => {
   const db = getDB();
   const id = req.params.id;

   try {
      await db.collection("StudentDetail").deleteOne({
         _id: new ObjectId(id)
      })
      res.redirect("/AddStudent");

   } catch (error) {
      console.log(error);
      res.send("Error deleting student ❌");
   }
};

exports.editStudent = async (req, res) => {
   const db = getDB();
   const id = req.params.id;
   const student = await db.collection("StudentDetail").findOne({
      _id: new ObjectId(id)
   })

   if (!student) {
      res.send("Student note Found");
   }

   res.render("editStudent", { student })
}


exports.updateStudent = async (req, res) => {
   const db = getDB();
   const id = req.params.id;
   const { name, age, className, roll, email, phone, gender, address } = req.body;
   const student = await db.collection("StudentDetail").updateOne({
      _id: new ObjectId(id)
   }, {
      $set: {
         name, age, className, roll, email, phone, gender, address
      }
   })

   console.log("Student updated successfully");

   res.redirect("/AddStudent")
}