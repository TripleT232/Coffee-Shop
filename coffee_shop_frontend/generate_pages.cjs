const fs = require('fs');
const path = require('path');

const pages = [
  { dir: "Blogs", name: "Blogs" },
  { dir: "BlogsDetail", name: "BlogsDetail" },
  { dir: "ProductDetail", name: "ProductDetail" },
  { dir: "Services", name: "Services" },
  { dir: "ServicesDetail", name: "ServicesDetail" },
  { dir: "FAQ", name: "FAQ" },
  { dir: "RegistrationSuccess", name: "RegistrationSuccess" },
  { dir: "VerifyEmail", name: "VerifyEmail" },
  { dir: "ResetPassword", name: "ResetPassword" },
  { dir: "Cart", name: "Cart" },
  { dir: "OrderConfirmation", "name": "OrderConfirmation" },
  { dir: "OrderSuccess", "name": "OrderSuccess" },
  { dir: "UserProfile", "name": "UserProfile" },
  { dir: "UserOrdersHistory", "name": "UserOrdersHistory" },
  { dir: "UserAddress", "name": "UserAddress" },
  { dir: "AccessDenied", "name": "AccessDenied" },
  { dir: "NotFound", "name": "NotFound" },

  { dir: "Admin/Dashboard", name: "Dashboard" },
  { dir: "Admin/Products", "name": "Products" },
  { dir: "Admin/Categories", "name": "Categories" },
  { dir: "Admin/Orders", "name": "Orders" },
  { dir: "Admin/Users", "name": "Users" },
  { dir: "Admin/Blogs", name: "Blogs" },
  { dir: "Admin/Blogs/Create", name: "Create" },
  { "dir": "Admin/Blogs/Edit", name: "Edit" },
  { "dir": "Admin/Blogs/Detail", name: "Detail" },
  { dir: "Admin/Reports", name: "Reports" },
  { dir: "Admin/Profile", name: "AdminProfile" }
];

const basePath = path.join(__dirname, 'src', 'pages');

pages.forEach(page => {
  const pageDir = path.join(basePath, page.dir);
  
  // Create dir if not exists
  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const jsxFile = path.join(pageDir, `${page.name}.jsx`);
  if (!fs.existsSync(jsxFile)) {
    fs.writeFileSync(jsxFile, `import React from 'react';
import './${page.name}.css';

export default function ${page.name}() {
  return (
    <div className="${page.name.toLowerCase()}-container">
      <h1>${page.name} Page</h1>
      <p>This is a generated placeholder for the ${page.name} component.</p>
    </div>
  );
}
`);
  }

  const cssFile = path.join(pageDir, `${page.name}.css`);
  if (!fs.existsSync(cssFile)) {
    fs.writeFileSync(cssFile, `.${page.name.toLowerCase()}-container {
  padding: 24px;
}
`);
  }

  const indexFile = path.join(pageDir, `index.js`);
  if (!fs.existsSync(indexFile)) {
    fs.writeFileSync(indexFile, `export { default } from './${page.name}';\n`);
  }
});

console.log('Successfully generated missing pages!');
