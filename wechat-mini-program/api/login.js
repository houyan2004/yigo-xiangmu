import{request} from "../utils/request.js"

export function loginHttp(data) {
  return request({
    url:"/yigo/login",
    method:"POST",
    data:data
  })
}