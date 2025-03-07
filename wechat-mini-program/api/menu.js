import{request} from "../utils/request.js"
export function getByNameArr(data){
   return request({
      url:"/yigo/muen/chacaip",
      methon:'GET',
      data:data
   }) 
}
export function getByid(data){
  return request({
    url:"/yigo/muen/select_muen_id",
    methon:'GET',
    data:data
 }) 
}
 export function getall(data){
    
   return request({
    url:"/yigo/muen/selectpage",
    methon:'GET',
    data:data
   })
 
}