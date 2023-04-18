import { Stagger } from 'native-base';
import React from 'react';

interface StaggerWrapperProps {
    children: React.ReactNode;
}

const StaggerWrapper = ({children}: StaggerWrapperProps) => {

    return (
        <Stagger
            visible={true}
            initial={{
                opacity: 0,
                scale: 0,
                translateY: 0,
            }}
            animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,
                transition: {
                    type: 'spring',
                    mass: 0.5,
                    stagger: {
                        offset: 100,
                    },
                },
            }}
        >
            {children}
        </Stagger>
    );
};

export default StaggerWrapper;
