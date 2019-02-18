exports.upload = (uploadFile) => {
    const fs = require('fs');
    const path = require('path');
    // 上传单个文件
    const file = uploadFile; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    var myDate = new Date();
    var newFilename = 'upload_' + myDate.getTime() + '.' + file.name.split('.')[1];
    let filePath = path.join(__dirname, '../public/upload/') + `/${newFilename}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return newFilename;
}