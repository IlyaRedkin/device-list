import React from 'react'
import styled from 'styled-components'

interface ModalProps {
  open: boolean
  onClose: () => void
  onOk?: () => void
  onCancel?: () => void
  okText?: string
  cancelText?: string
  children?: React.ReactNode
  disabled?: boolean
  title: string
}

const Modal = ({
  open, onClose, onOk, onCancel, okText, cancelText, children, disabled, title
}: ModalProps): React.ReactElement | null => {
  if (!open) {
    return null
  }
  return (
    <StyledModal>
      <Content>
        <Header>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <h3>{title}</h3>
        </Header>
        <Body>
          {children}
        </Body>
        <Footer>
          {onOk && <button onClick={onOk} disabled={disabled}>{okText}</button>}
          {onCancel && <button onClick={onCancel}>{cancelText}</button>}
        </Footer>
      </Content>
    </StyledModal>
  )
}

export default Modal

const StyledModal = styled.div`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`
const Content = styled.div`
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.4s
`
const Header = styled.div`
  padding: 16px;
`
const Body = styled.div`
  padding: 16px;
`
const Footer = styled.div`
  padding: 16px;
`
const CloseButton = styled.span`
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: rgba(0,0,0,0.4);
    text-decoration: none;
    cursor: pointer;
  }
`
