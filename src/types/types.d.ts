interface Config {
    urls: string[]
    lock: boolean
    previous: ItemObject
    channelMap: string[]
    time:number
}



interface ItemObject {
    [key: string]: Post
}

interface Post{
    name:string
    link:string
    caption:string
    pic:string
    time:number
}
