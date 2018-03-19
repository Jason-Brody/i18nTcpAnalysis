export interface IConfig{
    file_types:string[];
    products:Product[];
    regions:Region[];
    test_types:string[];
    index_types:Index[];
    networks:string[];
}

export interface Region{
    name : string;
    networks:Index[];
}

export interface Index{
    index_name:string;
    description:string
}

export interface Setting{
    baseUrl:string;
}

export interface Product{
    name:string;
    domains:string[];
}