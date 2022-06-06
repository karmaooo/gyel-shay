import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

export default function DeleteVideo({ id, imageUrl }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      try {
        await deleteDoc(doc(db, "Videos", id));
        toast("Video deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting video", { type: "error" });
        console.log(error);
      }
    }
  };
  return (
    <div>
      <i
        className="fa fa-times"
        onClick={handleDelete}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}
