import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const DeleteModal = (props) => (

  <Modal trigger={props.trigger} open={props.open}>
    <Header content='Delete Movie' />
    <Modal.Content>
      <p>Delete <strong>{props.title}</strong> from the Catalogue?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button onClick={props.onClose}>Cancel</Button>
      <Button onClick={props.onConfirm} color='red'>Confirm</Button>
    </Modal.Actions>
  </Modal>
  
)

export default DeleteModal
