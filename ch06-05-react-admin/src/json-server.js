// 引入Express模块
const express = require('express');
// 创建一个Express应用实例
const app = express();
const cors = require('cors');
// 定义端口号，通常使用环境变量或者默认设置为3000
const port = process.env.PORT || 3001;
app.use(cors());
const messages = {
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Post 1",
      "content": "Content of post 1"
    },
    {
      "id": 2,
      "title": "Post 2",
      "content": "Content of post 2"
    },
    {
      "id": 3,
      "title": "Post 3",
      "content": "Content of post 3"
    },
    {
      "id": 4,
      "title": "Post 3",
      "content": "Content of post 4"
    },    {
      "id": 1,
      "title": "Post 1",
      "content": "Content of post 1"
    },
    {
      "id": 2,
      "title": "Post 2",
      "content": "Content of post 2"
    },
    {
      "id": 3,
      "title": "Post 3",
      "content": "Content of post 3"
    },
    {
      "id": 4,
      "title": "Post 3",
      "content": "Content of post 4"
    }
  ]
}

// 定义一个中间件，用于解析URLencoded格式的数据（通常用于表单提交等情况）
app.use(express.urlencoded({ extended: false }));
// 定义一个中间件，用于解析JSON格式的数据（常用于接收和处理API请求中的JSON数据）
app.use(express.json());

// 定义根路由的GET请求处理函数，当访问根路径（比如http://localhost:3000/）时执行该函数
app.get('/', (req, res) => {
    res.send('Hello, World! This is a simple Express server.');
});

// 定义一个/about路由的GET请求处理函数，当访问/about路径（比如http://localhost:3000/about）时执行该函数
app.get('/api', (req, res) => {
    res.send(messages);
});

// 定义一个POST请求的路由处理示例，假设接收一个名为'message'的数据
app.post('/send-message', (req, res) => {
    const message = req.body.message;
    res.send(`You sent the message: ${message}`);
});

// 启动服务器，监听指定端口，当服务器成功启动时在控制台输出提示信息
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});