import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";
import UserFeedPlayer from "../Components/UserFeedPlayer";

const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);

    useEffect(() => {
        if(user) socket.emit("joined-room", { roomId: id, peerId: user._id });
    },[id, user, socket]);

    return (
        <div>
            Room Page: {id}
            <br />
            Your own feed:
            <UserFeedPlayer stream={stream} />

            <div>
                Other Users feed
                {Object.keys(peers).map((peerId) => (
                    <>
                        <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
                    </>
                ))}
            </div>
        </div>
    )
}

export default Room;