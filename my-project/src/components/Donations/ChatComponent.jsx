import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { database } from "../../config/firebaseConfig";
import { ref, onValue, push } from "firebase/database";

const ChatComponent = ({ chatData, onClose }) => {
  const { donorId, ngoId, donationId } = chatData;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const chatRef = ref(database, `Chats/${donationId}/messages`);

  useEffect(() => {
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || [];
      setMessages(Object.values(data));
    });

    return () => unsubscribe();
  }, [donationId]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    push(chatRef, {
      sender: "ngo", // Set as "donor" if donor is using the chat
      message: newMessage,
      timestamp: new Date().toISOString(),
    });

    setNewMessage("");
  };

  return (
    <Box p={2} display="flex" flexDirection="column" height="400px">
      <Typography variant="h6">Chat with Donor</Typography>

      <Box flexGrow={1} overflow="auto" p={1} border="1px solid #ccc">
        {messages.map((msg, index) => (
          <Typography key={index} align={msg.sender === "ngo" ? "right" : "left"} color="textSecondary">
            {msg.message}
          </Typography>
        ))}
      </Box>

      <Box display="flex" mt={2}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button variant="contained" color="primary" onClick={sendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatComponent;
