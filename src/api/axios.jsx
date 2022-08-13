import axios from "axios";
// import { getCookie } from "../shared/Cookie";
// 1. Axios instance생성
export const api = axios.create({
    baseURL: "http://localhost:3001/"
})

// 2. request interceptor
api.interceptors.request.use(
    config => {
        // const token = getCookie("token");
        // config.headers.Authorization = token;
        return config;
    },
    error => {
        console.log(error);
    }
)

// 3. response interceptor
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        console.log(error);
    }
);


// copy, paste haha....
const apis = {
  post_view:  (postId) =>  api.get(`posts/?postId=${postId}`),
  post_write:  (payload) =>  api.post('posts', payload),
  post_reWr:  (postId, payload) =>  api.put(`/posts/?postId=${postId}`, payload),
  post_del:  (postId, payload) =>  api.delete(`posts/?postId=${postId}`,payload),
  post_heart:  (postId) =>  api.post(`posts/like/?postId=${postId}`),
  com_write: (postId, payload) => 
   api.post(`/comments/?postID=${postId}/comment`, payload),
  com_del: async(postId, payload) =>
   api.delete(`/comments/?postID=${postId}/comment`, payload),

   
};

export default apis;