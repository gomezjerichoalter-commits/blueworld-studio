const path = require('path');
const fs = require('fs');
const filePath = 'server.js';
let content = fs.readFileSync(filePath, 'utf8');
if (!content.includes('express.static')) {
    content = content.replace('const app = express();', 'const app = express();\napp.use(express.static(path.join(__dirname, 'client')));');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Static middleware added successfully.');
} else {
    console.log('Already added.');
}
