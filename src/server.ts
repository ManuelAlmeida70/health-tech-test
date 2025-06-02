import fastify from "fastify";
import { supabase } from "./supabaseConnection";
import { request, validateHeaderValue } from "http";

const app = fastify();

type Users = {
    nome: string,
    email: string
}

app.get("/users", async() =>{
    try{
        const {data: users} = await supabase.from("users").select("*");

        return {validateHeaderValue: users};
    }catch(error){
        console.error(error);
        throw error;
    }
})

app.post("/users", async(request, response) =>{
    try{
        const {nome, email} = request.body as Users;

        const {data:createUser} = await supabase.from("users").insert([{nome, email}]).select();

        return {value: createUser? createUser[0] : null}
    }catch(error){
        console.error(error);
        throw error;
    }
})

app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333
}).then(() =>{
    console.log("Servidor funcionando");
})