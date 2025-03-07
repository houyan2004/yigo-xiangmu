var jwtToken = wx.getStorageSync('jwtToken')
var app = getApp()
const baseURL = 'http://47.92.65.33:8085';
// const baseURL = 'http://127.0.0.1:8085';
export function request(params){
  console.log(params);
  let dataObj = params.data || {};
  console.log(jwtToken);
  let headerObj = {			
    'content-type': 'application/json' ,/**服务器发送的数据是JSON格式的。 */
    'token': jwtToken
  }
  return new Promise((resolve,reject)=>{
    wx.request({
      url: baseURL + params.url,
      method:params.method || "GET",
      data:dataObj,
      header:headerObj,
      success:res=>{
        if(res.data.code!==1){
          if(res.data.code===401){
            wx.reLaunch({
              url:"/pages/start/start"
            })
          }
          // wx.showToast({
          //   title: res.data.msg,
          //   mask:true,
          //   icon:"error"
          // })
          return;
        }
        resolve(res.data)
      },
      fail:err=>{
        reject(err)
      }
    })
  })
}