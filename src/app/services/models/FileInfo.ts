export interface FileInfo{
    id:number;
    region:string;
    product:string;
    file_type:string;
    tos_address:string;
    status:Status;
    collect_time:Date;
    network:string;
    info:string;
}


export enum Status{
    初始化 = 0,
    待处理 = 1,
    处理中 = 2,
    成功 = 3,
    失败 = -1
}