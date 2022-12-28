const HomeBrand = require('../model/home/homeBrand_model')
const HomeBanner = require('../model/home/homeBanner_model')
const HomeHot = require('../model/home/homeHot_model')
const HomeSpecial = require('../model/home/homeSpecial_model')
const HomeFreshGoods = require('../model/home/homeFreshGoods_model')

class HomeService {

    // 获取首页品牌数据
    async getHomeBrand (limit) {
       try {
        let result = await HomeBrand.findAll({
            limit: limit
        })
        return result
       } catch (error) {
        console.error(error)
       }   
    }

    // 获取首页轮播图数据
    async getHomeBanner () {
        try {
         return await HomeBanner.findAll()
        } catch (error) {
         console.error(error)
        }   
     }

     // 获取首页新鲜好物数据
    async getHomeFreshGoods (limit) {
        try {
         return await HomeFreshGoods.findAll({
            limit: limit
         })
        } catch (error) {
         console.error(error)
        }   
     }

     // 获取首页人气推荐数据
     async getHomeHot () {
      try {
         return await HomeHot.findAll()
      } catch (error) {
         console.error(error)
      }
     }

     // 获取首页最新专题数据
     async getHomeSpecial (num) {
      try {
         return await HomeSpecial.findAll({
            limit: num
         })
      } catch (error) {
         console.error(error)
      }
     }HomeSpecial
}

module.exports = new HomeService()