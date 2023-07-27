import React from 'react'
import { useState, useEffect} from 'react';
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import {ThreeDots,Oval} from 'react-loader-spinner'
import ChatWindow from './ChatWindow';

interface Channel{
  'name':string,
  'member_count':number,
  'channel_url':string
}
interface ChannelList {
  'channels': Channel[]
}
const ListGroups: React.FC = () =>{
  const [searchParams] = useSearchParams();
  const [channelList,setChannelList] = useState<ChannelList>({channels:[{name:'',member_count:0,channel_url:''}]});
  const [selectedGrp,setSelectedGrp] = useState<Channel> ({name:'',member_count:0,channel_url:''});
  const userId = searchParams.get('id');
  const url: string = 'https://api-0C7E1462-839A-40B0-B4AC-5AED617BC521.sendbird.com/v3/';
  const header={
    'Content-Type': 'application/json; charset=utf8',
    'Api-Token': 'ac1eb1b9b8f15e36e6181c60fadc0880bc9abeae'
  }
  const getChannelListByUsers = async() => {
    try {
        const {data} = await axios({
          method:'get',
          url: url+'users/'+userId+'/my_group_channels',
          headers: header,
          params:{
            'show_empty':true
          }
        })
        channelListDetails(data);
      } catch (error) {
        console.log(error);
      }
}
const channelListDetails = (newData:ChannelList) => { 
  console.log(newData);
  setChannelList(newData);
}
const sendGrpDetails = (chDetails:Channel) =>{
  setSelectedGrp(chDetails);
}
useEffect(() => {
    getChannelListByUsers();
}, []);
  return (
    <div>
    <div style={{float:'left',paddingLeft:'10px',paddingRight:'2em',margin:'auto',position:'fixed',fontSize:'25px',left:'0',border:'1px solid black',height:'90vh'}}>
      <div style={{paddingTop:'4em',paddingRight:'8em'}}>
        <p>Groups</p>
        <div>
          {!channelList ?  <div style={{marginLeft:'auto',marginRight:'auto',width:'8em'}}><ThreeDots 
                        height="100" 
                        width="100" 
                        radius="9"
                        color="#008080" 
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                        /></div> : 
            channelList['channels'].map(each =>{
              return(
                <div key={each['name']}>
                  <div >
                    <span><button style={{fontSize:'30px',padding: '2px',borderStyle:'groove',margin:'10px',backgroundColor:'#E8EAF5',borderColor:'#CFD2DF',borderRadius:8}} onClick={() => sendGrpDetails(each)}>{each['name']}</button></span>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
    <ChatWindow {...selectedGrp}/>
    </div>
  )
}

export default ListGroups