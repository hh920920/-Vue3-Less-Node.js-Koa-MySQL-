const goods = require('../model/goods/goods__model')
const goodsDetails = require('../model/goods/goodsDetails_model')
const goodsDetailsPictures = require('../model/goods/detailsPicture_model')
const goodsPictures = require('../model/goods/goodsPictures_model')
const sku = require('../model/goods/goodsSku_model')
const skuSpecs = require('../model/goods/skuSpecs_model')
const specs = require('../model/goods/goodsSpecs_model')
const specsValue = require('../model/goods/goodsSpecsValue_model')

var jsonFile = require('jsonfile');

var fileName = '../../test.json'


const categoryId = 100100
const childrenId = 1001001

jsonFile.readFile(fileName, async function(err, jsonData) {

    if (err) throw err;
    try {

        // ********************* 一、************************* 
        // for (let i = 0; i < 1; i++) {
        //     let goodsData = await goods.create({
        //         goods_id: jsonData.id,
        //         name: jsonData.name,
        //         de_sc: jsonData.desc,
        //         oldPrice: jsonData.oldPrice,
        //         price: jsonData.price,
        //         picture: jsonData.mainPictures[0],
        //         salesCount: jsonData.salesCount,
        //         category_id: categoryId,
        //         children_id: childrenId,
        //         goods_status: 1
        //     })
        // }

        // ********************* 二、************************* 
        // for (let i = 0; i < jsonData.details.properties.length; i++) {
        //     let goodsDetailsData = await goodsDetails.create({
        //         goods_id: jsonData.id,
        //         name: jsonData.details.properties[i].name,
        //         value: jsonData.details.properties[i].value,
        //     })
        // }

        // ********************* 三、************************* 
        // for (let i = 0; i < jsonData.details.pictures.length; i++) {
        //     let goodsDetailsPicturesData = await goodsDetailsPictures.create({
        //         goods_id: jsonData.id,
        //         picture: jsonData.details.pictures[i]
        //     })
        // }

        // ********************* 四、************************* 
        // for (let i = 0; i < 5; i++) {
        //     let goodsPicturesData = await goodsPictures.create({
        //         goods_id: jsonData.id,
        //         picture: jsonData.mainPictures[i]
        //     })
        // }

        // ********************* 五、************************* 
        // for (let i = 0; i < jsonData.skus.length; i++) {
        //     let skuData = await sku.create({
        //         sku_code: jsonData.skus[i].skuCode,
        //         goods_id: jsonData.id,
        //         inventory: jsonData.skus[i].inventory,
        //         old_price: jsonData.skus[i].oldPrice,
        //         price: jsonData.skus[i].price,
        //     })
        //     for (let j = 0; j < jsonData.skus[i].specs.length; j++) {
        //         let skuSpecsData = await skuSpecs.create({
        //             sku_code: jsonData.skus[i].skuCode,
        //             name: jsonData.skus[i].specs[j].name,
        //             valueName: jsonData.skus[i].specs[j].valueName
        //         })
        //     }
        // }

        // ********************* 六、************************* 
        // for (let i = 0; i < jsonData.specs.length; i++) {
            // let skuData = await specs.create({
            //     goods_id: jsonData.id,
            //     specs_id: jsonData.skus[i].skuCode,
            //     name: jsonData.specs[i].name
            // })
            // for (let j = 0; j < jsonData.specs[i].values.length; j++) {
            //     let skuSpecsData = await specsValue.create({
            //         specs_id: jsonData.skus[i].skuCode,
            //         name: jsonData.specs[i].values[j].name,
            //         de_sc: jsonData.specs[i].values[j].desc,
            //         picture: jsonData.specs[i].values[j].picture,
            //     })
            // }
        // }

    } catch (error) {
        console.log(error)
    }

});