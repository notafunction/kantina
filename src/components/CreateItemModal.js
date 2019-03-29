import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
    Box,
    Button,
    Modal,
    Label,
    Text,
    TextField,
} from 'gestalt';

const CreateItemModal = (props) => {
    const [ content, setContent ] = useState('');

    const handleSubmit = () => {
        props.onSubmit({
            content,
        }).then(() => props.onDismiss());
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit();
    } 

    const ModalFooter = () => (
        <Box display="flex" justifyContent="between">
            <Button inline
                text="Cancel"
                color="red"
                onClick={props.onDismiss}
            />
            <Button inline
                text="Submit"
                color="blue"
                onClick={handleSubmit}
            />
        </Box>
    );

    return (
        <Modal
            size="md"
            accessibilityModalLabel="Add item"
            accessibilityCloseLabel="Cancel"
            onDismiss={props.onDismiss}
            heading="Add item"
            footer={<ModalFooter/>}
        >
            <Box padding={4}>
                <form onSubmit={handleFormSubmit}>
                    <Box>
                        <Box marginBottom={2}>
                            <Label htmlFor="content">
                                <Text>Content</Text>
                            </Label>
                        </Box>
                        <TextField id="content"
                            value={content}
                            placeholder="Content"
                            onChange={({ value }) => setContent(value)}
                        />
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

CreateItemModal.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onDismiss: PropTypes.func.isRequired,
};

export default CreateItemModal;