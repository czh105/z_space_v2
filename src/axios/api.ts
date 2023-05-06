import axios from "../axios/axios"
//请求示例
//get
export const mokeGet = () => {
    return axios({
        url: "http://jhc.owvlab.net/openapi/a86b53c7-4629-4e73-bca4-73f335d21714/1",
        method: "get",
       
    })
}
//post
export const mokePost = (data:any) => {
    return axios({
        url: "/api/xxxx",
        method: "post",
        data,
        config: {
            headers: {
                'Request-Type': 'wechat'
            },
            timeout: 10000
        }
    })
}