import{request} from "../utils/request.js"

export function getByNameArr(data) {
  console.log("getByNameArr"+data.proname);
  return request({
    url:"/yigo/product/getname",
    method:"GET",
    data:data
  })
}

export function getByProid(proid) {
  return request({
    url:"/yigo/product/"+proid,
    method:"GET"
  })
}

export function getArrList(data) {
  console.log(data);
  return request({
    url:"/yigo/product/page",
    method:"GET",
    data:data
  })  
}

export function getArrNav1(data) {
  console.log(data);
  return request({
    url:"/yigo/product/arrByNav1",
    method:"GET",
    data:data
  })
}