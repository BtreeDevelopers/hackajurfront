import {http} from "@/https"

export async function login<T=any>(body:{cpf:string,senha:string}):Promise<T> {
    const {data} =  await http({
        data:body,
        method:'post',
        url:'/login'
    })
    return data as T;
    
}