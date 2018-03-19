

export function groupBy<T>(data:Array<T>,func:(item:T)=>any):Map<any,Array<T>>{
    let groups:Map<any,Array<T>> = new Map<any,Array<T>>();
    data.forEach(i=>{
        let group = func(i);
        if(group != null){
            groups[group] = groups[group] || new Array<T>()
            groups[group].push(i)
        }
    })
    return groups;
}

export function dateDiff<T>(start:Date,end:Date,func:(current:Date)=>T):Array<T>{
   let dateList = new Array<T>();
   let newStart = new Date(start.getFullYear(),start.getMonth(),start.getDate())
   let newEnd = new Date(end.getFullYear(),end.getMonth(),end.getDate())
   while(newStart.getTime()<=newEnd.getTime()){
       dateList.push(func(newStart));
       newStart.setDate(newStart.getDate()+1);
   }
   return dateList;
}

export function convertDate(date:Date):string{
    let month = (date.getMonth()+1).toString();
    if(date.getMonth()<9){
       month = "0"+month;
    }
    let day = date.getDate().toString();
    if(date.getDate()<10){
      day = "0"+day;
    }
    return `${date.getFullYear()}-${month}-${day}`;
  }