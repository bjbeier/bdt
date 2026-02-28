const fs = require('fs');
const path = require('path');

const PARTIALS_DIR = '.';
const HTML_FILES = ['index.html', 'prices.html', 'blog.html', 'post.html'];

const navContent = fs.readFileSync(path.join(PARTIALS_DIR, 'nav.html'), 'utf8');
const footerContent = fs.readFileSync(path.join(PARTIALS_DIR, 'footer.html'), 'utf8');

HTML_FILES.forEach(file => {
    const filePath = path.join('.', file);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${file}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Inject Navigation
    if (content.includes('<!-- NAV_PLACEHOLDER -->')) {
        content = content.replace('<!-- NAV_PLACEHOLDER -->', navContent);
    } else if (content.includes('<header id="site-header"></header>')) {
        content = content.replace('<header id="site-header"></header>', `<header id="site-header">\n${navContent}\n</header>`);
    }

    // Inject Footer
    if (content.includes('<!-- FOOTER_PLACEHOLDER -->')) {
        content = content.replace('<!-- FOOTER_PLACEHOLDER -->', footerContent);
    } else if (content.includes('<footer id="site-footer"></footer>')) {
        content = content.replace('<footer id="site-footer"></footer>', `<footer id="site-footer">\n${footerContent}\n</footer>`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});
