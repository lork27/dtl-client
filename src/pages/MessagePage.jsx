import React from 'react'
// import { MessageForm} from '../components/MessageForm'
// import { User } from '../components/User'

// call endpoint that gets all users you can message
// revive a list of users
export function MessagePage() {
    // const [chat, setChat] = useState("")
    // const [text, setText] = useState("")
    //   const [msgs, setMsgs] = useState([]);

    // const selectUser = (user) => {
    // function to select which user I will be messaging
    
        // setChat(user);
    
        // const user2 = user.uid;
        // const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    
        // const msgsRef = collection(db, "messages", id, "chat");
        // const q = query(msgsRef, orderBy("createdAt", "asc"));
   // This is to show the messages 
        // onSnapshot(q, (querySnapshot) => {
        //   let msgs = [];
        //   querySnapshot.forEach((doc) => {
        //     msgs.push(doc.data());
        //   });
        //   setMsgs(msgs);
        // });
    // }

    // function to send the message
    /*
        onst handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.uid;

    // user1 would be the logged in user and user 2 would be the person I want to chat
    // the collection message will have an id mix of the two parties
    // the field of that doc will be a sub collection known as chat which will have the messages between the two parties
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    // image upload is optional, we probs wont do it
    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    // endpoint should do this:
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",

      await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });

    setText("");
    });
    */
    return (
        <div>
            Messages Page
            {/* <div className="user_container" style> */}
            {/* {users.map(user => <User key={user.id} user={user} />)} */}
            {/* </div> */}
            {/* <div className="message_container"> */}
            {/* {chat? 
            <>
                <div className="messages_user"> */}
            {/* <h3>{chat.name}</h3> */}
            {/* </div> 
            // gets the messages
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm 
            handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
            </>
            : <h3 className="no_conv">Select usert to start a conversation</h3>} */}
            {/* </div> */}
        </div>
    )
}
