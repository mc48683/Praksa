const fs = require('fs');
const path = require('path');


const getMostRecentFile = (dir) => {
    const files = orderFiles(dir);
    return files[0].file;
  };
  
const orderFiles = (dir) => {
    return fs.readdirSync(dir)
      .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  };

folder = fs.readdirSync('praksa');
//fs.mkdirSync('praksa/newFolder');

console.log("\nCurrent directory filenames:");
folder.forEach(files => {
  console.log("Opening subfolder: " + files);
  newestFile = getMostRecentFile('praksa/'+ files);
  console.log("Finding most recent file: " + newestFile);
  if (!fs.existsSync('praksa/newFolder/' + newestFile)) {
    console.log("Copying most recent file to another folder...")
    fs.copyFile('praksa/' + files + '/' + newestFile, 'praksa/newFolder/' + files + '.pdf', (err) => {
        if (err) console.log(err);
        console.log("File copied and renamed");
        });
    }
  });


  