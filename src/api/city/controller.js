import db from "../../server/db"

export default class CityController {

  static async apiGetCities(req, res, next) {
    const ITEM_PER_PAGE = 20

    let sql = "select id, name from City order by name"
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

  static async apiGetRegionCities(req, res, next) {
    const ITEM_PER_PAGE = 20

    let id = req.params.id || null
    let sql = "select id, name from City where region_id = ? order by name"
    let params = [id]

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