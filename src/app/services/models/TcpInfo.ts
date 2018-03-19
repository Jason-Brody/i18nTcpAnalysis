export interface TcpResult{
    data:Map<string,TcpByNetwork>;
}

export interface TcpByNetwork{
    [key:string]:TcpByCounter
}

export interface TcpByCounter{
    [key:string]:TcpInfo[]
}

export interface TcpInfo{
    value:number;
    product:string;
    date:string;
    ip:string;
    port:string;
    domain:string;
    count:number;
}