import React, { useState } from "react";
import "./ChatBody.css";
import ChatContent from "./ChatContent";

export default function ChatBody() {
  let allChatUsers = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWDGL-6ZdKn31umHjbxRA6twySHbALSURWNA&usqp=CAU",
      id: 1,
      name: "Alice Freeman",

      text: "You are the worst!",
      date: "Jun 12, 2017",
      active: true,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReTT8U8X9vzPhxFhBof4UROOJn9st_Vb5WIQ&usqp=CAU",
      id: 2,
      name: "Josefina",

      text: "We are losing money! Quick!",
      date: "Feb 18, 2017",
      active: false,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfHW_qDOlG8tsDnMAdPRSzoGWkEPwXr2_vgg&usqp=CAU",
      id: 3,
      name: "Velazquez",
      text: "Quickly come to the meeting room 1B, we have a big server issue.",
      date: "Mar 18, 2017",
      active: false,
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV7F6cdYZB_dYmCxeMifeGg9aq818GMeb1Ow&usqp=CAU",
      id: 4,
      name: "Barrera",
      text: "I'm having breakfast right now, can't you wait for 10 minutes?",
      date: "Feb 18, 2017",
      active: false,
    },
  ];

  let [name, setName] = useState(allChatUsers[0].name);
  let [userImg, setUserImg] = useState(allChatUsers[0].image);
  let [text, setText] = useState(allChatUsers[0].text);

  function selectChat(e) {
    setUserImg(e.currentTarget.children[0].children[0].src);
    setName(e.currentTarget.children[1].children[0].title);
    setText(e.currentTarget.children[1].children[1].title);

    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  }

  return (
    <div className="ChatBody">
      <div className="ChatList">
        <div className="user">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="user-icon"
          />
          <i className="fa-solid fa-circle-check user-check"></i>
        </div>
        <div className="search">
          <div className="search-wrap">
            <i class="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search or start new chat"
              required
            />
          </div>
        </div>

        <div className="chatList-items">
          <h1>Chats</h1>

          {allChatUsers.map((item, index) => {
            return (
              <div
                style={{ animationDelay: `0.${index + 1}s` }}
                onClick={selectChat}
                className={`chatList-item ${
                  (item.active ? "active" : "")
                    ? item.active
                      ? "active"
                      : ""
                    : ""
                } 
                     `}
              >
                <div className="Avatar">
                  <img
                    src={item.image ? item.image : "http://placehold.it/80x80"}
                    alt="#"
                    className="user-icon"
                  />
                  <span>
                    <i className="fa-solid fa-circle-check user-check"></i>
                  </span>
                </div>

                <div className="chatData">
                  <p title={item.name}>{item.name}</p>
                  <p className="chatText" title={item.text}>
                    {item.text}
                  </p>
                </div>
                <div className="activeTime">{item.date}</div>
              </div>
            );
          })}
        </div>
      </div>

      <ChatContent name={name} img={userImg} text={text} />
    </div>
  );
}
