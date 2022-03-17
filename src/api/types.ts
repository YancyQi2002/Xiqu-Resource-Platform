export interface BasicResp<T> {
    code:number;
    data:T;
    message:string;
}