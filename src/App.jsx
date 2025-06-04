import React, { useState } from "react";
import image1 from "./assets/image1.png";
import image2 from "./assets/image2.png";
import image3 from "./assets/image3.png";
import image4 from "./assets/image4.png";
import image5 from "./assets/image5.png";
import image6 from "./assets/image6.png";
import avatar from "./assets/avatar.png";
import { Heart } from "lucide-react";

const SpotsGallery = () => {
  // Initial data state
  const [cardsData, setCardsData] = useState([
    {
      title: "Val Thorens",
      image:  image1,
      liked: false,
    },
    {
      title: "Restaurant terrace",
      image:  image2 ,
      liked: false,
    },
    {
      title: "An outdoor cafe",
      image:  image3 ,
      liked: false,
    },
    {
      title: "A very long bridge, over the forest...",
      image: image4,
      liked: false,
    },
    {
      title: "Tunnel with morning light",
      image:  image5 ,
      liked: false,
    },
    {
      title: "Mountain house",
      image:  image6,
      liked: false,
    },
  ]);

  
  const [profile, setProfile] = useState({
    name: "Aliaune Damala Bouga Time Bongo Puru Nacka Lu Lu Lu Badara Akon...",
    description:
      "Known mononymously as Akon (/ˈeɪkɒn/), is a Senegalese-American singer, record producer, and entrepreneur. An influential figure in modern world...",
    image:  avatar ,
  });

  
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Form states
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [newPostForm, setNewPostForm] = useState({
    title: "",
    image: null,
  });

  
  const toggleLike = (index) => {
    setCardsData((prev) =>
      prev.map((card, i) =>
        i === index ? { ...card, liked: !card.liked } : card
      )
    );
  };

  
  const openImageModal = (card) => {
    setSelectedImage(card);
    setShowImageModal(true);
  };

 
  const openEditModal = () => {
    setEditForm({
      name: profile.name,
      description: profile.description,
      image: null,
    });
    setShowEditModal(true);
  };

  const openNewPostModal = () => {
    setNewPostForm({ title: "", image: null });
    setShowNewPostModal(true);
  };

 
  const handleEditSubmit = () => {
    if (
      editForm.name.trim().length < 2 ||
      editForm.description.trim().length < 5
    )
      return;

    const updatedProfile = {
      name: editForm.name.trim(),
      description: editForm.description.trim(),
      image: editForm.image
        ? URL.createObjectURL(editForm.image)
        : profile.image,
    };
    setProfile(updatedProfile);
    setShowEditModal(false);
  };


  const handleNewPostSubmit = () => {
    if (!newPostForm.image || newPostForm.title.trim().length < 2) return;

    const newCard = {
      title: newPostForm.title.trim(),
      image: URL.createObjectURL(newPostForm.image),
      liked: false,
    };
    setCardsData((prev) => [newCard, ...prev]);
    setShowNewPostModal(false);
  };

  const isNewPostValid =
    newPostForm.title.trim().length >= 2 && newPostForm.image;

  // Modal component
  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div className="bg-white p-8 rounded-lg max-w-lg w-11/12 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-2xl hover:text-gray-600"
          >
            ×
          </button>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "rgba(252, 245, 229, 1)" }}
    >
      <header className="bg-white bg-opacity-80 flex justify-center items-center h-12">
        <h1 className="text-xl font-bold">📍 Spots</h1>
      </header>

      <main className="px-9">
        <section className="py-5">
          <div className="border-b border-gray-800 pb-5">
            <div className="flex justify-between items-start flex-wrap gap-5">
              <div className="flex gap-5 flex-wrap">
                <img
                  src={profile.image}
                  alt="Profile"
                  className="w-48 h-48 rounded-xl object-cover"
                />
                <div className="flex flex-col gap-2 max-w-lg">
                  <h2 className="text-3xl font-medium leading-tight">
                    {profile.name}
                  </h2>
                  <p className="text-gray-600 text-base leading-tight">
                    {profile.description}
                  </p>
                  <button
                    onClick={openEditModal}
                    className="self-start text-gray-600 hover:text-black transition-colors duration-300 mt-3"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              <button
                onClick={openNewPostModal}
                className="bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-600 transition-colors duration-300 font-medium"
              >
                + New Post
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-5">
          <div className="flex flex-wrap justify-center gap-5">
            {cardsData.map((card, index) => (
              <article key={index} className="w-96">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-96 object-cover rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => openImageModal(card)}
                />
                <footer className="flex justify-between items-center py-3">
                  <span className="text-xl font-medium">{card.title}</span>
                  <button
                    onClick={() => toggleLike(index)}
                    className="text-gray-500 hover:text-black transition-colors duration-300 text-xl"
                  >
                    <Heart
                      onClick={toggleLike}
                      className={`w-6 h-6 cursor-pointer stroke-black ${
                        card.liked ? "fill-red-500" : "fill-none"
                      }`}
                    />
                  </button>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-9">
        <div className="border-t border-gray-800 py-10 text-center">
          <p className="text-gray-600">2024 © Spots</p>
        </div>
      </footer>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={editForm.name}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-base"
            minLength={2}
            maxLength={50}
          />
          <textarea
            placeholder="Description"
            value={editForm.description}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-base h-24 resize-none"
            minLength={5}
            maxLength={160}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-base"
          />
          <button
            onClick={handleEditSubmit}
            className="w-full bg-black text-white p-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Save
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showNewPostModal}
        onClose={() => setShowNewPostModal(false)}
      >
        <h2 className="text-2xl font-bold mb-6">New Post</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newPostForm.title}
            onChange={(e) =>
              setNewPostForm((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-base"
            minLength={2}
            maxLength={100}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setNewPostForm((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg text-base"
          />
          <button
            onClick={handleNewPostSubmit}
            disabled={!isNewPostValid}
            className="w-full bg-black text-white p-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </Modal>

      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)}>
        {selectedImage && (
          <div className="text-center">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-w-md rounded-xl mb-4"
            />
            <h3 className="text-xl font-medium">{selectedImage.title}</h3>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SpotsGallery;
