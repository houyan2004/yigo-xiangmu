import{request} from "../utils/request.js"

export function updateUser(data){
  let req = request({
    url:"/yigo/updateUser",
    method:"PUT",
    data:data
  })
  console.log("api_user",req);
  return req;
}