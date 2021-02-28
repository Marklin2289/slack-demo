import React, { useState } from "react";
import styled from "styled-components";

import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddIcon from "@material-ui/icons/Add";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "@material-ui/core";

const Sidebar = () => {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  const [showBottom, setShowBottom] = useState(true);
  const [showTop, setShowTop] = useState(true);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>User :</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <AddIcon />
      </SidebarHeader>
      {showTop ? (
        <>
          <SidebarOption Icon={InsertCommentIcon} title="Thread" />
          <SidebarOption Icon={InboxIcon} title="Mentions & reactions" />
          <SidebarOption Icon={DraftsIcon} title="Saved items" />
          <SidebarOption Icon={BookmarkBorderIcon} title="Channel browser" />
          <SidebarOption Icon={PeopleAltIcon} title="People & user groups" />
          <SidebarOption Icon={AppsIcon} title="Apps" />
          <SidebarOption Icon={FileCopyIcon} title="File browser" />
        </>
      ) : null}

      <Button onClick={() => setShowTop(!showTop)}>
        {showTop ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        {showTop ? "Show less" : "Show more"}
      </Button>
      <hr />
      {/* <SidebarOption Icon={ExpandMoreIcon} title="Show more" /> */}
      <Button onClick={() => setShowBottom(!showBottom)}>
        {showBottom ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        {showBottom ? "Show less" : "Show more"}
      </Button>
      {/* <button onClick={() => setShow(!show)}>
        {show ? "Show less" : "Show more"}
      </button> */}
      {showBottom ? (
        <>
          <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
          {channels?.docs.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
          ))}
        </>
      ) : null}
      {/* <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />
      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))} */}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: var(--slack-color);
  color: white;
  flex: 0.3;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 1em;
    background-color: var(--slack-color);
  }

  ::-webkit-scrollbar-thumb {
    background-color: #49274b;
    outline: 1em solid #49274b;
  }

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }

  > button {
    color: white;
    margin-left: 2px;
    font-size: 13px;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
