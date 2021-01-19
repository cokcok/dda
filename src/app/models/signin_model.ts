export interface employee{
    id:number,
    emp_name:string,
    dept_name:string,
    sys_group_id:number,
    page:page[]
  }
  
  
  export interface page{
    title:string,
    url:string,
    svg:string,
    open:string,
    children:children[]
  }
  
  export interface children{
    title:string,
    url:string,
    svg:string
  }