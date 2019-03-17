import React from 'react';
import PropTypes from 'prop-types';

import {
    Box,
    Label
} from 'gestalt';

const InputGroup = (props) => {
    const { children } = props;

    let id = null;

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) return;

        id = child.props.id;
    });

    return (
        <Box marginBottom={4}>
            <Box marginBottom={2}>
                <Label htmlFor={id}>
                    <Text>{ props.label }</Text>
                </Label>
            </Box>
            <TextField
                value={email}
                placeholder="Email address"
                errorMessage={emailError}
                onChange={({ value }) => setEmail(value)}
                onBlur={validateEmail}
            />
        </Box>
    );
}

InputGroup.propTypes = {
    children: (props, propName, componentName) {
        const prop = props[propName];

        let error = null;

        if (React.Children.length !== 1) {
            error = new Error('`' + componentName + '` requires a single child of type `TextField` or `TextArea`.')
        }

        React.Children.forEach(prop, (child) => {
            console.log(child);
            if (![TextArea, TextField].includes(child.type)) {
                error = new Error('`' + componentName + '` child should be of type `TextField` or `TextArea`.');
            }
        });

        return error;
    }
}