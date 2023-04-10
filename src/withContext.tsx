import React from 'react';

interface ContextProviderProps<T> {
    children: React.ReactNode;
    value: T;
}

interface WithContextProps<T> {
    children?: React.ReactNode;
    value: T;
}

export function withContext<P, T>(
    WrappedComponent: React.ComponentType<P>,
    ContextProvider: React.ComponentType<ContextProviderProps<T>>,
): React.FC<P & WithContextProps<T>> {
    const WithContextComponent = ({ children, value, ...props }: (P & WithContextProps<T>)) => {
        return (
            <ContextProvider value={value}>
                <WrappedComponent {...(props as P)}>{children}</WrappedComponent>
            </ContextProvider>
        );
    };

    WithContextComponent.displayName = `WithContext(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return WithContextComponent;
}
