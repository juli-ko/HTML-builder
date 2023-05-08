// Импорт всех требуемых модулей
const fsPromises = require('fs/promises');
const fs = require('fs')
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname,'project-dist', 'bundle.css'));

// Чтение содержимого папки styles
fsPromises.readdir(path.join(__dirname,'styles'),{withFileTypes: true})
.then((files)=>{
    files.forEach(async(file) =>{
        // Проверка является ли объект файлом и имеет ли файл нужное расширение
        if (file.isFile() && path.extname(file.name) === '.css') {
            // Чтение файла стилей
            const data = await fsPromises.readFile(path.join(__dirname,'styles', file.name));
            // Запись массива стилей в файл bundle.css
            writeStream.write(`${data.toString()}\n`);
        }
    })
})