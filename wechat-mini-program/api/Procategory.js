import{request} from "../utils/request.js"

export function getNav_1(data) {
  const req = request({
    url:"/yigo/proctegory/get",
    method:"POST",
    data:data
  })  
console.log(data);
  return req
}