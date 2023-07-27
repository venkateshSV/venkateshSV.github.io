import { useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import {ThreeDots,Oval} from 'react-loader-spinner'

import React from 'react'
interface Channel{
    'name':string,
    'member_count':number,
    'channel_url':string
}
interface users{
    'user_id':string,
    'nickname':string
}
interface messages{
    'user':users,
    'message':string,
    'created_at':number
}
interface allMessages{
    'messages':messages[]
}

const ChatWindow:React.FC<Channel> = ({name,member_count,channel_url}) => {
    const [allMessagesList,setAllMessagesList] = useState<allMessages>({messages:[{user:{user_id:'',nickname:''},message:'',created_at:0}]});
    const [message,setMessage] = useState<string> ('');
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('id');
    const url: string = 'https://api-0C7E1462-839A-40B0-B4AC-5AED617BC521.sendbird.com/v3/';
    const header={
      'Content-Type': 'application/json; charset=utf8',
      'Api-Token': 'ac1eb1b9b8f15e36e6181c60fadc0880bc9abeae'
    }
    // console.log(channel_url);
    const getListOfAllMessages = async() =>{
        try {
            const {data} = await axios({
              method:'get',
              url: url+'group_channels/'+channel_url+'/messages',
              headers: header,
              params: {
                'message_ts':1484208113351,
                'next_limit':200
              }
            })
            setGetListOfAllMessages(data);
          } catch (error) {
            console.log(error);
          }
    }
    // const temp_url = url+'group_channels/'+channel_url+'/messages';
    // console.log(temp_url);
    const setGetListOfAllMessages = (newData:allMessages) =>{
        console.log(newData);
        setAllMessagesList(newData);
    }

    useEffect(() => {
     if(name)
     {
        getListOfAllMessages();
     }
    }, [name,allMessagesList['messages']]);
    const getTime = (timestamp: number): string => {
        var date = new Date(timestamp); // unix timestamp in seconds to milliseconds conversion
        var time =  date.toLocaleTimeString("en-US",{timeZone:"Asia/Kolkata"});
        return time;
    };

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        sendMessage();
    }
    const sendMessage = async() => {
        console.log(message);
        try {
            const {data_message}:any = await axios({
              method:'post',
              url: url+'group_channels/'+channel_url+'/messages',
              headers: header,
              data:{
                'message_type': 'MESG',
                'user_id': userId,
                'message': message
              }
            });
            console.log(data_message);
            setMessage("");
          } catch (error) {
            console.log(error);
          }
    }


  return (
    <div style={{border:'1px solid black',height:'90vh'}}>
        <div>
            <h3 style={{paddingLeft:'32em',marginLeft:'31em'}}>Selected Group: {!name ? 'Select a grp' :name+' - '+member_count+' members'}</h3>
        </div>
        <div style={{marginLeft:'32em',border:'1px solid black',height:'75vh',overflowY:'auto'}}>
            {
                allMessagesList ? 
                <div>
                    {
                        allMessagesList['messages'].map(each =>{
                            return(
                                    <div>
                                        {each['user']['user_id']===userId ? 
                                        <div style={{marginLeft:'100em',width:'20em',borderStyle:'groove',backgroundColor:'#E8EAF5',borderColor:'#CFD2DF',borderRadius:8,marginBottom:'5px',marginTop:'5px'}}>
                                            <span>{each['user']['nickname']}</span>
                                            <br></br>
                                            <span style={{fontSize:'18px'}}><b>{each['message']}</b></span>
                                            <br></br>
                                            <span>{getTime(each['created_at'])}</span>
                                        </div>
                                        : 
                                           <div style={{marginLeft:'2em',width:'20em',borderStyle:'groove',backgroundColor:'#E8EAF5',borderColor:'#CFD2DF',borderRadius:8,marginBottom:'5px',marginTop:'5px'}}>
                                            <span>{each['user']['nickname']}</span>
                                            <br></br>
                                            <span style={{fontSize:'18px'}}><b>{each['message']}</b></span>
                                            <br></br>
                                            <span>{getTime(each['created_at'])}</span>
                                           </div>
                                        }
                                    </div>
                            )
                        })
                    }
                </div>
                :
                <div>
                    <h3>No messages to display</h3>
                </div>
            }
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <span>
                        <input 
                            style={{marginLeft:'38em',marginTop:'2em',border:'1px solid black',width:'70%',height:'3vh'}}
                            type='text'
                            placeholder='Type your message here!'
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}>
                        </input>
                        <input style={{
                        backgroundColor: 'navy',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        height:'3.5vh',
                        marginLeft:'1em',
                        width:'4%'
                        }} type="submit" value="Submit">
                        </input>
                </span>
            </form>
        </div>
    </div>
  )
}

export default ChatWindow