const data = require('../model/category/category_specs')
const dataa = require('../model/category/category_specs_value')
var jsonFile = require('jsonfile');

var fileName = '../../test.json'


const u = 4

jsonFile.readFile(fileName, async function(err, jsonData) {

    if (err) throw err;
    try {
        for (let i = 0; i < 50; i++) {
            // let result = await data.create({
            //     category_children_id: 1009001,
            //     specs_name: jsonData.result.saleProperties[i].name,
            //     specs_id: jsonData.result.saleProperties[i].id
            // })
             let result = await dataa.create({
                specs_id: jsonData.result.saleProperties[u].id,
                specs_children_id: jsonData.result.saleProperties[u].properties[i].id,
                specs_value: jsonData.result.saleProperties[u].properties[i].name
            })
            // console.log(jsonData.goods[i].desc)
        }
    } catch (error) {
        console.log(error)
    }

});