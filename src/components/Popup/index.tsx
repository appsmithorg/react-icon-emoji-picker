import React from 'react';
import styled from 'styled-components';

const ModalPopup = styled.div`
  display: flex; 
  position: fixed;
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100vw; 
  height: 100vh; 
  overflow: auto; 
  justify-content: center;
  align-items: center;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  flex-direction: column;
  margin: 0 !important;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const DoneButton = styled.button`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  cursor: pointer;
`;

type PopupProps = {
  open: boolean,
  children: React.ReactNode,
  onDoneClicked ?: () => void
};

const Popup = ({ open, children, onDoneClicked, ...props }: PopupProps) => {
  if (!open) {
    return null
  }
  
  // if open is present, then its a controlled modal
  // TODO: make it uncontrolled 
  const handleDoneClicked = () => {
    if (typeof open !== "undefined") {
      if (onDoneClicked) {
        onDoneClicked();
      }
    }
  }

  return (
    <ModalPopup>
      <ModalContent> 
        {children}
        <ButtonContainer>
          <DoneButton onClick={handleDoneClicked}>
            Done
          </DoneButton>
        </ButtonContainer>
      </ModalContent>
    </ModalPopup>
  )
};

export default Popup;
