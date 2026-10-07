const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');
if (!code.includes('express.static')) {
    code = "const path = require('path');\n" + code.replace('const app = express();', 'const app = express();\napp.use(express.static(path.join(__dirname, 'client')));');
    fs.writeFileSync('server.js', code);
    console.log('Successfully patched server.js');
} else {
    console.log('Already patched!');
}
