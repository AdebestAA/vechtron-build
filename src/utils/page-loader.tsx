import React from 'react';

export const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background ">
            <div className="flex flex-col items-center space-y-4">

                <div className="flex items-center justify-center">
                    <span className="loader-page"></span>
                </div>


                <div className="space-y-2 text-center">
                    <h3 className="text-lg font-medium text-foreground">Loading...</h3>

                </div>


                <div className="flex space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                </div>
            </div>
        </div>
    );
};