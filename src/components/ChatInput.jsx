import React, { useRef, useState } from "react";
import styled from "styled-components";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../firebase";
import firebase from "firebase";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  //   console.log(channelId);
  //   const inputRef = useRef(null);
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      //   message: inputRef.current.value,
      message: input,
      //   timestamp
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: "Mark Lin",
      userImage: "https://i.imgur.com/ZeUbSnt.png",
    });
    // inputRef(null);  ??????
    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        {/* <input ref={inputRef} type="text" placeholder={`Message #ROOM`} /> */}
        <input
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          type="text"
          placeholder={`Messaging in #${channelName}`}
        />
        {/* <SendIcon hidden type="submit" onClick={sendMessage}></SendIcon> */}
        <button type="submit" onClick={sendMessage}>
          <SendIcon />
        </button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 2px solid gray;
    border-radius: 30px;
    padding: 15px;
    outline: none;
  }

  > form > button {
    position: fixed;
    bottom: 38px;
    right: 140px;
    border: none;
    background-color: white;
    cursor: pointer;
  }
`;
