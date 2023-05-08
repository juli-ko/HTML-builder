// Импорт всех требуемых модулей
const fsPromises = require('fs/promises');
const path = require('path');

async function copyDir(){
    await fsPromises.rm(path.join(__dirname,'files-copy'), { recursive: true , force:true})
    await fsPromises.mkdir(path.join(__dirname,'files-copy'), { recursive: true })
        .then(()=> {
            fsPromises.readdir(path.join(__dirname, 'files'),{withFileTypes: true})
            .then((files) =>{
                  files.forEach((file) =>{
                    if (file.isFile()) {
                        let pathFile = path.join(__dirname, 'files', file.name)
                        let pathCopy = path.join(__dirname, 'files-copy', file.name)
                        // Копирование файлов из папки files в папку files-copy
                        fsPromises.copyFile(pathFile, pathCopy)
                    }
                })
                console.log("files copied")
    })})
}

copyDir();
