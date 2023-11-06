import { useState } from "react";
import "./Apps.css";
import logo from './assets/download.png'

const initialImages = [
  "https://i.ibb.co/X3Lrxv0/image-1.webp",
  "https://i.ibb.co/XFjr7Kt/image-2.webp",
  "https://i.ibb.co/y0jY314/image-3.webp",
  "https://i.ibb.co/yVSRV26/image-4.webp",
  "https://i.ibb.co/zR5FB90/image-5.webp",
  "https://i.ibb.co/D1CTbCz/image-7.webp",
  "https://i.ibb.co/G0pbkCG/image-8.webp",
  "https://i.ibb.co/mNbBkRH/image-9.webp",
  "https://i.ibb.co/0rR0hjw/image-10.jpg",
  "https://i.ibb.co/4VKQqLZ/image-11.jpg",
];

function Apps() {
  const [images, setImages] = useState(initialImages);
  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleDragStart = (event, index) => {
    setDraggedImage(index);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    event.preventDefault();
    const newImages = [...images];
    newImages.splice(index, 0, newImages.splice(draggedImage, 1)[0]);
    setImages(newImages);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImages = [...images, e.target.result];
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleImageSelection = (index) => {
    const selected = [...selectedImages];
    if (selected.includes(index)) {
      selected.splice(selected.indexOf(index), 1);
    } else {
      selected.push(index);
    }
    setSelectedImages(selected);
  };

  const deleteSelectedImages = () => {
    const remainingImages = images.filter(
      (_, index) => !selectedImages.includes(index)
    );
    setImages(remainingImages);
    setSelectedImages([]);
  };

  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <div className="body">
      <div className="selectedImages">
        <div>{selectedImages.length} File Selected</div>
        <div className="delete">
          {selectedImages.length > 0 && (
            <span onClick={deleteSelectedImages}>Delete File</span>
          )}
        </div>
      </div>
      <div className="image-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className={`image ${
              selectedImages.includes(index) ? "selected" : ""
            }`}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={(event) => handleDragOver(event, index)}
            onDrop={(event) => handleDrop(event, index)}
            onClick={() => toggleImageSelection(index)}
          >
            {selectedImages.includes(index) && (
              <div
                className={`tick-box ${isChecked ? "checked" : ""}`}
                onClick={handleClick}
              >
                {isChecked ? "✔" : "✔"}
              </div>
            )}
            <img src={image} alt={`Image ${index}`} />
          </div>
        ))}

        <form onClick={() => document.querySelector(".input-area").click()}>
          <input
            className="input-area"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
          <img
          className="logo"
          src={logo} alt="" />
          <p>Add Image</p>
        </form>
      </div>
      </div>
    </>
  );
}

export default Apps;
