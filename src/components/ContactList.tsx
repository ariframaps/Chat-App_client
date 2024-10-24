import { useEffect, useState } from "react";
import { Contact } from "../types/Contact";
import axios from "axios";
import { getAllContact } from "../utils/APIRoutes";
import { toast } from "react-toastify";
import { toastOptions } from "../config/toastOptions";

export const ContactList = () => {
  const [contactList, setContactList] = useState<Contact[] | undefined>(
    undefined
  );
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    const getContacts = async () => {
      const { data } = await axios.get(getAllContact);
      if (!data.status) toast.error(data.msg, toastOptions);
      setContactList(data.data);
      setIsloading(false);
    };

    getContacts();
  }, []);

  return (
    <div>
      {contactList &&
        !isLoading &&
        contactList.map((contact) => (
          <p key={contact.username}>{contact.username}</p>
        ))}
    </div>
  );
};
