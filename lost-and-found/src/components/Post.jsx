// import React, { useState } from "react";
// import postImage from "../assets/images/postHere_Image.jpg";
// import "../assets/post.css"; 

// const PostForm = () => {
//   const [formData, setFormData] = useState({
//     reportType: "",
//     itemName: "",
//     description: "",
//     location: "",
//     contactDetails: "",
//     date: "",
//     time: "",
//     image: null, 
//   });

//   const [loading, setLoading] = useState(false);

//   // Function to handle file selection
//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   // ✅ Keep only ONE `handleSubmit` function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formDataToSend = new FormData();
//     formDataToSend.append("report_type", formData.reportType);
//     formDataToSend.append("item_name", formData.itemName);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("location", formData.location);
//     formDataToSend.append("contact_details", formData.contactDetails);
//     formDataToSend.append("date", formData.date);
//     formDataToSend.append("time", formData.time);
//     if (formData.image) {
//       formDataToSend.append("image", formData.image);
//     }

//     // Debugging: Log what is being sent
//     for (let pair of formDataToSend.entries()) {
//       console.log(pair[0], pair[1]);
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/posts", {
//         method: "POST",
//         body: formDataToSend,
//       });

//       const data = await response.json();
//       console.log("🔍 Response:", data); // Debugging

//       if (response.ok) {
//         alert("Post Created Successfully!");
//         setFormData({
//           reportType: "",
//           itemName: "",
//           description: "",
//           location: "",
//           contactDetails: "",
//           date: "",
//           time: "",
//           image: null,
//         });
//       } else {
//         alert(`Error: ${JSON.stringify(data.detail)}`);
//       }
//     } catch (error) {
//       console.error("❌ Error submitting post:", error);
//       alert("Failed to create post.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="content-wrapper">
//       <div className="image-section">
//         <img src={postImage} alt="Lost Item" className="post-image" />
//       </div>

//       <div className="form-section">
//         <h2 className="section-title">Post Here!!</h2>
        
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Report Type</label>
//             <select value={formData.reportType} onChange={(e) => setFormData({ ...formData, reportType: e.target.value })} required>
//               <option value="">Select</option>
//               <option value="Lost">Lost</option>
//               <option value="Found">Found</option>
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Item Name</label>
//             <input type="text" placeholder="Enter item name" value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} required />
//           </div>

//           <div className="form-group">
//             <label>Description</label>
//             <textarea placeholder="Enter description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
//           </div>

//           <div className="form-group">
//             <label>Location</label>
//             <input type="text" placeholder="Enter location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
//           </div>

//           <div className="form-group">
//             <label>Contact Details</label>
//             <input type="text" placeholder="Enter contact details" value={formData.contactDetails} onChange={(e) => setFormData({ ...formData, contactDetails: e.target.value })} required />
//           </div>

//           <div className="form-group">
//             <label>Date of Incident</label>
//             <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
//           </div>

//           <div className="form-group">
//             <label>Time Lost/Found</label>
//             <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
//           </div>

//           <div className="form-group">
//             <label>Photo Upload (Optional)</label>
//             <input type="file" accept="image/*" onChange={handleFileChange} />
//           </div>

//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? "Submitting..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostForm;





import React, { useState } from "react";
import postImage from "../assets/images/postHere_Image.jpg";
import "../assets/post.css"; 
import PostList from "../components/PostList";


<PostList />


const PostForm = () => {
  const [formData, setFormData] = useState({
    reportType: "",
    itemName: "",
    description: "",
    location: "",
    contactDetails: "",
    date: "",
    time: "",
    image: null, 
  });

  const [loading, setLoading] = useState(false);

  // Function to handle file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("user_id"); //Dynamic User_id

    const formDataToSend = new FormData();
    formDataToSend.append("report_type", formData.reportType);
    formDataToSend.append("item_name", formData.itemName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("contact_details", formData.contactDetails);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("time", formData.time);
    formDataToSend.append("user_id", userId); // ✅ Dynamic value

    
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Debugging: Log what is being sent
    for (let pair of formDataToSend.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("🔍 Response:", data);

      if (response.ok) {
        alert("Post Created Successfully!");
        setFormData({
          reportType: "",
          itemName: "",
          description: "",
          location: "",
          contactDetails: "",
          date: "",
          time: "",
          image: null,
        });
      } else {
        alert(`Error: ${JSON.stringify(data.detail)}`);
      }
    } catch (error) {
      console.error("❌ Error submitting post:", error);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-wrapper">
      <div className="image-section">
        <img src={postImage} alt="Lost Item" className="post-image" />
      </div>

      <div className="form-section">
        <h2 className="section-title">Post Here!!</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Report Type</label>
            <select value={formData.reportType} onChange={(e) => setFormData({ ...formData, reportType: e.target.value })} required>
              <option value="">Select</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <div className="form-group">
            <label>Item Name</label>
            <input type="text" placeholder="Enter item name" value={formData.itemName} onChange={(e) => setFormData({ ...formData, itemName: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Enter description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input type="text" placeholder="Enter location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Contact Details</label>
            <input type="text" placeholder="Enter contact details" value={formData.contactDetails} onChange={(e) => setFormData({ ...formData, contactDetails: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Date of Incident</label>
            <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
          </div>

          <div className="form-group">
            <label>Time Lost/Found</label>
            <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
          </div>

          <div className="form-group">
            <label>Photo Upload (Optional)</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
