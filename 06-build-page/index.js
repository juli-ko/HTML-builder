// Импорт всех требуемых модулей
const path = require('path');
const fsPromise = require('fs/promises');
const fs = require('fs');
const dist = path.join(__dirname,'project-dist');
const componentsPath = path.join(__dirname,'components');

(async function createFolder(){
    await fsPromise.mkdir(dist, { recursive: true })
})();

(async function readTemplateHTML(){
    const readableStream = fs.createReadStream(path.join(__dirname,'template.html'),'utf-8')
    const output = fs.createWriteStream(path.join(dist, 'index.html'))
    let str = '';
    readableStream.on('data', async (data) =>{
        str += data.toString();

        // Нахождение всех имён тегов в файле шаблона
        const files = await fsPromise.readdir(componentsPath, { withFileTypes: true })
        for (const file of files){
            const fileName = file.name.match(/([\w]*\.)*/)[0].replace('.', '');
            const placeholder = `{{${fileName}}}`;
            const filePath = path.join(componentsPath, file.name);

            // Замена шаблонных тегов содержимым файлов-компонентов
            const componentData = await fsPromise.readFile(filePath,'utf-8');
            str = str.replace(placeholder, componentData);
        }
        // Запись изменённого шаблона в файл index.html в папке project-dist
        output.write(str);
        output.end();
    })
})();

// Использовать скрипт написанный в задании 05-merge-styles для создания файла style.css
(async function mergeStyles(){
    const writeStream = fs.createWriteStream(path.join(__dirname,'project-dist', 'style.css'));
    // Чтение содержимого папки styles
    fsPromise.readdir(path.join(__dirname,'styles'),{withFileTypes: true})
    .then((files)=>{
        files.forEach(async(file) =>{
            // Проверка является ли объект файлом и имеет ли файл нужное расширение
            if (file.isFile() && path.extname(file.name) === '.css') {
                // Чтение файла стилей
                const data = await fsPromise.readFile(path.join(__dirname,'styles', file.name));
                // Запись массива стилей в файл bundle.css
                writeStream.write(`${data.toString()}\n`);
            }
        })
    })
})();

// Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist
// (async function copyFiles(){
//     async function copyDir(dir, dest){
//         fsPromise.readdir(path.join(__dirname, 'assets'),{withFileTypes: true})
//         .then((files) =>{
//                 files.forEach(async(file) =>{
//                 if (file.isDirectory()){ 
//                     const dirPathNew = path.join(dir, file.name);
//                     const destPathNew = path.join(dest, file.name);
//                     //await fsPromise.mkdir(destPathNew, { recursive: true });
//                     await copyDir(dirPathNew, destPathNew);
//                 }else{
//                     let pathFile = path.join(dir, file.name)
//                     let pathCopy = path.join(dest, file.name)
//                     // Копирование файлов из папки files в папку files-copy
//                     fsPromise.copyFile(pathFile, pathCopy)
//                 }
//             })
//         })}
//     let pathFile = path.join(__dirname, 'assets')
//     let pathCopy = path.join(__dirname, 'project-dist','assets')
//     await fsPromise.rm(pathCopy, { recursive: true , force:true})
//     await fsPromise.mkdir(pathCopy, { recursive: true })
//     copyDir(pathFile, pathCopy)
// })();
