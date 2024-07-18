const fs = require('fs')
const path = require('path')

/* This method delete a file from the folder \\uploads */
exports.delete_File = (path_2_file) => {
    console.log(path_2_file)
    if (path_2_file.includes("http")) {
        // we've to the only the name of the file

        const filename = path.basename(path_2_file)
        console.log('this is the filename:', filename)
        const src_path = `C:\\Users\\nicor\\JavaScriptProjects\\SO_What\\api\\public\\uploads\\${filename}`
        if (fs.existsSync(src_path)) {
            fs.unlinkSync(src_path);
        }
    }
    else if (path_2_file.includes("C:")){
        console.log('path to delete: ',path_2_file)
        if (fs.existsSync(path_2_file)) {
            fs.unlinkSync(path_2_file);
        }
    }
}


