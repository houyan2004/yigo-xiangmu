<template>
  <div class="body">
    <div class="search">
      <el-cascader class="user-cascader" style="width: 100px;" v-model="value" :options="options"
                   @change="handleChange"/>
      <el-input
          v-model="search_text"
          style="width: 360px"
          placeholder="请输入搜索内容"
          :prefix-icon="Search"
      />
      <el-button class="elbutton" @click="do_search" type="primary" round>搜索</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" border stripe @selection-change="handleSelectionChange" height="440"
                style="width: 80%">
        <el-table-column type="selection" width="55"/>
        <el-table-column prop="proid" label="商品id" width="80"/>
        <el-table-column prop="protitle" label="商品标题" show-overflow-tooltip width="120"/>
        <el-table-column prop="procateid" label="商品分类" width="180">
          <template #default="scope">
            {{scope.row.procateid}}
          </template>
        </el-table-column>
        <el-table-column prop="proimage" label="图片" width="180"/>
        <el-table-column prop="proprice" label="商品价格" width="180"/>
        <el-table-column prop="prostock" label="库存" width="180"/>
        <el-table-column prop="createTime" label="注册时间" width="180"/>
        <el-table-column prop="updateTime" label="修改时间" width="180"/>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="scope">
            {{ scope.row.status === 1 ? '在售' : scope.row.status===2 ? '下价' : '删除' }}
          </template>
        </el-table-column>
        <el-table-column prop="userid" label="操作" fixed="right" min-width="180">
          <template #default="scope">
            <div style="display: flex;justify-content:center;">
              <el-button type="warning" @click="bianji_show(scope.row.proid)" size="small">编辑</el-button>
              <el-button type="danger" @click="removeById(scope.row.proid)" size="small">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top: 10px;" layout="total, sizes, prev, pager, next,  jumper"
                     v-model:default-page-size="mypageSize" :page-sizes="[10,50,100,200]" background
                     v-model:total="mytotal"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
      />
    </div>
    <div class="delets">
      <el-button @click="removeAllByUserId({userIdArr: userIdArr})" type="danger" round>批量删除</el-button>
      <el-button @click="add_user" type="primary" round>添加商品</el-button>
    </div>
    <div v-if="bianji_bool" style="width: 100%;height: 100%;position: absolute;
      top: 0;left: 0;z-index: 10; background: rgba(0,0,0,0.3);display: flex;justify-content: center;
align-items: center"
         @click="bianji_bool_false"
    >
      <div class="edit-form-container" @click="eee" style="width: 400px;height: 80%;background: white">
        <el-scrollbar style="width: 100%">
          <h2 style="color: #414040;font-weight: bold;margin: 0 auto;margin-bottom:5px;text-align: center">
            <span v-if="!isadd">编辑商品</span> <span v-if="isadd">新增商品</span></h2>
          <el-form :model="formData" label-width="100px" ref="editForm" class="edit-form">
            <el-form-item label="商品标题" class="form-item">
              <el-input v-model="formData.protitle" placeholder="请输入商品标题" class="input-style"></el-input>
            </el-form-item>
            <el-form-item label="分类" class="form-item">
              <el-input v-model="formData.procateid" placeholder="输入分类" class="input-style">
              </el-input>
            </el-form-item>
            <el-form-item label="请输入图片链接" class="form-item">
              <el-input v-model="formData.proimage" placeholder="请输入图片链接" class="input-style"></el-input>
            </el-form-item>
            <el-form-item label="商品售价" class="form-item">
              <el-input v-model="formData.proprice" placeholder="商品售价" class="input-style"></el-input>
            </el-form-item>
            <el-form-item label="库存" class="form-item">
              <el-input v-model="formData.prostock" placeholder="请输入库存" class="input-style"></el-input>
            </el-form-item>
            <el-form-item label="商品状态" class="form-item">
              <el-select v-model="formData.status" placeholder="请选择商品状态" class="select-style">
                <el-option label="在售" :value="1"></el-option>
                <el-option label="下价" :value="2"></el-option>
                <el-option label="删除" :value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="button-item">
              <el-button type="primary" @click="submitForm" class="submit-button">提交表单</el-button>
              <el-button type="warning" @click="resetForm" class="reset-button">重置表单</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>

import {Search} from "@element-plus/icons-vue";
import {onMounted, ref} from "vue";
import http from "@/utils/api.js";
import {geshi_time} from "@/utils/utils.js";
import {ElMessage, ElNotification} from "element-plus";

export default {
  name: "User",
  computed: {
    Search() {
      return Search
    }
  },
  setup() {
    const bianji_bool = ref(false)
    const isadd = ref(false)
    const tableData = ref([]) // 表格数据
    const mypageSize = ref(10) // 每页显示条数
    const mytotal = ref(1000) // 总条数
    const nowPage = ref(1) // 当前页
    let search_text = ref('') // 搜索内容
    const value = ref(["2"]) // 搜索类型
    const userIdArr = ref([]) // 选中的用户id
    const search_data = ref({
      page: nowPage,
      pageSize: mypageSize
    }) // 搜索条件参数
    const formData = ref({
      proid:'',
      procateid:'',
      protitle:'',
      proname:'',
      proimage:'',
      proprice:'',
      prostock:'',
      status:'',
      createTime:'',
      updateTime:'',
    });// 表单数据
    // 获取表单实例，用于后续验证等操作
    const editForm = ref(null);

    const updateUser_api = (data)=>{
      http.put("/product/updatePro", data).then(res => {
        console.log(res)
        if (res.code === 1) {
          ElMessage({
            message: `修改成功`,
            type: 'success',
            duration: 1000
          })
          bianji_bool.value = false
          getUsersData(search_data.value)
        } else {
          ElMessage({
            message: `修改失败,${res.msg}`,
            type: 'error',
            duration: 1000
          })
        }
      }).catch(
          err => {
            console.log(err)
            ElNotification({
              title: '请求失败',
              message: '请联系管理员',
              type: 'error',
            })
          }
      )
    }
    const addUser_api = (data)=>{
      http.post("/product/addPro", data).then(res => {
        console.log(res)
        if (res.code === 1) {
          ElMessage({
            message: `添加成功`,
            type: 'success',
            duration: 1000
          })
          bianji_bool.value = false
          getUsersData(search_data.value)
        } else {
          ElMessage({
            message: `添加失败,${res.msg}`,
            type: 'error',
            duration: 1000
          })
        }
      }).catch(
          err => {
            console.log(err)
            ElNotification({
              title: '请求失败',
              message: '请联系管理员',
              type: 'error',
            })
          }
      )
    }

    // 提交表单方法
    const submitForm = (event) => {

      editForm.value.validate((valid) => {
        if (valid) {
          // 这里可以添加实际的提交逻辑，比如调用接口将修改后的数据发送到后端进行更新操作
          console.log('表单数据验证通过，准备提交:', formData.value);
          if (isadd.value){
            addUser_api(formData.value)
          }else{
            updateUser_api(formData.value)
          }

        } else {
          console.log('表单验证失败');
        }
      });
      event.stopPropagation()
    };

    // 重置表单方法
    const resetForm = (event) => {
      if (formData.value.proid===""){
        formData.value={
          proid:'',
          procateid:'',
          protitle:'',
          proname:'',
          proimage:'',
          proprice:'',
          prostock:'',
          status:'',
          createTime:'',
          updateTime:''
        }
        event.stopPropagation()
        return
      }
      if (tableData) {
        tableData.value.forEach(item => {
          if (item.proid === formData.value.proid) {
            delete item.createTime
            delete item.updateTime
            formData.value = JSON.parse(JSON.stringify(item))}
        })
      }
      event.stopPropagation()
    }


    const do_search = () => {
      getUsersData({
        protitle: value.value[0] === '2' ? search_text.value : null,
        proid: value.value[0] === '1' ? search_text.value : null,
        page: 1,
        pageSize: mypageSize.value
      })
    }
    const getUsersData = (data) => { // 获取用户数据
      console.log("搜索条件参数:", data)
      http.post("/product/sreach", data).then(
          res => {
            console.log(res)
            if (res.code === 0) {
              console.log("数据获取失败")
            } else if (res.code === 1) {
              console.log("数据获取成功")
              console.log("获取数据", res.data)
              res.data.forEach(item => {
                item.createTime = geshi_time(item.createTime)
                item.updateTime = geshi_time(item.updateTime)
              })
              console.log("获取当前条件查询数据总条数:", res.msg)
              tableData.value = res.data
              nowPage.value = data.page
              mytotal.value = parseInt(res.msg)
            }
          }
      ).catch(err => {
        console.log(err)
      })
    }
    onMounted(() => {
      getUsersData(search_data.value) // 获取用户数据
    })

    const options = [
      {
        value: '1',
        label: '按id搜索',
      },
      {
        value: '2',
        label: '按商品标题搜索',
      },
    ]
    const bianji_show = (e) => {
      bianji_bool.value = true
      isadd.value = false
      if (tableData.value) {
        tableData.value.forEach(item => {
          if (item.proid === e) {
            delete item.createTime
            delete item.updateTime
            formData.value = JSON.parse(JSON.stringify(item))
            console.log("编辑数据", item)
          }
        })
      }
      console.log("编辑", e)
    }

    const add_user = () => {
      bianji_bool.value = true
      isadd.value = true
      formData.value = {
        proid:'',
        procateid:'',
        protitle:'',
        proname:'',
        proimage:'',
        proprice:'',
        prostock:'',
        status:'',
        createTime:'',
        updateTime:''
      }
    }
    const bianji_bool_false = () => {
      bianji_bool.value = false

      console.log("编辑关闭")
    }

    const handleChange = () => { // 搜索类型
      console.log(value.value)
    }
    const handleSelectionChange = (val) => {  // 获取选中的数据
      userIdArr.value = val.map(item => item.proid)
      console.log("handleSelenctionChange")
      console.log(userIdArr.value)
    }
    const removeById = (e) => {
      console.log("removeById", e)
      removeAllByUserId({userIdArr: [e]})
    }
    const removeAllByUserId = (data) => { // 批量删除
      console.log("reqarr:",data)
      http.post("/product/removeAllByPro", data).then(
          res => {
            console.log(res)
            if (res.code === 1) {
              ElMessage({
                message: `删除操作成功`,
                type: 'success',
                duration: 2000
              })
              getUsersData(search_data.value)
            } else {
              console.log("数据删除失败")
            }
          }
      ).catch(err => {
        console.log(err)
      })
    }
    const handleSizeChange = (val) => {// 每页显示条数
      console.log(`触发handSizeChange，每页 ${val} 条`)
      mypageSize.value = val
      getUsersData(search_data.value)
    }
    const handleCurrentChange = (val) => {// 当前页
      console.log(`触发handleCurrentChange当前页: ${val}`)
      nowPage.value = val
      console.log("nowPage:", nowPage)
      console.log("search_data:", search_data.value)
      getUsersData(search_data.value)
    }

    const eee = (event) => {
      event.stopPropagation();
    }

    return {
      search_text,
      value,
      options,
      tableData,
      mypageSize,
      mytotal,
      bianji_bool,
      userIdArr,
      do_search,
      handleChange,
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange,
      removeAllByUserId,
      removeById,
      bianji_show,
      bianji_bool_false,
      formData,
      editForm,
      submitForm,
      resetForm,
      eee,
      add_user,
      isadd,
    }

  }
}
</script>

<style>
.el-cascader-menu__wrap.el-scrollbar__wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  max-height: 200px;
}
</style>
<style scoped>

.body {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom right, #111111, #333333); /* 采用墨风渐变背景，从黑色到深灰色 */
}

.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.delets {
  display: flex;
  justify-content: flex-start;
  width: 80%;
}

h2 {
  color: #bbbbbb; /* 标题文字设为白色 */
  font-size: 24px; /* 适当增大字体大小 */
  margin-top: 5px;
  margin-bottom: 15px; /* 增加底部间距 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 添加文字阴影，增强立体感 */
}

.search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-bottom: 20px; /* 增加底部间距 */
}


/* 按钮样式 */

.elbutton {
  background: rgba(255, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  transition: background 0.3s ease;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.elbutton:hover {
  background: rgba(255, 0, 0, 0.7);
}


.table {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}


.delets {
  display: flex;
  justify-content: flex-start;
  width: 80%;
  margin-top: 10px;
}

.delets button {
  margin-right: 10px; /* 按钮之间增加间距 */
}

/* 整体表格样式 */
.el-table {
  /* 背景设置为黑色，营造墨风的底色 */
  background: linear-gradient(to bottom right, #000000, #ffffff);
}


.edit-form-container {
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.edit-form {
  display: flex;
  flex-direction: column;
}

.form-item {
  margin-bottom: 15px;
}

.input-style {
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 10px;
}

.select-style {
  width: 100%;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  padding: 10px;
}

.button-item {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}



</style>