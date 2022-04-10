import React from 'react'
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, List, Grid } from 'semantic-ui-react'
import { cancelAppointment } from "../../actions";

function ModalExampleBasic({ doctor_id, patient_id, date, time, cancelAppointment }) {
  const [open, setOpen] = React.useState(false)

  const handleDelete = () => {
    cancelAppointment(doctor_id, patient_id, date, time)
    setOpen(false)
  }


  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={
        <div className="ui red circular animated fade button" tabIndex="0">
        <div className="visible content">
          Cancel
        </div>
        <div className="hidden content">
          <i className="delete icon"></i>
        </div>
      </div>
      }
    >
      <Header icon>
        <Icon name='delete' />
        Are you sure you want to cancel this appointment?
      </Header>
      <Modal.Content>
        <Grid centered>
          <List bulleted>
            <List.Item>Doctor ID: {doctor_id}</List.Item>
            <List.Item>Patient ID: {patient_id}</List.Item>
            <List.Item>Date: {date}</List.Item>
            <List.Item>Date: {time}</List.Item>
          </List>
        </Grid>

      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={handleDelete}>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default connect(null, {
  cancelAppointment
})(ModalExampleBasic)