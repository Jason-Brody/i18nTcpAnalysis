
export class MappingAnalysis{

    fieldList:{};

    analysis(data:object){
        this.fieldList = {}

        let regex = /properties[.]([^\.]+)[.]type/

        this.analysisObj('',data,(k,v)=>{
            let result = regex.exec(k);
            if(result!=null){
                let key:string = result[1];
                let type = this.getType(v)
                
                if(key in this.fieldList){
                    this.fieldList[key].keyPaths.push({
                        'key':k,
                        'type':type
                    })
                    if(this.fieldList[key].type != type){
                        this.fieldList[key].isConfilt = true
                    }
                }else{
                    let fieldInfo = new FieldInfo();
                    fieldInfo.type = type;
                    fieldInfo.key = key
                    fieldInfo.keyPaths.push({'key':k,'type':type})
                    this.fieldList[key] = fieldInfo
                }
            }
        })

        for(let item in this.fieldList){
            if(this.fieldList[item].isConfilt == true){
                this.fieldList[item].type = this.chooseType(this.fieldList[item].keyPaths);
            }
        }
    }

    private analysisObj(key:string,obj:any,func:(key:string,value:any)=>void){
        if(obj instanceof Array){
            for(let i =0;i<obj.length;i++){
                this.analysisObj(`${key}[${i}]`,obj[i],func)
            }
        }else if(obj instanceof Object){
            for(let item in obj){
                this.analysisObj(`${key}${key==""?"":"."}${item}`,obj[item],func)
            }
        }else{
            func(key,obj)
        }
    }

    getType(type:string):string{
        switch(type.toLowerCase().trim()){
            case 'string':
                return 'string';
            case 'date':
                return 'date'
            case 'boolean':
                return 'boolean';
            default:
                return 'number';
        }
    }

    chooseType(fields:Field[]):string{
        let priority = {
            'date':1,
            'string':2,
            'number':3,
            'boolean':4
        }
        let tmpPriority = 100;
        fields.forEach(v=>{
            tmpPriority = priority[v.type] < tmpPriority ? priority[v.type]:tmpPriority
        })
        for (let item in priority){
            if(priority[item] == tmpPriority){
                return item
            }
        }
        return 'string'
    }
}

export class Field{
    key:string="";
    type:string="";
}

export class FieldInfo extends Field{
    keyPaths:Array<Field> = [];
    isConfilt:boolean = false;
}