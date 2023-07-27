import React from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect } from 'react';
import ListGroups from './ListGroups';

interface userDeets  {
    'access_token': string,
    'nickname': string,
    'user_id': string
}

const HeaderSidebarHome: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [modalIsOpen,setModalIsOpen] = useState(false);
    const [userData,setUserData] = useState<userDeets>({access_token:"",nickname:"",user_id:""});
    const userId = searchParams.get('id');
    const url: string = 'https://api-0C7E1462-839A-40B0-B4AC-5AED617BC521.sendbird.com/v3/';
    const header={
      'Content-Type': 'application/json; charset=utf8',
      'Api-Token': 'ac1eb1b9b8f15e36e6181c60fadc0880bc9abeae'
    }
    const userDetails = (newData:any) =>{
        console.log(newData);
        setUserData(newData);
      }
    const getUserDetails = async() => {
        try {
            const {data} = await axios({
              method:'get',
              url: url+'users/'+userId,
              headers: header
            })
            userDetails(data);
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        getUserDetails();
      }, []);
    return (
    <div style={{alignItems:'center',justifyContent:'space-evenly',paddingTop:'10px',margin:'auto'}}>
        <div style={{float:'left',paddingLeft:'10px',paddingRight:'6em',position:'fixed',fontSize:'25px',left:'0',border:'1px solid black'}}>
            <span>
                <span>Nickname: {userData['nickname']}</span>
                <span style={{paddingLeft:'30px'}}><button style={{backgroundColor: '#003C6D',color: 'white',borderRadius: 5, marginTop: 10, fontSize: 20}} >Create Grp</button></span>
            </span>
            <p>User_Id: {userData['user_id']}</p>
        </div>
        <ListGroups />
    </div>
  )
}

export default HeaderSidebarHome