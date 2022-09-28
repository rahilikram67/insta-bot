
import { Client } from "discord.js"
import play from "playwright"
export interface RestProps {
    client: Client
    page: play.Page,
    searches:Search
}

interface Search{
    pre:string
    next:string
}