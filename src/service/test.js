const goods = require('../model/goods/goods__model')
const goodsDetails = require('../model/goods/goodsDetails_model')
const goodsDetailsPictures = require('../model/goods/detailsPicture_model')
const goodsPictures = require('../model/goods/goodsPictures_model')
const sku = require('../model/goods/goodsSku_model')
const skuSpecs = require('../model/goods/skuSpecs_model')
const specs = require('../model/goods/goodsSpecs_model')
const specsValue = require('../model/goods/goodsSpecsValue_model')
const request = require('request');
const unirest = require('unirest')

var jsonFile = require('jsonfile');
const fs = ('fs')
var fileName = '../../test.json'


const categoryId = 100100
const childrenId = 1001001

const goods_id = 1306019
const url = `https://apipc-xiaotuxian-front.itheima.net/goods?id=${goods_id}`
// 1、请求数据并替换json
jsonFile.writeFile(fileName, '')
// unirest
//   .post('http://mockbin.com/request')
//   .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
//   .send({ "parameter": 23, "foo": "bar" })
//   .then((response) => {
//     console.log(response.body)
//   })

request.get(url, function(error, response, body) {
    if (error) {
        console.log(error);
    }
    if (!error && response.statusCode == 200) {
        const data = JSON.parse(body)
        if (data) {
            try {
                jsonFile.writeFile(fileName, data)
                setTimeout(() => {
                    console.log(' ********************* 一：************************* ');
                    writeOne()
                }, 1000)
            } catch (e) {
                console.log(e)
            }
        }
    }
})

function writeOne() {
    jsonFile.readFile(fileName, async function(err, jsonData) {
        if (err) throw err;
        try {
            // ********************* 一、************************* 
            for (let i = 0; i < 1; i++) {
                console.log(jsonData.result.mainPictures[0]);
                // let goodsData = await goods.create({
                //     goods_id: jsonData.result.id,
                //     name: jsonData.result.name,
                //     de_sc: jsonData.result.desc,
                //     oldPrice: jsonData.result.oldPrice,
                //     price: jsonData.result.price,
                //     picture: jsonData.result.mainPictures[0],
                //     salesCount: jsonData.result.salesCount,
                //     category_id: categoryId,
                //     children_id: childrenId,
                //     goods_status: 1
                // })
            }
            setTimeout(() => {
                console.log(' ********************* 二：************************* ');
                // writeTow()
            }, 1500)

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

    })
}

function writeTow() {
    jsonFile.readFile(fileName, async function(err, jsonData) {
        if (err) throw err;
        try {
            // ********************* 二、************************* 
            for (let i = 0; i < jsonData.result.details.properties.length; i++) {
                // let goodsDetailsData = await goodsDetails.create({
                //     goods_id: jsonData.result.id,
                //     name: jsonData.result.details.properties[i].name,
                //     value: jsonData.result.details.properties[i].value,
                // })
                console.log(jsonData.result.details.properties[i].name);
            }
            setTimeout(() => {
                console.log(' ********************* 三：************************* ');
                writeThree()
            }, 1500)
        } catch (error) {
            console.log(error)
        }

    })
}

function writeThree() {
    jsonFile.readFile(fileName, async function(err, jsonData) {
        if (err) throw err;
        try {
            // ********************* 三、************************* 
            for (let i = 0; i < jsonData.result.details.pictures.length; i++) {
                // let goodsDetailsPicturesData = await goodsDetailsPictures.create({
                //     goods_id: jsonData.result.id,
                //     picture: jsonData.result.details.pictures[i]
                // })
                console.log(jsonData.result.details.pictures[i]);
            }
            setTimeout(() => {
                console.log(' ********************* 四：************************* ');
                writeFour()
            }, 1500)
        } catch (error) {
            console.log(error)
        }

    })
}

function writeFour() {
    jsonFile.readFile(fileName, async function(err, jsonData) {
        if (err) throw err;
        try {
            // ********************* 四、************************* 
            for (let i = 0; i < 5; i++) {
                // let goodsPicturesData = await goodsPictures.create({
                //     goods_id: jsonData.result.id,
                //     picture: jsonData.result.mainPictures[i]
                // })
                console.log(jsonData.result.mainPictures[i]);
            }
            setTimeout(() => {
                console.log(' ********************* 五：************************* ');
                writeFive()
            }, 1500)
        } catch (error) {
            console.log(error)
        }

    })
}

function writeFive() {
    jsonFile.readFile(fileName, async function(err, jsonData) {
        if (err) throw err;
        try {
            // ********************* 五、************************* 
            for (let i = 0; i < jsonData.result.skus.length; i++) {
                // let skuData = await sku.create({
                //     sku_code: jsonData.result.skus[i].skuCode,
                //     goods_id: jsonData.result.id,
                //     inventory: jsonData.result.skus[i].inventory,
                //     old_price: jsonData.result.skus[i].oldPrice,
                //     price: jsonData.result.skus[i].price,
                // })
                console.log(jsonData.result.skus[i].inventory, );
                setTimeout(() => {
                    for (let j = 0; j < jsonData.result.skus[i].specs.length; j++) {
                        // let skuSpecsData = await skuSpecs.create({
                        //     sku_code: jsonData.result.skus[i].skuCode,
                        //     name: jsonData.result.skus[i].specs[j].name,
                        //     valueName: jsonData.result.skus[i].specs[j].valueName
                        // })
                        console.log(jsonData.result.skus[i].specs[j].valueName);
                    }
                }, 1500)
            }
            setTimeout(() => {
                console.log(' ********************* 六：************************* ');
                writeSix()
            }, 3200)
        } catch (error) {
            console.log(error)
        }

    })
}

function writeSix() {
    jsonFile.readFile(fileName, async function(err, jsonData) {
        if (err) throw err;
        try {
            // ********************* 六、************************* 
            for (let i = 0; i < jsonData.result.specs.length; i++) {
                // let skuData = await specs.create({
                //     goods_id: jsonData.result.id,
                //     specs_id: jsonData.result.skus[i].skuCode,
                //     name: jsonData.result.specs[i].name
                // })
                console.log(jsonData.result.skus[i].skuCode);
                setTimeout(() => {
                    for (let j = 0; j < jsonData.result.specs[i].values.length; j++) {
                        // let skuSpecsData = await specsValue.create({
                        //     specs_id: jsonData.result.skus[i].skuCode,
                        //     name: jsonData.result.specs[i].values[j].name,
                        //     de_sc: jsonData.result.specs[i].values[j].desc,
                        //     picture: jsonData.result.specs[i].values[j].picture,
                        // })
                        console.log(jsonData.result.specs[i].values[j].desc);
                    }
                }, 1500)
            }
            setTimeout(() => {
                console.log(' ********************* 全部录入完毕！************************* ');
            }, 3000)
        } catch (error) {
            console.log(error)
        }

    })
}