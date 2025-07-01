// check-ejs-files.js
const fs = require('fs');
const path = require('path');

function checkEjsFiles(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            checkEjsFiles(filePath);
        } else if (file.endsWith('.ejs')) {
            console.log(`\nChecking: ${filePath}`);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // Check for unclosed tags
            const lines = content.split('\n');
            let openTags = 0;
            let closeTags = 0;
            
            lines.forEach((line, index) => {
                // Count opening tags
                const openMatches = line.match(/<%[-=]?(?!%)/g);
                if (openMatches) openTags += openMatches.length;
                
                // Count closing tags
                const closeMatches = line.match(/[^%]%>/g);
                if (closeMatches) closeTags += closeMatches.length;
                
                // Check each line individually
                const lineOpen = (line.match(/<%[-=]?/g) || []).length;
                const lineClose = (line.match(/%>/g) || []).length;
                
                if (lineOpen !== lineClose) {
                    console.error(`❌ Line ${index + 1}: Mismatched tags (${lineOpen} open, ${lineClose} close)`);
                    console.error(`   Content: ${line.trim()}`);
                }
            });
            
            if (openTags === closeTags) {
                console.log('✅ OK');
            } else {
                console.error(`❌ ERROR: Total mismatched tags! Open: ${openTags}, Close: ${closeTags}`);
            }
        }
    });
}

// Check views directory
const viewsDir = path.join(__dirname, 'views');
console.log('Checking all EJS files for unclosed tags...\n');
checkEjsFiles(viewsDir);