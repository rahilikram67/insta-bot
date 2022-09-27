interface Config {
    urls: string[]
    lock: boolean
    previous: ItemObject
    channelMap: string[]
    login: boolean
}



interface ItemObject {
    [key: string]: Post
}

interface Post{
    name:string
    postlink:string
    caption:string
    profileimg:string
    postpic:string
    time:number
}
