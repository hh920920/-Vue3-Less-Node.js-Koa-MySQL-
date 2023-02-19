<template>
  <div class="user-address">
    <!-- 地址内容 -->
    <div class="content">
      <el-table :data="addressData" style="width: 100%">
        <el-table-column label="收货人" prop="name" width="100px" />
        <el-table-column label="电话/手机" width="130px" prop="phone" />
        <el-table-column label="邮编" width="90px" prop="postcode" />
        <el-table-column label="所在地区" prop="region" />
        <el-table-column label="详细地址" prop="detailedly" />

        <el-table-column>
          <template #default="scope">
            <el-button v-if="scope.row.default_addr == 0" size="small" type="primary" plain @click="setDefaultAddr(scope.$index, scope.row)">设为默认地址</el-button>
            <el-button v-else key="success" type="success" link>默认地址</el-button>
          </template>
        </el-table-column>

        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="search" />
          </template>
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加地址 -->
    <div class="addr">
      <h3>新增收货地址</h3>
      <div class="addressItem">
        <div class="itemLeft">
          <span>收货人姓名：</span>
          <div class="input">
            <el-input v-model="addrList.name" placeholder="请输入收货人姓名" />
          </div>
        </div>
        <div class="itemRight">
          <span>手机号码：</span>
          <div class="input">
            <el-input v-model="addrList.phone" placeholder="请输入收货手机号" />
          </div>
        </div>
      </div>
      <div class="addressItem">
        <div class="itemLeft">
          <span>邮政编码：</span>
          <div class="input">
            <el-input v-model="addrList.postcode" placeholder="请输入邮政编码" />
          </div>
        </div>
        <div class="itemRight">
          <span>详细地址：</span>
          <div class="input">
            <el-input v-model="addrList.detailedly" placeholder="请输入详细地址" />
          </div>
        </div>
      </div>
      <div class="addressItem">
        <div class="itemLeft">
          <div class="selecity">
            <span>地址信息：</span>
            <XxmCity @change="changeCIty" :fullLocation=fullLocation />
          </div>
        </div>
      </div>

      <div class="addressItem">
        <div class="submit">
          <el-button type="primary" @click="submit()" round>保存提交</el-button>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import confirm from '@/components/confirm'
import Message from '@/components/Message'
import { addAddress, getAddress, deleteAddress, setDefaultAddress } from '@/api/address'
export default {
  name: 'UserAddress',
  setup() {
    const search = ref('')
    const addressData = ref([])
    getAddress().then(res => {
      addressData.value = res.result
    })

    let provinceCode = ref('110000')     // 省份代码
    let cityCode = ref('119900')         // 城市代码
    let countyCOde = ref('110101')
    let fullLocation = ref('请选择省/市/区/街道')

    const addrList = reactive({
      name: '',         // 收货人姓名
      detailedly: '',   // 详细地址
      phone: '',        // 手机号
      region: '',       // 地区
      postcode: '',     // 邮政编码
    })

    // 删除函数
    const handleDelete = (item) => {
      confirm({ text: '亲，您是否确认删除商品' }).then(() => {
        deleteAddress(item.id).then(res => {
          if (res.code === 0) {
            Message({ type: 'success', text: '删除成功' })
            getAddress().then(res => {
              addressData.value = res.result
            })
          }
        })
      }).catch(e => { })
    }

    // 编辑函数
    const handleEdit = (index, item) => {
      confirm({ text: '此功能暂未开发' }).then(() => {

      }).catch(e => { })
    }

    // 设默认地址函数
    const setDefaultAddr = (index, item) => {
      confirm({ text: '是否将此条地址设为默认地址？' }).then(() => {
        setDefaultAddress(item.id).then(res => {
          if (res.code === 0) {
            Message({ type: 'success', text: '设置默认地址成功' })
            getAddress().then(res => {
              addressData.value = res.result
            })
          }
        })

      }).catch(e => { })
    }

    // 获取地区函数
    const changeCIty = (result) => {
      provinceCode.value = result.provinceCode
      cityCode.value = result.cityCode
      countyCOde.value = result.countyCOde
      fullLocation.value = result.fullLocation
      addrList.region = result.fullLocation
    }

    // 提交添加地址函数
    const submit = () => {
      if ((addrList.name && addrList.region && addrList.detailedly && addrList.postcode && addrList.phone) !== '') {
        addAddress({
          name: addrList.name,
          region: addrList.region,
          detailedly: addrList.detailedly,
          postcode: addrList.postcode,
          phone: addrList.phone
        }).then(res => {
          if (res.code === 0) {
            Message({ type: 'success', text: '添加地址成功' })
            getAddress().then(res => {
              addressData.value = res.result
            })

            // 重置addrList值
            addrList.name = ''
            addrList.region = ''
            addrList.detailedly = ''
            addrList.postcode = ''
            addrList.phone = ''
            fullLocation.value = '请选择省/市/区/街道'
          }
          if (res.code == '10012') {
            Message({ type: 'warn', text: res.message })
          }
        })
      } else {
        Message({ type: 'warn', text: '请填写完整！' })
      }
    }


    return {
      search,
      addressData,
      handleDelete,
      handleEdit,
      setDefaultAddr,
      addrList,
      fullLocation,
      changeCIty,
      submit
    }
  }
}
</script>
<style lang="less" scoped>
.user-address {
  min-width: 600px;
  min-height: 300px;
  background-color: rgb(255, 255, 255);
  .addr {
    width: 100%;
    min-height: 200px;
    // background-color: rgb(250, 211, 211);
    padding: 50px 0;
    h3 {
      color: rgb(255, 123, 0);
      margin-bottom: 20px;
    }
    .addressItem {
      width: 820px;
      height: 50px;
      // background-color: red;
      padding: 0 40px;
      display: flex;
      margin-bottom: 50px;
      justify-content: space-between;
      .itemLeft {
        width: 400px;
        height: 50px;
        // background-color: green;
        display: flex;
        justify-content: space-between;
        span {
          width: 100px;
          height: 100%;
          line-height: 50px;
        }
        .input {
          width: 300px;
          height: 100%;
          .el-input {
            height: 100%;
          }
        }
        .selecity {
          width: 300px;
          // background-color: red;
          padding-top: 10px;
          height: 50px;
          span {
            margin-right: 30px;
          }
        }
      }
      .itemRight {
        width: 400px;
        height: 50px;
        display: flex;
        justify-content: space-between;
        // background-color: blue;
        span {
          width: 100px;
          height: 100%;
          line-height: 50px;
        }
        .input {
          width: 300px;
          height: 100%;
          .el-input {
            height: 100%;
          }
        }
      }
      .submit {
        width: 100px;
        height: 60px;
        margin: auto;
        // background-color: red;
        .el-button {
          height: 40px;
        }
      }
    }
  }
  .content {
    min-width: 600px;
    min-height: 300px;
    padding: 0 20px;
  }
}
</style>