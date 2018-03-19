export class Title {
    text: string;
}

export class ToolTip {
    trigger: string = 'axis';
    axisPointer: AxisPointer = new AxisPointer();
}

export class AxisPointer {
    type: string = 'cross';
    label: Label = new Label();
}

export class Label {
    backgroundColor: string = '#6a7985';
}

export class Legend {
    data: string[] = ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'];
}

export class ToolBox {
    feature: Feature = new Feature()
}

export class Feature {
    saveAsImage: any = {}
}

export class Grid {
    left:string= '3%';
    right:string= '4%';
    bottom:string= '3%';
    containLabel:boolean = true
}

export class Axis{
    type:string = 'category';
    boundaryGap? = false;
    data?=['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
}

export class Serie{
    name:string;
    type:string ='line';
    data:number[];
    areaStyle?:any;
    stack?:string;
}


export class Chart {
    title: Title = new Title();
    tooltip: ToolTip = new ToolTip();
    legend: Legend = new Legend();
    toolbox: ToolBox = new ToolBox();
    grid: Grid = new Grid();
    xAxis:Axis[]=[new Axis()]
    yAxis: Axis[] = [{type:'value'}]
    series:Serie[] = []
}



