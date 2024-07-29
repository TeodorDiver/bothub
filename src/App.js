import React, { useState } from 'react';
import './index.scss';
import DescriptionCard from './components/DescriptionCard';
import HiMyGeneral from './components/HiMyGeneral';
import Button from './components/Button';
import Modal from './components/Modal';


export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="wrapper">
      <HiMyGeneral />
      <DescriptionCard />
      <Button onClick={openModal} />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}