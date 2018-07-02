///<reference path="../server.interface.d.ts" />
import {createServer, Server} from 'http';
// import * as express from 'express';
import * as ioSocket from 'socket.io';
import cnf from '../config/connect.cnf';
import {AppController} from '../controllers/appController'


export class Socket{

  // private app:express.Application;

  private io:ioSocket.Server;

  private server:Server;

  private port: string | number;

  /**
   * Construtor instantiates WS and sets listeners
   * @param {shopApp} app
   */
  constructor(ac:AppController){
    
    // this.app = express();
    // this.server = createServer(this.app);

    this.server = createServer();
    this.port = cnf.ioPort;
    this.io = ioSocket(this.server, cnf.ioOptions);

    this.server.listen(this.port,() =>{
      console.log(`ioSocket starting on: ${this.port}`);
    });

    return this;
  }

  public namedBoadcast = (ns:string, evt:string, data:any) => {
    let named = this.io.of(ns);
    named.emit(evt,data);
  }

  public namedRoomcast = (ns:string, rm:string, evt:string, data:any) => {
    let named = this.io.of(ns);
    named.to(rm).emit(evt,data);
  }

  public tap = (evt:string, result:ioConnect):void => {
    this.io.on('connect', (socket: any )=>{
      socket.on(evt, (m: message)=>{
        return result( socket, m);
      });
    });
  }

}