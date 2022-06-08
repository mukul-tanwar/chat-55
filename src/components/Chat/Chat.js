import React , { useState, useEffect } from "react";
// const Message = ({ message: { text, user }, name });
import queryString from "query-string"
import io from 'socket.io-client';
// import { useSearchParams } from 'react-router-dom';
import { useLocation } from "react-router-dom";
// import search from 'react-router-dom'
import "./Chat.css"

let socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [users, setUsers] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  // const ENDPOINT = 'localhost:5000';
  const ENDPOINT = 'https://chat-06.herokuapp.com/';


    
    useEffect(()=>{
      const {name, room} = queryString.parse(location.search);
      // const[searchParams] = useSearchParams()
      // console.log(searchParams)
      // console.log(location.search)
      // console.log(name, room)

      socket = io(ENDPOINT);

      setName(name);
      setRoom(room);
      console.log(socket)

      socket.emit('join', {name,room}, (error)=>{
        if(error){
          alert("error")
          // return ()=>{
          //   socket.emit("disconnect")
          //   socket.off();
          // }
        }


      }
      
      )

    },[ENDPOINT, location.search])

    useEffect(()=>{
      socket.on('message',message=>{
        setMessages(messages => [ ...messages, message ]); //check it
        // const Messages = ({ messages, name }) =>{
          // {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}

        var fhfh =   message["text"]
        // console.log(fhfh)
        // console.log(roomData)
          
          // const [users, text] = JSON.parse(message)
        // document.getElementById('close').value = " "
        const fft = document.getElementById('chat2');
        const fnn = document.createElement("div")
        const snn = document.createElement("span");
        fnn.className= "chch"
        snn.className = "spanmssg"
        snn.innerText = fhfh;
        fnn.appendChild(snn)
        fft.appendChild(fnn)
        
      
        // console.log(messages)
        // setMessage(message)
        // console.log()

        

      })
      socket.on("roomData", ({ users }) => {
        setUsers(users)
        // setMessage(message)
        // console.log()

      })  

    },[]);

    const sendMessage = (event)=>{
      event.preventDefault();

      if(message){
        socket.emit('sendMessage', message, ()=> setMessage(''))
        // console.log(message)
        document.getElementById('close').value = " "
        // const fft = document.getElementById('chat2');
        // const fnn = document.createElement("div")
        // const snn = document.createElement("span");
        // fnn.className= "chch"
        // snn.className = "spanmssg"
        // snn.innerText = message;
        // fnn.appendChild(snn)
        // fft.appendChild(fnn)

        
        // return fft


      }
    }
    // console.log(message,messages)

    return (
      <div className="container">
        {/* <a href="/" className="close"><h3 className="ggg">close</h3></a> */}
          
        <div className="message-box">

          <div className="chat-box" id="chat1">
              <div className="usermssg" id="chat2">
                <div className="chch"><span className="spanmssg" >Welcome to M.S. chat room</span></div>
                

              </div>
          </div>
          <div className="send-box">
            <input type="text" className="message" id="close" placeholder="Type a message..." value={message} onChange={({ target: { value } }) => setMessage(value)} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}/>
            <button className="message-btn" onClick={e => sendMessage(e)}>Send</button>


          </div>
            <div className="ghgh">
            <a href="/" className="close"><h3 className="ggg">close</h3></a>
            </div>
        </div>
      </div>
    )
    
    
  };
  
  export default Chat;