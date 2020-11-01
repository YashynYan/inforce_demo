import db from "../../server/db"

export default class RegionController {

  static async apiGetReegions(req, res, next) {
    const ITEM_PER_PAGE = 20

    let sql = "select id, name from Region order by name"
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
}