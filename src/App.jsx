import React, { useState } from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";

import { ChannelListContainer, ChannelContainer, Auth } from "./components";

import "stream-chat-react/dist/css/index.css";
import "./App.css";

const App = () => {
  const cookies = new Cookies();
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [authToken, setAuthToken] = useState(cookies.get("token"));

  const apiKey = "czatxnh4uyn5";
  // const authToken = cookies.get("token");

  const client = StreamChat.getInstance(apiKey);

  if (authToken) {
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("userName"),
        fullName: cookies.get("fullName"),
        image: cookies.get("avatarURL"),
        hashedPassword: cookies.get("hashedPassword"),
        phoneNumber: cookies.get("phoneNumber"),
      },
      authToken
    );
  }
  if (!authToken) return <Auth />;
  console.log(authToken);

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  );
};

export default App;
