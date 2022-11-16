import styles from "../styles";

const ActionConfirmationModal = () => {
  return (
    <Modal open={open} onClose={handleClose}>
      <VContainer style={styles.smallContainer}></VContainer>
    </Modal>
  );
};

export default ActionConfirmationModal;
