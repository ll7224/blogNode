const { 
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
} = require('../controller/blog.js')
const {  SuccessModel, ErrorModel } = require('../modal/resModel')
const handleBlogRouter = (req, res) => {
  const method = req.method
  const url =  req.url
  const path = url.split('?')[0]
  const id = req.query.id
  //获取blog列表
  if(method === 'GET' && path === '/api/blog/list') {
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // const listData = getList(author, keyword)
    // return new SuccessModel(listData)
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const data = getDetail(id)
    return new SuccessModel(data)
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {
    const blogData = req.body
    const data = newBlog(blogData)
    return new SuccessModel(data)
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
      const result = updateBlog(req.query.id, req.body)
      if (result) {
        return new SuccessModel()
      }else {
        return new ErrorModel('更新失败')
      }
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/delete') {
     const result = delBlog(id)
     if (result) {
       return new SuccessModel()
     } else {
       return new ErrorModel('删除博客失败')
     }
  }
}

module.exports = handleBlogRouter