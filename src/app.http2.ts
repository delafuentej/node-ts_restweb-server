import http2 from 'http2';
import {readFileSync} from 'fs';
import { Server } from 'net';

const server = http2.createSecureServer({
    key: readFileSync('./keys/server.key'),
    cert:readFileSync('./keys/server.crt')
},(req,res)=>{
    //console.log(req.url);
  //  res.writeHead(200, {'Content-Type': 'text/html'})//
   // res.write(`<h1>Url: ${req.url}</h1>`)
//    const data = {
//     name: 'Joe',
//     age:45,
//    }
//     res.writeHead(200, {'Content-Type':'application/json'});
//     res.end(JSON.stringify(data))
//     console.log(data)
if (req.url === '/'){
    const htmlFile = readFileSync('./public/index.html', 'utf-8');
    res.writeHead(200,  {'Content-Type': 'text/html'});
    res.end(htmlFile);
    return
  
}
if (req.url?.endsWith('css')){
    res.writeHead(200, { 'Content-Type': 'text/css' });
   
}else if(req.url?.endsWith('js')){
    
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
   
}else{
   res.writeHead(404, {'Content-Type': 'text/html'});
}

try{
    const resContent = readFileSync(`./public/${req.url}`,'utf-8');
    res.end(resContent);

}catch(error){
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end()
    
}


  
})

server.listen(4040, ()=>{
    console.log('Server running on PORT 4040')
})



// if (req.url === '/') {
//     // Leer el archivo HTML principal
//     const htmlFile = readFileSync('./public/index.html', 'utf-8');
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.end(htmlFile);
// } else if (req.url === '/css/style.css') {
//     // Leer y servir el archivo CSS
//     const cssFile = readFileSync('./public/css/style.css', 'utf-8');
//     res.writeHead(200, { 'Content-Type': 'text/css' });
//     res.end(cssFile);
// } else if (req.url === '/js/script.js') {
//     // Leer y servir el archivo JS
//     const jsFile = readFileSync('./public/js/script.js', 'utf-8');
//     res.writeHead(200, { 'Content-Type': 'application/javascript' });
//     res.end(jsFile);
// } else {
//     // Si no se encuentra la ruta, devolver un 404
//     res.writeHead(404, { 'Content-Type': 'text/html' });
//     res.end('<h1>404 - Page Not Found</h1>');
// }

// application/javascript
// text/css

