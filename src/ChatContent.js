import { getAllByDisplayValue } from "@testing-library/react";
import axios from "axios";
import React, { useState, createRef, useEffect } from "react";

import "./ChatContent.css";

export default function ChatContent(props) {
  let messagesEndRef = createRef(null);

  let chatItms = [
    {
      key: 0,
      image: props.img,
      type: "other",
      msg: "Quickly come to the meeting room 1B, we have a big server issue",
    },
    {
      key: 1,
      image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      type: "",
      msg: `Hi ${props.name}! I'm having breakfast right now, can
      t you wait for 10 minutes?`,
    },

    {
      key: 2,
      image: props.img,
      type: "other",
      msg: props.text,
    },
  ];

  let [chatCondition, setChatCondition] = useState(chatItms);
  let [msgCondition, setMsgCondition] = useState("");

  useEffect(() => {
    setChatCondition(chatItms);
    setMsgCondition("");
  }, [props.img]);

  function showResponse(response) {
    chatItms.push({
      key: 4,
      type: "other",
      msg: response.data.value,
      image: props.img,
    });
    setChatCondition([...chatItms]);
    setMsgCondition("");
  }

  function getApi() {
    let apiUrl = "https://api.chucknorris.io/jokes/random";
    axios.get(apiUrl).then(showResponse);
  }

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        if (msgCondition !== "") {
          setTimeout(() => {
            getApi();
          }, 10000);
          chatItms.push({
            key: 1,
            type: "",
            msg: msgCondition,
            image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          });

          setChatCondition([...chatItms]);
          setMsgCondition("");
        }
      }
    });
  });

  function onStateChange(event) {
    event.preventDefault();
    setMsgCondition(event.target.value);
  }
  return (
    <div className="ChatContent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <div className="Avatar">
              <img src={props.img} alt="#" className="user-icon" />
              <span>
                <i className="fa-solid fa-circle-check user-check"></i>
              </span>
            </div>
            <p>{props.name}</p>
          </div>
        </div>
      </div>
      <div className="content__body">
        <div className="chat__items">
          {chatCondition.map((itm, index) => {
            return (
              <div
                key={index}
                style={{ animationDelay: `0.8s` }}
                className={`chat__item ${
                  (itm.type ? itm.type : "me")
                    ? itm.type
                      ? itm.type
                      : "me"
                    : ""
                }`}
              >
                <div className="chat__item__content">
                  <div className="chat__msg">{itm.msg}</div>
                  <div className="chat__meta">
                    <span>4/22/17, 4:00 AM</span>
                  </div>
                </div>
                <div className="Avatar">
                  <img src={itm.image} alt="#" className="user-icon" />
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="content__footer">
        <div className="sendNewMessage">
          <input
            type="text"
            placeholder="Type a message here"
            onChange={onStateChange}
            value={msgCondition}
          />
          <button id="sendMsgBtn" className="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
