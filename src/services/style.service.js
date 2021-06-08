import { Tooltip } from 'react-bootstrap';
import React from 'react';

export function renderTooltip(props, text) {
    return (
        <Tooltip id="button-tooltip" {...props}>
            {text}
        </Tooltip>
    )
};
