
export interface IData{
    id:number,
    username:string,
    last_message:string,
    last_message_time:string,
    unread_count:number,
    last_online:boolean,
    avatar_url:null
}
  
export interface Messanges{
    message_id:number,
    sender_id:number,
    receiver_id:number,
    message:string,
    created_at:string,
    is_read:boolean,
    sender_username:string,
    receiver_username:string
}