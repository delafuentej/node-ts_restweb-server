import express from 'express';
import path from 'path';
import { envs } from '../config/envs.plugin';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
   
    constructor(
        options: Options
    ){
        const {port, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
    }

    async start(){

        //* middlewares

        //* public folder
        this.app.use(express.static(this.publicPath));

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