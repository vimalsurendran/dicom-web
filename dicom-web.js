const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os'); 

const folderPath = "./sample-dicom"; //sample dicom folder
const orthancUrl = "http://localhost:8042/dicom-web/studies"; //pacs dicom-web url(eg: Orthanc)
 
fs.readdir(folderPath, (err, fils) => {
    if (err || !fils) {
        console.log("No files found");
        return;
    }
    const files = fils.filter(file => file.toLowerCase().endsWith(".dcm"));

    if (!files.length) {
        console.log("No DICOM files found");
        return;
    }
    const tempFile = path.join(os.tmpdir(), `dicom_${new Date().getTime()}.bin`);
    //console.log(tempFile);
    const s = fs.createWriteStream(tempFile, {
        flags: 'a'
    });

    files.forEach(file => {
        console.log(`Reading file: ${file}`);
        s.write("\r\n--myboundary\r\nContent-Type: application/dicom\r\n\r\n");
        const binary = fs.readFileSync(path.join(folderPath, file));
        s.write(binary);
    });

    s.write("\r\n--myboundary");
    s.close(async ()=>{
        console.log(`Sending to Orthance: ${orthancUrl}`);
        console.log(`tempFile: ${tempFile}`)
        await axios.post(orthancUrl, fs.readFileSync(tempFile), {
            headers: {
                'Content-Type': 'multipart/related; type="application/dicom"; boundary=myboundary',
                'Accept': 'application/json',
            }
        }).then((response) => {
            response.data['00081199'].Value.forEach(instance =>{
                
            console.log(instance);
            });
            fs.unlinkSync(tempFile);
        }).catch((error) => {
            console.log(error);
            fs.unlinkSync(tempFile);
        })
    })

});



 