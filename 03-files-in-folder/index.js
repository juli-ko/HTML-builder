// Импорт всех требуемых модулей
const fsPromises = require('fs/promises');
const path = require('path');

// Получение данных о каждом объекте который содержит папка secret-folder
fsPromises.readdir(path.join(__dirname, 'secret-folder'),{withFileTypes: true})
.then((files) =>{
    files.forEach((file) =>{
        // Проверка объекта на то, что он является файлом
        if (file.isFile() && !file.isDirectory()) {
            let pathFile = path.join(__dirname, 'secret-folder', file.name)
            let suffixFile = path.extname(file.name);
            let nameFile = path.basename(file.name, suffixFile)
            fsPromises.stat(pathFile).then((stats)=>{
                // Вывод данных о файле в консоль
                console.log(`${nameFile} - ${suffixFile.slice(1)} - ${stats.size*0.000977}kb`)
            })
        }
    })
})  
