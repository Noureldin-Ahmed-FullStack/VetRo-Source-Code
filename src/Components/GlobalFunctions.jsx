import { arrayUnion, doc, getDoc, runTransaction, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../Firebase/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as faReg from "@fortawesome/free-regular-svg-icons";
import axios from 'axios'

import {
    Timestamp,
    addDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import * as fa from "@fortawesome/free-solid-svg-icons";
import { MyContext } from "./ContextProvider";
import { toast } from "react-toastify";


export function GlobalFunctions() {
    const location = useLocation();
    const { userObj, setUserObj } = useContext(MyContext);
    const { UserDBData, setUserDBData } = useContext(MyContext);
    const userChatsRef = collection(db, "UserChats");

    const chatFunc = (profData) => {
        if (!userObj) {
            toast.error("you need to log in to use this feature", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            return
        }
        let RID
        if (profData?._id > userObj.uid) {
            RID = userObj.uid + " " + profData?._id;
        } else {
            RID = profData?._id + " " + userObj.uid;
        }
        console.log(RID);
        goToRoom(RID , profData);
    };
    let navigate = useNavigate();
    const goToRoom = async (RID, profData) => {
        try {
            await runTransaction(db, async (transaction) => {
                const userChatDoc = await doc(userChatsRef, userObj?.uid);
                const OtherUserChatDoc = await doc(userChatsRef, profData?._id);
                const userChatDocSnap = await transaction.get(userChatDoc);
                const OtherUserChatDocSnap = await transaction.get(OtherUserChatDoc);

                if (userChatDocSnap.exists()) {
                    await transaction.update(userChatDoc, {
                        ChatRooms: arrayUnion({
                            ChatRoomID: RID,
                            OtherPersonName: profData?.name,
                            otherPersonPic: profData?.userPFP
                        })
                    });
                } else {
                    await transaction.set(userChatDoc, {
                        ChatRooms: [{
                            ChatRoomID: RID,
                            OtherPersonName: profData?.name,
                            otherPersonPic: profData?.userPFP
                        }]
                    });
                }

                if (OtherUserChatDocSnap.exists()) {
                    await transaction.update(OtherUserChatDoc, {
                        ChatRooms: arrayUnion({
                            ChatRoomID: RID,
                            OtherPersonName: UserDBData.name,
                            otherPersonPic: UserDBData.userPFP
                        })
                    });
                } else {
                    await transaction.set(OtherUserChatDoc, {
                        ChatRooms: [{
                            ChatRoomID: RID,
                            OtherPersonName: UserDBData.name,
                            otherPersonPic: UserDBData.userPFP
                        }]
                    });
                }
            });
        } catch (error) {
            console.error("Error updating document: ", error);
        }
        navigate("/room", { state: { RID: RID, reciverPFP: profData?.userPFP, reciverName: profData?.name } });
    };
    return {chatFunc,navigate,goToRoom}
}


