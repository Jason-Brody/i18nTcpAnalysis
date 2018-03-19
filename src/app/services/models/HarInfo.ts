export interface HarInfo{
    country:string;
    product:string;
    type:string;
    domain:string; //域名
    date:string;
    network:string;
    count:number;
    duration:number; //总延时
    connect:number; //连接时长
    dns:number;//dns连接时长
    wait:number; //等待时长
    receive:number; //传输时长
    size:number; //传输大小
}

export interface HarResult{
    data:Map<string,HarInfo[]>;
    start:Date;
    end:Date;
}

