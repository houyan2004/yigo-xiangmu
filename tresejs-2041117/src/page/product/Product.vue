<template>
  <div class="body">
      <el-scrollbar style="width: 100%">
        <div class="nav2">
      <router-link class="nav2_item" active-class="nav2_item_active" to="/product/productArr">商品列表管理</router-link>
      <router-link class="nav2_item" active-class="nav2_item_active" to="/product/productClassify">商品数据面板</router-link>
        </div>
      </el-scrollbar>
  </div>
      <div class="content">
        <router-view></router-view>
      </div>
</template>

<script>

import {Bottom, Search} from "@element-plus/icons-vue";
import {ref} from "vue";

export default {
  name: "Product",
  components: {Bottom},
  computed: {
    Search() {
      return Search
    }
  },
  setup() {

    let search_text = ref('')
    const value = ref(['1'])
    const options = [
      {
        value: '1',
        label: '按id搜索',
      },
      {
        value: '2',
        label: '按商品名搜索',
      },
      {
        value: '3',
        label: '按商品类型搜索',
        children: [
          {
            value: '3-1',
            label: '手机',
          },
          {
            value: '3-2',
            label: '电脑',
          },
          {
            value: '3-3',
            label: '平板',
          },
        ],
      },
    ]

    const handleChange = (value) => { // 搜索类型
      console.log(value)
    }
    const handleSelectionChange = (val) => {  // 获取选中的数据
      const {date,id} = val[0]
      console.log(val)
      console.log(date)
      console.log(id)
    }
    const tableData = [
      {
        date: '2016-05-03',
        id: '001',
        username: '王小虎',
        sex: '男',
        money: '￥1000.00',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-02',
        id: '002',
        username: '王小虎',
        sex: '男',
        money: '￥800.00',
        address: '上海市普陀区金沙江路 1518 弄',
      },
    ]

    const mypageSize = ref(10)
    const mytotal = ref(1000)
    const handleSizeChange = (val) => {
      console.log(`触发handSizeChange，每页 ${val} 条`)
    }
    const handleCurrentChange = (val) => {
      console.log(`触发handleCurrentChange当前页: ${val}`)
    }

    return {
      search_text,
      value,
      options,
      handleChange,
      handleSelectionChange,
      tableData,
      mypageSize,
      mytotal,
      handleSizeChange,
      handleCurrentChange
    }

  }
}
</script>

<style scoped>
.content{
  width: 100%;
  height: 100%;
}
.nav2_item_active{
  background: #831c1c;
  color: #ffffff;
}
.nav2{
  display: flex;
  width: 100%;
  align-items: center;
  background: #ffffff;
  margin: 5px 0;
  box-sizing: border-box;
}

.nav2_item{
  margin: 5px 0 5px 10px ;
  font-size: 20px;
  box-sizing: border-box;
  padding: 5px 10px;
  border: 1px solid #831c1c;
  border-radius: 15px;
}

</style>