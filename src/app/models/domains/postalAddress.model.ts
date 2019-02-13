export class PostalAddress{
    id: number;
    number: string;
    code: string;

    constructor(number?: string, code?: string){
        this.number = number; 
        this.code = code;
    }
}