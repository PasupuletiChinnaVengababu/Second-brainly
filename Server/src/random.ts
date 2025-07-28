export function Random(num:number):string{
    let generate="";
    let options="abcdefghijklmnopqrstuvwxyz"
    for(let i=0;i<options.length;i++){
        generate= generate+i;
    }
    return generate;
}