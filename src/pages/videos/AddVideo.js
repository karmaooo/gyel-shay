// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebase-config';
// // import firebase from 'firebase/compat/app';
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// // import './App.css';
// const AddVideo = () => {
//   const [userInfo, setuserInfo] = useState({
//     title: '',
//   });
//   const onChangeValue = (e) => {
//     setuserInfo({
//       ...userInfo,
//       [e.target.name]:e.target.value
//     });
//   }

// const [isUsers, setUsers] = useState([]);
// {/* Fetch ------------------------------------------- */}
//   useEffect(() => {
//     db.collection('users').orderBy('datetime', 'desc').onSnapshot(snapshot => {
//       setUsers(snapshot.docs.map(doc => {
//         return {
//           id: doc.id,
//           title: doc.data().title,
//           image: doc.data().images,
//           datetime: doc.data().datetime
//         }
//       }))
//     })
//   }, []);
// //----------------------------------------------------------
//   const [isfile, setFile] = useState(null);
//   const handleImageAsFile = (e) => {
//     setFile(e.target.files[0]);
//   }

// {/* Insert ------------------------------------------- */}
//   const addlist = async(event) => {
//     try {
//       event.preventDefault();
//       let file = isfile;

//       const storage = getStorage();
//       var storagePath = 'uploads/' + file.name;

//       const storageRef = ref(storage, storagePath);
//       const uploadTask = uploadBytesResumable(storageRef, file);

//       uploadTask.on('state_changed', (snapshot) => {
//         // progrss function ....
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//       },
//       (error) => {
//         // error function ....
//         console.log(error);
//       },
//       () => {
//         // complete function ....
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           console.log('File available at', downloadURL);
//           db.collection('users').add({
//             title: userInfo.title,
//             images: downloadURL,
//             datetime: firebase.firestore.FieldValue.serverTimestamp()
//           })
//           setuserInfo({
//             ...userInfo,
//               title:'',
//           });
//           setFile(null);
//         });
//       });
//     } catch (error) { throw error;}
//   }

//   return (<>
//     <div className="App">
//       <h1> React Firebase storage Image Upload </h1>
//       <div className="wrapper">
//         {/* Insert users -------------------------------------------*/}
//         <form onSubmit={addlist}>
//           <input type="text" id="title"  name="title" value={userInfo.title} onChange={onChangeValue} placeholder=" Title " required />
//           <input type="file" accept=".png, .jpg, .jpeg" onChange={handleImageAsFile}/>
//           <button type="submit" className="btn__default btn__add" > Upload </button>
//         </form>
//       </div>
//       {/* Fetch users ------------------------------------------------*/}
//       {isUsers.map((items,index) => (
//         <div key={items.id} >
//           <div className="wrapper__list">
//             <p><b> Title : </b> {items.title}</p>
//             <img src={items.image} alt=""/>
//           </div>
//         </div>
//       ))}
//     </div>
//   </>)
// }
// export default AddVideo

import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage, db } from "../../firebase-config";
import { toast } from "react-toastify";
import "./addVideo.scss";

export default function AddVideoe() {
  const [formData, setFormData] = useState({
    title: "",
    video: "",
    createdAt: Timestamp.now().toDate(),
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleVideoChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleAdd = () => {
    if (!formData.title || !formData.video) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/videos/${Date.now()}${formData.video.name}`
    );

    const uploadVideo = uploadBytesResumable(storageRef, formData.video);

    uploadVideo.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          video: "",
        });

        getDownloadURL(uploadVideo.snapshot.ref).then((url) => {
          const videoRef = collection(db, "Videos");
          addDoc(videoRef, {
            title: formData.title,
            videoUrl: url,
            createdAt: Timestamp.now().toDate(),
          })
            .then(() => {
              toast("Video added successfully", { type: "success" });
              setProgress(0);
            })
            .catch((err) => {
              toast("Error adding Video", { type: "error" });
            });
        });
      }
    );
  };
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const videoRef = collection(db, "Videos");
    const q = query(videoRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const videos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videos);
      console.log(videos);
    });
  }, []);

  // const handleDelete = async () => {
  //   if (window.confirm("Are you sure you want to delete this video?")) {
  //     try {
  //       await deleteDoc(doc(db, "Videos", id));
  //       toast("Video deleted successfully", { type: "success" });
  //       const storageRef = ref(storage, videoUrl);
  //       await deleteObject(storageRef);
  //     } catch (error) {
  //       toast("Error deleting video", { type: "error" });
  //       console.log(error);
  //     }
  //   }
  // };
  return (
    <div className="container">
      <h2 >Add Video</h2>
      <div className="formContainer">
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => handleChange(e)}
        />
        {/* video */}
        <label htmlFor="">Video</label>
        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={(e) => handleVideoChange(e)}
        />
        <button className="add" onClick={handleAdd}>
          Add
        </button>
      </div>

      {progress === 0 ? null : (
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped mt-2"
            style={{ width: `${progress}%` }}
          >
            {`uploading video ${progress}%`}
          </div>
        </div>
      )}

      <div>
        {videos.length === 0 ? (
          <p>No videos found!</p>
        ) : (
          videos.map(({ id, title, videoUrl, createdAt }) => (
            <div className="videoList" key={id}>
              <video height="300" width="500" controls>
                <source src={videoUrl} />
              </video>
              <h3>{title}</h3>
              <p>{createdAt.toDate().toDateString()}</p>
              <button className="delete">
                {/* onClick={handleDelete} */}
                delete video
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
