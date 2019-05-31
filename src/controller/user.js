const loginCheck = (username, password) => {
   // 假数据
   if(username === 'zhangsan' && password === '123') {
     return true
   }else {
     false
   }
}

module.exports = {
  loginCheck
}