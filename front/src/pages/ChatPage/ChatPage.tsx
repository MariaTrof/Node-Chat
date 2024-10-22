import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ChatPage.module.scss";
import MessageList from "./components/MessageList/MessageList";
import AddMessage from "./components/AddMessage/AddMessage";
import GroupList from "./components/GroupList/GroupList";
import ConfList from "./components/ConfList/ConfList";
import AddConf from "./components/AddConf/AddConf";

function ChatPage() {
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null); // Состояние для выбранной группы
  const groupId = 1;
  const handleGroupSelect = (groupId: number) => {
    setSelectedGroupId(groupId);
  };

  return (
    <>
      <div className={styles.links}>
        <div className={styles.title}>CHAT </div>
        <Link to="/profile" className={styles.title}>
          Profile
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.groups}>
            <div className={styles.small_title}>Groups</div>
            <GroupList onGroupSelect={handleGroupSelect} />
          </div>
          <div className={styles.messages}>
            <div className={styles.small_title}>Messages</div>
            {groupId !== null && (
              <>
                <MessageList groupId={groupId} />
                <AddMessage groupId={groupId} />
              </>
            )}
          </div>
          <div className={styles.conf}>
            <div className={styles.small_title}>Conferences</div>
            <AddConf groupId={groupId} />
            <ConfList groupId={groupId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
