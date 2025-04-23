import React from 'react';

export default function MainTitleBlock({divClassName, title, des}) {
    return (
        <div className={divClassName}>
            <p className="maincontents-title-block-title">{title}</p>
            <p className="maincontents-title-block-des">{des}</p>
        </div>
    );
}