const express=require("express")
const app=express()

const mysql=require("mysql")

const cors=require("cors")
app.use(cors())

app.use(express.json())


//1st datbase connection 

const db1=mysql.createConnection({
    user: "fbdro",
  host: "10.125.20.10",
  password: "fbdro",
  database: "his_db_12012023",
})

// 2nd database connection 
// const db2=mysql.createConnection({
//     user: "fbdro",
//   host: "10.125.20.16",
//   password: "123456789",
//   database: "ae_db_12012023",
// })


// putting the data inside the search box for 1st database

app.post("/enter",(req,res)=>{
    const MRD=req.body.MRD
    db1.query("INSERT INTO bill(mrd_number) VALUES(?)",[MRDNum],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("checked")
        }
    })

})

// getting the data from the 1st database

app.get("/project22",(req,res)=>{
 var query=`SELECT mrd_number,bill_number,visit_code FROM bill WHERE bill_number LIKE 'ipf%' AND mrd_number='${req.query.MRD}' ORDER BY visit_code DESC  limit 1`
    db1.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send(result)
            // console.log(result)
        }
    })
})



// puting the data into the search box for the 2nd database




// app.post("/enter",(req,res)=>{


// db2.query("INSERT INTO bill(mrd_number) VALUES(?)",[MRDNum],(err,result)=>{

//     if(err){
//         console.log(err)
//     } else{
//         res.send("checked")
//     }
// })
// })

// app.get("/project22",(req,res)=>{
//     var query=`SELECT b.bill_number AS 'AEPL_bills',b.visit_type,b.visit_code, GROUP_CONCAT( bd.description)AS description FROM bill b

//     LEFT JOIN bill_details bd ON b.id=bd.bill_id
//     WHERE mrd_number='${req.query.MRD}'
//     AND visit_type ='ip'
//     AND
//     visit_code LIKE(SELECT visit_code FROM bill WHERE mrd_number='${req.query.MRD}' AND visit_type ='ip' ORDER BY visit_code DESC LIMIT 1)
    
//     GROUP BY b.bill_number `

//     db2.query(query,(err,result)=>{

//         if(err){
//             console.log(err)
//         }
//         else{
//             res.send(result)
//             // console.log(result)
//         }
//     })
// })



// listening the server

app.listen(4000,()=>{
    console.log("listening on")
})

