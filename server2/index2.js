const express=require("express");
const app=express()

const mysql=require("mysql")

const cors=require("cors")
app.use(cors())

app.use(express.json())

const db2=mysql.createConnection({
    user:"fbdro",
    host:"10.125.20.16",
    password:"fbdro",
    database:"ae_db_12012023"
})

app.post("/enter",(req,res)=>{
    db2.query("INSERT INTO bill (mrd_number) VALUE(?) ",[MRDNum],(err,result)=>{

        if(err){
            console.log(err)
        }else{
            console.log("success")
        }
    })
})

app.get("/projects22",(req,res)=>{
    let query=`SELECT b.bill_number AS 'AEPL_bills',b.visit_type,b.visit_code, GROUP_CONCAT( bd.description)AS description FROM bill b

    LEFT JOIN bill_details bd ON b.id=bd.bill_id
    WHERE mrd_number='${req.query.MRD}'
    AND visit_type ='ip'
    AND
    visit_code LIKE(SELECT visit_code FROM bill WHERE mrd_number='${req.query.MRD}' AND visit_type ='ip' ORDER BY visit_code DESC LIMIT 1)
    
    GROUP BY b.bill_number`

db2.query(query,(err, results)=>{

    if(err){
        console.log(err)
    }
    else{
        res.send(results)
    }

})
})


app.listen(4001,()=>{
    console.log("listening on the second one")
})

