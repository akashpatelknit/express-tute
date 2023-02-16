const express = require('express');
const app = express();
const router = express.Router();
const COLLECTION = require('../model/model');

router.get("/", async (req, res) => {
    try {
        const dummy = await COLLECTION.find();
        res.json(dummy);
    } catch {
        res.send('Error ' + err);

    }

})
router.post("/post", async (req, res) => {

    const user_data = req.body;

    const length = user_data.length;

    for (let i = 0; i < length - 1; i++) {
        const arr = []
        for (let j = 0; j < user_data[i].improvement.length; j++) {
            let diff = user_data[i].improvement[j].improvement - user_data[i + 1].improvement[j].improvement;
            let rec = "";
            let dec=0;
            if (diff < 0) {
                rec = user_data[i].improvement[j].movement;
                dec=diff;
            } else {
                rec = "all good";
            }
            console.log(diff);
            arr.push({
                movement: user_data[i].improvement[j].movement,
                improvement: user_data[i].improvement[j].improvement,
                Decriment: dec,
                recommendation: rec
            })

        }
        console.log(arr);
        const data = new COLLECTION({
            name: user_data[i].name,
            assessmentMonth: user_data[i].assessmentMonth,
            Gap: user_data[i].Gap,
            improvement: arr

        })
        try {
            const aa = await data.save();
            res.json(aa);
        } catch (err) {
            console.log(err);
        }

    }
   

})

module.exports = router
