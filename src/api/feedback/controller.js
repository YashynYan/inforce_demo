import db from "../../server/db"


export default class FeedbackController {
  static async apiGetFeedbacks(req, res, next) {
    const ITEM_PER_PAGE = 20

    let sql = `
      SELECT 
        Feedback.id as feedback_id,
        Feedback.firstname as feedback_firstname,
        Feedback.lastname as feedback_lastname,
        Feedback.midname as feedback_midname,
        Feedback.phone as feedback_phone,
        Feedback.email as feedback_email,
        Feedback.comment as feedback_comment,
        City.id as city_id,
        City.name as city_name,
        Region.id as region_id,
        Region.name as region_name
      FROM
        Feedback
        JOIN City ON City.id = Feedback.city_id
        JOIN Region ON Region.id = City.region_id
      ORDER BY Feedback.id ASC
    `
    let params = []

    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
  }

  static async apiPostFeedback(req, res, next) {
    console.log(req)
    let errors=[]
    if (!req.body.firstname){
        errors.push("No firstname specified")
    }
    if (!req.body.lastname){
        errors.push("No lastname specified")
    }
    if (!req.body.midname){
        errors.push("No midname specified")
    }
    if (!req.body.city_id){
        errors.push("No city_id specified")
    }
    if (!req.body.phone){
        errors.push("No phone specified")
    }
    if (!req.body.email){
        errors.push("No email specified")
    }
    if (!req.body.comment){
        errors.push("No comment specified")
    }

    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        midname : req.body.midname,
        city_id : req.body.city_id,
        phone : req.body.phone,
        email : req.body.email,
        comment : req.body.comment,
    }

    let sql = `
      INSERT INTO Feedback (
        firstname, 
        lastname, 
        midname,
        city_id,
        phone,
        email,
        comment
      ) VALUES (
         ?,
         ?,
         ?,
         ?,
         ?,
         ?,
         ?
      )
    `
    let params =[
      data.firstname,
      data.lastname,
      data.midname,
      data.city_id,
      data.phone,
      data.email,
      data.comment,
    ]

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
  }

  static async apiPutFeedback(req, res, next) {
    let id = req.params.id
    let rbody = req.body

    let update_data = Object.entries(req.body).map((item)=>({
      k:item[0],
      v:item[1],
    }))

    if (update_data.length == 0) {
      res.status(400).json({"error": "No data to update"});
      return;
    }

    if (!id) {
      res.status(400).json({"error": "No id record to update"});
      return;
    }

    let sql = `
      UPDATE Feedback SET
        ${update_data.map((item)=>(
          `${item.k} = COALESCE(?,${item.k})`)
        ).join(', ')}
      WHERE
        id = ?
    `
    let params = update_data.map((item)=>(item.v))
    params.push(id)

    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": req.body,
            "id" : this.changes
        })
    });
  }

  static async apiDeleteFeedback(req, res, next) {
    let id = req.params.id

    if (!id) {
      res.status(400).json({"error": "No id record to delete"})
      return
    }

    let sql = 'DELETE FROM Feedback WHERE id = ?'

    db.run(sql, id, function (err, result) {
      if (err){
        res.status(400).json({"error": res.message})
        return;
      }
      res.json({
        "message": "success", 
        "id": this.changes
      })
    })
  }


 }
