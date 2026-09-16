const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replacements = [
  // First, convert the previously replaced arbitrary variables to standard tailwind theme colors
  { search: /text-\[var\(--text-primary\)\]/g, replace: 'text-foreground' },
  { search: /bg-\[var\(--bg-deep\)\]/g, replace: 'bg-background' },
  { search: /bg-\[var\(--bg-card\)\]/g, replace: 'bg-muted' },
  { search: /border-\[var\(--border-color\)\]/g, replace: 'border-border' },
  { search: /bg-\[var\(--bg-card-hover\)\]/g, replace: 'bg-foreground/5' }, // bg-muted hover
  
  // Now, fix all the hardcoded whites
  { search: /text-white/g, replace: 'text-foreground' },
  { search: /bg-white/g, replace: 'bg-foreground' },
  { search: /border-white/g, replace: 'border-foreground' },
  { search: /from-white/g, replace: 'from-foreground' },
  { search: /via-white/g, replace: 'via-foreground' },
  { search: /to-white/g, replace: 'to-foreground' },
  { search: /shadow-white/g, replace: 'shadow-foreground' },
  { search: /stroke-white/g, replace: 'stroke-foreground' },
];

walkDir(path.join(__dirname, 'src'), function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    replacements.forEach(({ search, replace }) => {
      content = content.replace(search, replace);
    });
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
