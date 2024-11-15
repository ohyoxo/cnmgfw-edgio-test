// index.js
const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { exec } = require('child_process');

// 使用process.cwd()来确保在edgio环境中正确获取路径
const FILE_PATH = path.join(process.cwd(), 'tmp');
const PORT = process.env.SERVER_PORT || process.env.PORT || 3000;

// 确保tmp目录存在
if (!fs.existsSync(FILE_PATH)) {
  fs.mkdirSync(FILE_PATH, { recursive: true });
  console.log(`${FILE_PATH} is created`);
} else {
  console.log(`${FILE_PATH} already exists`);
}

app.get("/", function(req, res) {
  res.send("Hello world!");
});

const subTxtPath = path.join(FILE_PATH, 'log.txt');
app.get("/log", (req, res) => {
  fs.readFile(subTxtPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading log.txt");
    } else {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.send(data);
    }
  });
});

const fileUrl = 'https://github.com/eooce/test/releases/download/bulid/nginx.js';
const fileName = 'nginx.js';
const filePath = path.join(FILE_PATH, fileName);

const downloadAndExecute = async () => {
  try {
    const response = await axios.get(fileUrl, { responseType: 'stream' });
    const writer = fs.createWriteStream(filePath);
    
    response.data.pipe(writer);
    
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    
    console.log('File downloaded successfully.');
    fs.chmodSync(filePath, '777');

    console.log('running the webapp...');
    const child = exec(`node ${filePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`${error}`);
        return;
      }
      console.log(`${stdout}`);
      console.error(`${stderr}`);
    });

    child.on('exit', (code) => {
      fs.unlink(filePath, err => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        } else {
          console.clear();
          console.log(`App is running!`);
        }
      });
    });
  } catch (error) {
    console.error(`Download error: ${error}`);
  }
};

// 在应用启动时执行下载
downloadAndExecute();

// 导出app实例以供edgio使用
module.exports = app;
