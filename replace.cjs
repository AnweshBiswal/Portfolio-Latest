const fs = require('fs');
const path = require('path');

const files = [
  'src/App.jsx',
  'src/components/ui/contact-card.tsx',
  'src/components/ui/education-timeline.tsx',
  'src/components/ui/features-8.tsx',
  'src/components/ui/portfolio-and-image-gallery.tsx',
  'src/components/ui/bento-monochrome-1.tsx',
];

const replacements = [
  { search: /#efeee9/g, replace: 'var(--text-primary)' },
  { search: /#0b0c0c/g, replace: 'var(--bg-deep)' },
  { search: /#111212/g, replace: 'var(--bg-card)' },
  { search: /#333535/g, replace: 'var(--border-color)' },
  { search: /bg-\[#1e2020\]/g, replace: 'bg-[var(--bg-card-hover)]' },
  { search: /#1e2020/g, replace: 'var(--bg-card-hover)' },
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    replacements.forEach(({ search, replace }) => {
      content = content.replace(search, replace);
    });
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  } else {
    console.warn(`File not found: ${file}`);
  }
});
