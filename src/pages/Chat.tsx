import { ChatContainer } from "../components/ChatContainer";
import { ContactList } from "../components/ContactList";

export const Chat = () => {
  return (
    <>
      <div>
        <ContactList />
      </div>
      <div>
        <ChatContainer />
      </div>
    </>
  );
};
