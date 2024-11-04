import express, { Router } from 'express';
import path from 'path';



interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;
   
    constructor(
        options: Options
    ){
        const {port, public_path = 'public', routes} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        //* middlewares => a function to be executed when a request goes through it

        //* public folder
        this.app.use(express.static(this.publicPath));

        //* routes
        this.app.use(this.routes)

        // any undefined route passes through here => SPA
        this.app.get('*', (req, res)=> {

            const indexPath = path.join(__dirname + `${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;
            // console.log(req.url);
            // res.send('Hi')
        })

       this.app.listen(this.port, ()=> {
        console.log(`Server is running on PORT: ${3000}`)
       });
}
}